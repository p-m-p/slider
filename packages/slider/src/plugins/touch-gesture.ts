import type {
  Plugin,
  PluginContext,
  ProgressiveTransitionController,
} from '../types'

export interface TouchGesturePluginOptions {
  threshold?: number
  commitThreshold?: number
  velocityThreshold?: number
}

export class TouchGesturePlugin implements Plugin {
  readonly name = 'touch-gesture'

  private readonly threshold: number
  private readonly commitThreshold: number
  private readonly velocityThreshold: number

  private context?: PluginContext
  private startX = 0
  private startY = 0
  private startTime = 0
  private isTracking = false
  private direction: 'next' | 'prev' | null = null
  private progressiveController: ProgressiveTransitionController | null = null
  private isVerticalScroll = false

  constructor(options?: TouchGesturePluginOptions) {
    this.threshold = options?.threshold ?? 30
    this.commitThreshold = options?.commitThreshold ?? 0.5
    this.velocityThreshold = options?.velocityThreshold ?? 0.5
  }

  initialize(context: PluginContext): void {
    this.context = context

    context.addListener(context.el, 'touchstart', this.handleTouchStart, {
      passive: true,
    })
    context.addListener(context.el, 'touchmove', this.handleTouchMove, {
      passive: false,
    })
    context.addListener(context.el, 'touchend', this.handleTouchEnd, {
      passive: true,
    })
    context.addListener(context.el, 'touchcancel', this.handleTouchCancel, {
      passive: true,
    })
  }

  destroy(): void {
    this.cleanup()
    this.context = undefined
  }

  reset(context: PluginContext): void {
    this.cleanup()
    this.initialize(context)
  }

  private handleTouchStart = (ev: TouchEvent): void => {
    if (!this.context || ev.touches.length !== 1) {
      return
    }

    const touch = ev.touches[0]
    this.startX = touch.clientX
    this.startY = touch.clientY
    this.startTime = Date.now()
    this.isTracking = true
    this.direction = null
    this.isVerticalScroll = false
  }

  private handleTouchMove = (ev: TouchEvent): void => {
    if (!this.context || !this.isTracking || ev.touches.length !== 1) {
      return
    }

    const touch = ev.touches[0]
    const deltaX = touch.clientX - this.startX
    const deltaY = touch.clientY - this.startY

    if (this.direction === null) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        this.isVerticalScroll = true
        this.isTracking = false
        return
      }

      if (Math.abs(deltaX) < this.threshold) {
        return
      }

      this.direction = deltaX > 0 ? 'prev' : 'next'
      this.progressiveController = this.context.requestProgressiveTransition(
        this.direction,
      )
    }

    if (this.isVerticalScroll) {
      return
    }

    ev.preventDefault()

    if (this.progressiveController) {
      const slideWidth = this.context.el.offsetWidth
      const progress = Math.abs(touch.clientX - this.startX) / slideWidth
      this.progressiveController.setProgress(Math.min(1, progress))
    }
  }

  private handleTouchEnd = (ev: TouchEvent): void => {
    if (!this.context || !this.isTracking) {
      this.cleanup()
      return
    }

    const touch = ev.changedTouches[0]
    const deltaX = touch.clientX - this.startX
    const elapsed = Date.now() - this.startTime
    const velocity = Math.abs(deltaX) / elapsed

    if (this.progressiveController) {
      const progress = this.progressiveController.progress
      const shouldComplete =
        progress >= this.commitThreshold || velocity > this.velocityThreshold

      if (shouldComplete) {
        this.progressiveController.complete()
      } else {
        this.progressiveController.cancel()
      }
    } else if (this.direction === null && Math.abs(deltaX) >= this.threshold) {
      if (deltaX > 0) {
        this.context.slider.prev()
      } else {
        this.context.slider.next()
      }
    }

    this.cleanup()
  }

  private handleTouchCancel = (): void => {
    if (this.progressiveController) {
      this.progressiveController.abort()
    }
    this.cleanup()
  }

  private cleanup(): void {
    this.isTracking = false
    this.direction = null
    this.progressiveController = null
    this.isVerticalScroll = false
  }
}

export default TouchGesturePlugin
