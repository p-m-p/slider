import type {
  Plugin,
  PluginContext,
  ProgressiveTransitionController,
} from '../types'

export interface TouchGesturePluginOptions {
  threshold?: number
  commitThreshold?: number
  velocityThreshold?: number
  direction?: 'horizontal' | 'vertical'
}

export class TouchGesturePlugin implements Plugin {
  readonly name = 'touch-gesture'

  private readonly threshold: number
  private readonly commitThreshold: number
  private readonly velocityThreshold: number
  private readonly gestureDirection: 'horizontal' | 'vertical'

  private context?: PluginContext
  private startX = 0
  private startY = 0
  private startTime = 0
  private isTracking = false
  private direction: 'next' | 'prev' | null = null
  private progressiveController: ProgressiveTransitionController | null = null
  private isPerpendicularScroll = false

  constructor(options?: TouchGesturePluginOptions) {
    this.threshold = options?.threshold ?? 30
    this.commitThreshold = options?.commitThreshold ?? 0.5
    this.velocityThreshold = options?.velocityThreshold ?? 0.5
    this.gestureDirection = options?.direction ?? 'horizontal'
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
    this.isPerpendicularScroll = false
  }

  private handleTouchMove = (ev: TouchEvent): void => {
    if (!this.context || !this.isTracking || ev.touches.length !== 1) {
      return
    }

    const touch = ev.touches[0]
    const deltaX = touch.clientX - this.startX
    const deltaY = touch.clientY - this.startY

    const isHorizontal = this.gestureDirection === 'horizontal'
    const primaryDelta = isHorizontal ? deltaX : deltaY
    const perpendicularDelta = isHorizontal ? deltaY : deltaX

    if (this.direction === null) {
      // Check if user is scrolling perpendicular to gesture direction
      if (Math.abs(perpendicularDelta) > Math.abs(primaryDelta)) {
        this.isPerpendicularScroll = true
        this.isTracking = false
        return
      }

      if (Math.abs(primaryDelta) < this.threshold) {
        return
      }

      // For horizontal: right = prev, left = next
      // For vertical: up = prev, down = next (inverted to match visual rotation)
      this.direction =
        primaryDelta > 0
          ? isHorizontal
            ? 'prev'
            : 'next'
          : isHorizontal
            ? 'next'
            : 'prev'
      this.progressiveController = this.context.requestProgressiveTransition(
        this.direction,
      )

      // Update start position to account for threshold
      if (isHorizontal) {
        this.startX = touch.clientX
      } else {
        this.startY = touch.clientY
      }
    }

    if (this.isPerpendicularScroll) {
      return
    }

    // Only prevent default if the event is cancelable
    if (ev.cancelable) {
      ev.preventDefault()
    }

    if (this.progressiveController) {
      const slideSize = isHorizontal
        ? this.context.el.offsetWidth
        : this.context.el.offsetHeight
      const currentDelta = isHorizontal
        ? touch.clientX - this.startX
        : touch.clientY - this.startY
      const progress = Math.abs(currentDelta) / slideSize
      this.progressiveController.setProgress(Math.min(1, progress))
    }
  }

  private handleTouchEnd = (ev: TouchEvent): void => {
    if (!this.context || !this.isTracking) {
      this.cleanup()
      return
    }

    const touch = ev.changedTouches[0]
    const isHorizontal = this.gestureDirection === 'horizontal'
    const delta = isHorizontal
      ? touch.clientX - this.startX
      : touch.clientY - this.startY
    const elapsed = Date.now() - this.startTime
    const velocity = Math.abs(delta) / elapsed

    if (this.progressiveController) {
      const progress = this.progressiveController.progress
      const shouldComplete =
        progress >= this.commitThreshold || velocity > this.velocityThreshold

      if (shouldComplete) {
        this.progressiveController.complete()
      } else {
        this.progressiveController.cancel()
      }
    } else if (this.direction === null && Math.abs(delta) >= this.threshold) {
      // Same direction logic as in handleTouchMove
      const goPrev = isHorizontal ? delta > 0 : delta < 0
      if (goPrev) {
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
    this.isPerpendicularScroll = false
  }
}

export default TouchGesturePlugin
