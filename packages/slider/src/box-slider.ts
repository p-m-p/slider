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

  get activeIndex() {
    return this._activeIndex
  }

  get el() {
    if (this._el === undefined) {
      throw new Error('Slider element is undefined')
    }

    return this._el
  }

  get length() {
    return this.slides.length
  }

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

    if (this.slides.length < this.activeIndex) {
      this.destroy()
      throw new Error(
        `Start index option is out of bounds - slides=${this.slides.length} start=${this.activeIndex}`,
      )
    }

    this.applyEventListeners()
    responder.add(this)
  }

  reset(options?: Partial<BoxSliderOptions>, effect?: Effect) {
    this.stopAutoScroll()

    if (typeof this.effect.destroy === 'function') {
      this.effect.destroy(this.el)
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
  }

  next(): Promise<void> {
    return this.skipTo(
      this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1,
      false,
    )
  }

  prev(): Promise<void> {
    return this.skipTo(
      this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1,
    )
  }

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

  pause(): BoxSlider {
    this.options.autoScroll = false

    if (this.autoScrollTimer) {
      this.stopAutoScroll()
      this.emit('pause')
    }

    return this
  }

  play(): BoxSlider {
    this.options.autoScroll = true
    this.setAutoScroll()
    this.emit('play')

    return this
  }

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

  destroy(): void {
    this.isDestroyed = true
    this.stopAutoScroll()

    if (this.effect.destroy) {
      this.effect.destroy(this.el)
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
      ['aria-live', 'role', 'aria-roledescription'],
    )

    this.el.setAttribute('aria-atomic', 'false')
    this.el.setAttribute('aria-live', 'polite')

    if (!this.el.hasAttribute('role')) {
      this.el.setAttribute('role', 'region')
    }

    this.slides.forEach((slide) => {
      if (!slide.hasAttribute('role')) {
        slide.setAttribute('role', 'group')
      }

      if (!slide.hasAttribute('aria-roledescription')) {
        slide.setAttribute('aria-roledescription', 'slide')
      }
    })
  }

  private getSlides(): HTMLElement[] {
    return Array.from(this.el.children).filter(
      (child: Node) => child instanceof HTMLElement,
    ) as HTMLElement[]
  }

  private transitionTo(nextIndex: number, backwards: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isDestroyed || nextIndex === this.activeIndex) {
        return resolve()
      }

      if (nextIndex < 0 || nextIndex >= this.slides.length) {
        return reject(new Error(`${nextIndex} is not a valid slide index`))
      }

      this.stopAutoScroll()

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

      this.effect.transition(settings).then(() => {
        if (this.options.autoScroll) {
          this.setAutoScroll()
        }

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
