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

export const defaultOptions: BoxSliderOptions = Object.freeze({
  autoScroll:
    typeof matchMedia !== 'undefined' &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches,
  loop: true,
  pauseOnHover: false,
  speed: 800,
  startIndex: 0,
  swipe: true,
  swipeTolerance: 30,
  timeout: 5000,
})

export default class BoxSlider {
  private _activeIndex: number
  private _el?: HTMLElement
  private _effect?: Effect
  private _stateStore?: StateStore

  private options: BoxSliderOptions
  private slides: HTMLElement[]
  private autoScrollTimer?: number
  private eventListeners: EventListenerMap
  private elListeners: { [ev: string]: EventListener[] }
  private isDestroyed: boolean
  private transitionQueue: TransitionQueue

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
    this.elListeners = {}
    this.isDestroyed = false

    this.options = {
      ...defaultOptions,
      ...options,
    }
    this._activeIndex = this.options.startIndex
    this.init(effect)
    this.applyEventListeners()

    responder.add(this)

    this.emit('init')
  }

  /**
   * Reset the slider with optional new settings and effect
   */
  reset(options?: Partial<BoxSliderOptions>, effect?: Effect) {
    this.stopAutoScroll()

    if (typeof this.effect.destroy === 'function') {
      this.effect.destroy(this.el, this.slides)
    }

    this.stateStore.revert()
    this.options = {
      ...this.options,
      ...options,
    }

    if (options?.startIndex !== undefined && !isNaN(options.startIndex)) {
      this._activeIndex = options.startIndex
    }

    this.init(effect || this.effect)
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

    if (this.effect.destroy) {
      this.effect.destroy(this.el, this.slides)
    }

    this.stateStore.revert()
    this.transitionQueue.clear()
    responder.remove(this)
    this.emit('destroy')
    this.eventListeners = {}
    Object.entries(this.elListeners).forEach(([ev, listeners]) =>
      listeners.forEach((listener) =>
        this.el.removeEventListener(ev, listener),
      ),
    )
    this.elListeners = {}

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
    return Array.from(this.el.children).filter(
      (child: Node) => child instanceof HTMLElement,
    ) as HTMLElement[]
  }

  private transitionTo(nextIndex: number, backwards: boolean): Promise<void> {
    return new Promise((resolve) => {
      this.stopAutoScroll()

      if (
        this.isDestroyed ||
        nextIndex === this.activeIndex ||
        nextIndex < 0 ||
        nextIndex >= this.slides.length
      ) {
        return resolve()
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

      const transition = this.effect.transition(settings) ?? Promise.resolve()
      transition.then(() => {
        if (this.options.autoScroll) {
          this.setAutoScroll()
        }

        this.slides[settings.currentIndex].setAttribute('aria-hidden', 'true')
        this.slides[settings.nextIndex].setAttribute('aria-hidden', 'false')

        this.emit('after')
        resolve()
      })
    })
  }

  private stopAutoScroll() {
    window.clearTimeout(this.autoScrollTimer)
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

    window.requestAnimationFrame(() => {
      // Check if the element is still in the DOM, might have been removed
      // before animation frame callback is called
      if (!this._el) {
        return
      }

      this.el.setAttribute('aria-live', 'off')

      this.autoScrollTimer = window.setTimeout(
        () => this.next(),
        this.options.timeout,
      )
    })
  }

  private addElListener(ev: keyof HTMLElementEventMap, handler: EventListener) {
    this.el.addEventListener(ev, handler)
    this.elListeners[ev] = this.elListeners[ev] || []
    this.elListeners[ev].push(handler)
  }

  private applyEventListeners() {
    this.addElListener('pointerenter', () => {
      if (this.options.autoScroll && this.options.pauseOnHover) {
        this.pause()
      }
    })
    this.addElListener('pointerleave', () => {
      if (this.options.autoScroll && this.options.pauseOnHover) {
        this.play()
      }
    })

    if (this.options.swipe) {
      this.addSwipeNavigation()
    }
  }

  private addSwipeNavigation() {
    let pointerTraceX = 0

    this.addElListener('pointerdown', (ev) => {
      pointerTraceX = (ev as PointerEvent).clientX
    })

    this.addElListener('pointerup', (ev) => {
      const distanceX = (ev as PointerEvent).clientX - pointerTraceX

      // XXX Need to be able to determine if effect scrolling is vertical
      if (Math.abs(distanceX) >= this.options.swipeTolerance) {
        if (distanceX > 0) {
          this.prev()
        } else {
          this.next()
        }

        ev.stopPropagation()
      }
    })
  }
}
