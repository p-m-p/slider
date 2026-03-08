import { StateStore } from './state-store'
import { responder } from './responder'
import { type TransitionQueue, createQueue } from './transition-queue'
import type {
  BoxSliderOptions,
  Effect,
  EventListenerMap,
  SliderEventData,
  SliderEventListenerMap,
  SliderEventType,
} from './types'

function safeMatchMedia(query: string): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia(query).matches
}

export const defaultOptions: BoxSliderOptions = Object.freeze({
  autoScroll: !safeMatchMedia('(prefers-reduced-motion: reduce)'),
  loop: true,
  pauseOnHover: safeMatchMedia('(pointer: fine)'),
  speed: 800,
  startIndex: 0,
  swipe: true,
  swipeTolerance: 30,
  timeout: 5000,
})

interface ProgressiveTransitionController {
  nextIndex: number
  progress: number
  setProgress(progress: number): void
  complete(): Promise<void>
  cancel(): Promise<void>
  abort(): void
}

export class BoxSlider {
  private _activeIndex: number
  private _el?: HTMLElement
  private _effect?: Effect
  private _stateStore?: StateStore

  private options: BoxSliderOptions
  private slides: HTMLElement[]
  private autoScrollTimer?: ReturnType<typeof setTimeout>
  private eventListeners: EventListenerMap
  private isDestroyed: boolean
  private transitionQueue: TransitionQueue
  private progressiveTransitionInProgress: boolean

  private elListeners: Array<{
    type: string
    listener: EventListener
    options?: AddEventListenerOptions
  }> = []

  private touchStartX = 0
  private touchStartY = 0
  private touchStartTime = 0
  private isTouchTracking = false
  private touchDirection: 'next' | 'prev' | null = null
  private touchProgressiveController: ProgressiveTransitionController | null =
    null
  private isPerpendicularScroll = false
  private pauseOnHoverWasPlaying = false

  /**
   * The currently active slide index
   */
  get activeIndex() {
    return this._activeIndex
  }

  /**
   * The slider element
   */
  get el() {
    if (this._el === undefined) {
      throw new Error('Slider element is undefined')
    }

    return this._el
  }

  /**
   * The number of slides in the slider
   */
  get length() {
    return this.slides.length
  }

  /**
   * Return the value of a option at key
   */
  getOption<T extends keyof BoxSliderOptions>(key: T): BoxSliderOptions[T] {
    return this.options[key]
  }

  private get stateStore() {
    if (this._stateStore === undefined) {
      throw new Error(
        'State store is undefined, are you trying to interact with a destroyed slider?',
      )
    }

    return this._stateStore
  }

  private get effect() {
    if (this._effect === undefined) {
      throw new Error(
        'Slide effect is undefined, are you trying to interact with a destroyed slider?',
      )
    }

    return this._effect
  }

  constructor(
    el: HTMLElement,
    effect: Effect,
    options?: Partial<BoxSliderOptions>,
  ) {
    this._el = el
    this._stateStore = new StateStore()

    this.transitionQueue = createQueue()
    this.slides = []
    this.eventListeners = {}
    this.isDestroyed = false
    this.progressiveTransitionInProgress = false

    this.options = {
      ...defaultOptions,
      ...options,
    }
    this._activeIndex = this.options.startIndex
    this.init(effect)
    this.applyEventListeners()

    responder.add(this)
  }

  /**
   * Reset the slider with optional new settings and effect
   */
  reset(options?: Partial<BoxSliderOptions>, effect?: Effect) {
    this.stopAutoScroll()
    this.removeEventListeners()

    if (typeof this.effect.destroy === 'function') {
      this.effect.destroy(this.el, this.slides)
    }

    this.stateStore.revert()
    this.options = {
      ...this.options,
      ...options,
    }

    if (
      options?.startIndex !== undefined &&
      !Number.isNaN(options.startIndex)
    ) {
      this._activeIndex = options.startIndex
    }

    this.init(effect || this.effect)
    this.applyEventListeners()
    this.emit('reset')
  }

  /**
   * Show the next slide. If the slider is at the last slide and loop is disabled
   * then the slider will not advance back to the first slide.
   */
  next() {
    const isLastSlide = this.activeIndex === this.slides.length - 1

    if (isLastSlide && !this.options.loop) {
      return Promise.resolve()
    }

    return this.skipTo(isLastSlide ? 0 : this.activeIndex + 1, false)
  }

  /**
   * Show the previous slide. If the slider is at the first slide and loop is disabled
   * then the slider will not advance back to the last slide.
   */
  prev(): Promise<void> {
    const isFirstSlide = this.activeIndex === 0

    if (isFirstSlide && !this.options.loop) {
      return Promise.resolve()
    }

    return this.skipTo(
      isFirstSlide ? this.slides.length - 1 : this.activeIndex - 1,
      true,
    )
  }

  /**
   * Skip to a specific slide index
   */
  skipTo(nextIndex: number, backwards?: boolean): Promise<void> {
    return new Promise((resolve) => {
      this.transitionQueue.push(async () => {
        await this.transitionTo(
          nextIndex,
          backwards === undefined ? nextIndex < this.activeIndex : backwards,
        )
        resolve()
      })
    })
  }

  /**
   * Pause the slider from auto scrolling
   */
  pause(): BoxSlider {
    this.options.autoScroll = false

    if (this.autoScrollTimer) {
      this.stopAutoScroll()
      this.emit('pause')
    }

    return this
  }

  /**
   * Start the slider auto scrolling
   */
  play(): BoxSlider {
    this.options.autoScroll = true
    this.setAutoScroll()
    this.emit('play')

    return this
  }

  /**
   * Add an event listener for a slider event
   */
  addEventListener<T extends SliderEventType>(
    ev: T,
    callback: SliderEventListenerMap[T],
  ): BoxSlider {
    if (!Array.isArray(this.eventListeners[ev])) {
      this.eventListeners[ev] = []
    }

    this.eventListeners[ev]!.push(callback)

    return this
  }

  /**
   * Remove an event listener for a slider event. The listener
   * must be the original function passed to addEventListener
   */
  removeEventListener<T extends SliderEventType>(
    ev: T,
    callback: SliderEventListenerMap[T],
  ): BoxSlider {
    const listeners = this.eventListeners[ev]?.filter(
      (cb) => cb !== callback,
    ) as EventListenerMap[T]

    this.eventListeners[ev] = listeners

    return this
  }

  /**
   * Destroy the slider, remove all event listeners and attributes
   */
  destroy(): void {
    this.isDestroyed = true
    this.stopAutoScroll()
    this.removeEventListeners()

    if (this.effect.destroy) {
      this.effect.destroy(this.el, this.slides)
    }

    this.stateStore.revert()
    this.transitionQueue.clear()
    responder.remove(this)
    this.emit('destroy')
    this.eventListeners = {}

    delete this._el
    delete this._stateStore
    delete this._effect
    this.slides.length = 0
  }

  private init(effect: Effect) {
    this._effect = effect
    this.slides = this.getSlides()
    this.stateStore.storeAttributes([this.el, ...this.slides], ['style'])

    if (this.activeIndex >= this.slides.length) {
      this._activeIndex = 0
    }

    this.effect.initialize(
      this.el,
      this.slides,
      {
        ...this.options,
        startIndex: this.activeIndex,
      },
      this.stateStore,
    )
    this.addAriaAttributes()

    if (this.options.autoScroll) {
      this.setAutoScroll()
    }
  }

  private addAriaAttributes() {
    this.stateStore.storeAttributes(
      [this.el, ...this.slides],
      ['aria-hidden', 'aria-live', 'aria-roledescription', 'role'],
    )

    this.el.setAttribute('aria-atomic', 'false')
    this.el.setAttribute('aria-live', 'polite')

    if (!this.el.hasAttribute('role')) {
      this.el.setAttribute('role', 'region')
    }

    this.slides.forEach((slide, index) => {
      if (!slide.hasAttribute('role')) {
        slide.setAttribute('role', 'group')
      }

      if (!slide.hasAttribute('aria-roledescription')) {
        slide.setAttribute('aria-roledescription', 'slide')
      }

      slide.setAttribute(
        'aria-hidden',
        index === this.activeIndex ? 'false' : 'true',
      )
    })
  }

  private getSlides(): HTMLElement[] {
    return [...this.el.children].filter(
      (child: Node) => child instanceof HTMLElement,
    ) as HTMLElement[]
  }

  private addElListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (ev: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ) {
    this.el.addEventListener(type, listener as EventListener, options)
    this.elListeners.push({
      type,
      listener: listener as EventListener,
      options,
    })
  }

  private removeEventListeners() {
    this.elListeners.forEach(({ type, listener, options }) => {
      this.el.removeEventListener(type, listener, options)
    })
    this.elListeners = []
  }

  private applyEventListeners() {
    if (this.options.pauseOnHover) {
      this.addElListener('pointerenter', this.handlePointerEnter)
      this.addElListener('pointerleave', this.handlePointerLeave)
    }

    if (this.options.swipe) {
      this.addElListener('touchstart', this.handleTouchStart, { passive: true })
      this.addElListener('touchmove', this.handleTouchMove, { passive: false })
      this.addElListener('touchend', this.handleTouchEnd, { passive: true })
      this.addElListener('touchcancel', this.handleTouchCancel, {
        passive: true,
      })
    }
  }

  private handlePointerEnter = () => {
    if (this.options.autoScroll) {
      this.pauseOnHoverWasPlaying = true
      this.pause()
    }
  }

  private handlePointerLeave = () => {
    if (this.pauseOnHoverWasPlaying) {
      this.pauseOnHoverWasPlaying = false
      this.play()
    }
  }

  private handleTouchStart = (ev: TouchEvent) => {
    if (ev.touches.length !== 1) {
      return
    }

    const touch = ev.touches[0]
    this.touchStartX = touch.clientX
    this.touchStartY = touch.clientY
    this.touchStartTime = Date.now()
    this.isTouchTracking = true
    this.touchDirection = null
    this.isPerpendicularScroll = false
  }

  private handleTouchMove = (ev: TouchEvent) => {
    if (!this.isTouchTracking || ev.touches.length !== 1) {
      return
    }

    const touch = ev.touches[0]
    const deltaX = touch.clientX - this.touchStartX
    const deltaY = touch.clientY - this.touchStartY

    const isHorizontal =
      (this.effect.swipeDirection ?? 'horizontal') === 'horizontal'
    const primaryDelta = isHorizontal ? deltaX : deltaY
    const perpendicularDelta = isHorizontal ? deltaY : deltaX

    if (this.touchDirection === null) {
      if (Math.abs(perpendicularDelta) > Math.abs(primaryDelta)) {
        this.isPerpendicularScroll = true
        this.isTouchTracking = false
        return
      }

      if (Math.abs(primaryDelta) < this.options.swipeTolerance) {
        return
      }

      // For horizontal: right = prev, left = next
      // For vertical: up = prev, down = next (inverted to match visual rotation)
      this.touchDirection =
        primaryDelta > 0
          ? isHorizontal
            ? 'prev'
            : 'next'
          : isHorizontal
            ? 'next'
            : 'prev'

      this.touchProgressiveController = this.prepareProgressiveTransition(
        this.touchDirection,
      )

      // Update start position and time to account for threshold
      if (isHorizontal) {
        this.touchStartX = touch.clientX
      } else {
        this.touchStartY = touch.clientY
      }
      this.touchStartTime = Date.now()
    }

    if (this.isPerpendicularScroll) {
      return
    }

    if (ev.cancelable) {
      ev.preventDefault()
    }

    if (this.touchProgressiveController) {
      const slideSize = isHorizontal
        ? this.el.offsetWidth
        : this.el.offsetHeight
      const currentDelta = isHorizontal
        ? touch.clientX - this.touchStartX
        : touch.clientY - this.touchStartY
      const progress = Math.abs(currentDelta) / slideSize
      this.touchProgressiveController.setProgress(Math.min(1, progress))
    }
  }

  private handleTouchEnd = (ev: TouchEvent) => {
    if (!this.isTouchTracking) {
      this.cleanupTouch()
      return
    }

    const touch = ev.changedTouches[0]
    const isHorizontal =
      (this.effect.swipeDirection ?? 'horizontal') === 'horizontal'
    const delta = isHorizontal
      ? touch.clientX - this.touchStartX
      : touch.clientY - this.touchStartY
    const elapsed = Date.now() - this.touchStartTime
    const velocity = Math.abs(delta) / elapsed

    const commitThreshold = 0.5
    const velocityThreshold = 0.3

    if (this.touchProgressiveController) {
      const progress = this.touchProgressiveController.progress
      const shouldComplete =
        progress >= commitThreshold || velocity > velocityThreshold

      if (shouldComplete) {
        this.touchProgressiveController.complete()
      } else {
        this.touchProgressiveController.cancel()
      }
    } else if (
      this.touchDirection === null &&
      Math.abs(delta) >= this.options.swipeTolerance
    ) {
      const goPrev = isHorizontal ? delta > 0 : delta < 0
      if (goPrev) {
        this.prev()
      } else {
        this.next()
      }
    }

    this.cleanupTouch()
  }

  private handleTouchCancel = () => {
    if (this.touchProgressiveController) {
      this.touchProgressiveController.abort()
    }
    this.cleanupTouch()
  }

  private cleanupTouch() {
    this.isTouchTracking = false
    this.touchDirection = null
    this.touchProgressiveController = null
    this.isPerpendicularScroll = false
  }

  private prepareProgressiveTransition(
    direction: 'next' | 'prev',
  ): ProgressiveTransitionController | null {
    if (this.progressiveTransitionInProgress) {
      return null
    }

    const isNext = direction === 'next'
    const isLastSlide = this.activeIndex === this.slides.length - 1
    const isFirstSlide = this.activeIndex === 0

    if (isNext && isLastSlide && !this.options.loop) {
      return null
    }

    if (!isNext && isFirstSlide && !this.options.loop) {
      return null
    }

    const nextIndex = isNext
      ? isLastSlide
        ? 0
        : this.activeIndex + 1
      : isFirstSlide
        ? this.slides.length - 1
        : this.activeIndex - 1

    const settings = {
      el: this.el,
      slides: this.slides,
      speed: this.options.speed,
      currentIndex: this.activeIndex,
      isPrevious: !isNext,
      nextIndex,
    }

    const state = this.effect.prepareTransition(settings)

    if (!state) {
      return null
    }

    this.progressiveTransitionInProgress = true
    this.stopAutoScroll()

    this.emit('before', {
      currentIndex: settings.currentIndex,
      nextIndex: settings.nextIndex,
      speed: settings.speed,
    })

    let currentProgress = 0

    const controller: ProgressiveTransitionController = {
      nextIndex,

      get progress() {
        return currentProgress
      },

      setProgress: (progress: number) => {
        currentProgress = Math.max(0, Math.min(1, progress))
        state.setProgress(currentProgress)
      },

      complete: async () => {
        try {
          await state.complete(currentProgress)
        } finally {
          this.progressiveTransitionInProgress = false
        }

        if (this.isDestroyed) {
          return
        }

        this._activeIndex = nextIndex
        this.slides[settings.currentIndex].setAttribute('aria-hidden', 'true')
        this.slides[nextIndex].setAttribute('aria-hidden', 'false')

        if (this.options.autoScroll) {
          this.setAutoScroll()
        }

        this.emit('after')
      },

      cancel: async () => {
        try {
          await state.cancel(currentProgress)
        } finally {
          this.progressiveTransitionInProgress = false
        }

        if (this.options.autoScroll && !this.isDestroyed) {
          this.setAutoScroll()
        }
      },

      abort: () => {
        state.abort()
        this.progressiveTransitionInProgress = false

        if (this.options.autoScroll && !this.isDestroyed) {
          this.setAutoScroll()
        }
      },
    }

    return controller
  }

  private async transitionTo(
    nextIndex: number,
    backwards: boolean,
  ): Promise<void> {
    this.stopAutoScroll()

    if (
      this.isDestroyed ||
      nextIndex === this.activeIndex ||
      nextIndex < 0 ||
      nextIndex >= this.slides.length
    ) {
      return
    }

    const settings = {
      el: this.el,
      slides: this.slides,
      speed: this.options.speed,
      currentIndex: this.activeIndex,
      isPrevious: backwards,
      nextIndex,
    }

    this._activeIndex = nextIndex

    this.emit('before', {
      currentIndex: settings.currentIndex,
      nextIndex: settings.nextIndex,
      speed: settings.speed,
    })

    try {
      const state = this.effect.prepareTransition(settings)

      if (state) {
        await state.complete(0)
      }
    } catch {
      // Transition may throw an error from aborted animation if slides are removed
      return
    }

    // It's possible that the slider was destroyed before the transition completed
    if (this.isDestroyed) {
      return
    }

    if (this.options.autoScroll) {
      this.setAutoScroll()
    }

    this.slides[settings.currentIndex].setAttribute('aria-hidden', 'true')
    this.slides[settings.nextIndex].setAttribute('aria-hidden', 'false')

    this.emit('after')
  }

  private stopAutoScroll() {
    globalThis.clearTimeout(this.autoScrollTimer)
  }

  private emit<T extends SliderEventType>(ev: T, payload?: SliderEventData) {
    const handlers: EventListenerMap[T] = this.eventListeners[ev]

    if (ev === 'destroy') {
      const destroyHandlers = handlers as EventListenerMap['destroy']
      destroyHandlers?.forEach((cb) => cb())
    } else {
      handlers?.forEach((cb) =>
        cb({
          currentIndex: this.activeIndex,
          speed: this.options.speed,
          ...payload,
        }),
      )
    }
  }

  private setAutoScroll() {
    this.stopAutoScroll()

    globalThis.requestAnimationFrame(() => {
      // Check if the element is still in the DOM, might have been removed
      // before animation frame callback is called
      if (!this._el) {
        return
      }

      this.el.setAttribute('aria-live', 'off')

      this.autoScrollTimer = globalThis.setTimeout(
        () => this.next(),
        this.options.timeout,
      )
    })
  }
}

export default BoxSlider
