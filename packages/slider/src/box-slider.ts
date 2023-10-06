import type { BoxSliderOptions } from './box-slider-options'
import type { Effect } from './effects/effect'
import { StateStore } from './state-store'
import { responder } from './responder'

export type SliderEventType = 'after' | 'before' | 'destroy' | 'pause' | 'play'
export type SliderEventData = {
  currentIndex: number
  nextIndex?: number
  speed: number
}
export type SliderEventHandler = (ev: SliderEventData) => void

class BoxSlider {
  private readonly options: BoxSliderOptions

  private _stateStore?: StateStore
  private _el?: HTMLElement
  private _effect?: Effect
  private slides: HTMLElement[]
  private activeIndex: number
  private autoScrollTimer?: number
  private eventListeners: { [ev: string]: SliderEventHandler[] }
  private elListeners: { [ev: string]: EventListener[] }
  private isDestroyed: boolean
  private transitionPromise?: Promise<void>

  get el() {
    if (this._el === undefined) {
      throw new Error('Slider element is null')
    }

    return this._el
  }

  private get stateStore() {
    if (this._stateStore === undefined) {
      throw new Error('State store is null, are you trying to interact with a destroyed slider?')
    }

    return this._stateStore
  }

  private get effect() {
    if (this._effect === undefined) {
      throw new Error('Slide effect is null, are you trying to interact with a destroyed slider?')
    }

    return this._effect
  }

  constructor(el: HTMLElement, options: Partial<BoxSliderOptions>) {
    if (!options.effect) {
      throw new Error('Effect must be specified in slider options')
    }

    this._el = el
    this._stateStore = new StateStore()

    this.options = {
      speed: 800,
      timeout: 5000,
      autoScroll: true,
      pauseOnHover: false,
      startIndex: 0,
      swipe: true,
      swipeTolerance: 30,
      ...options,
    }
    this.slides = []
    this.activeIndex = this.options.startIndex
    this.eventListeners = {}
    this.elListeners = {}
    this.isDestroyed = false

    this.init(this.options)

    if (this.slides.length < this.activeIndex) {
      this.destroy()
      throw new Error(`Start index option is out of bounds - slides=${this.slides.length} start=${this.activeIndex}`)
    }

    this.applyEventListeners()
    responder.add(this)
  }

  reset(resetOptions: Partial<BoxSliderOptions> = {}) {
    this.stopAutoScroll()
    const options = {
      ...this.options,
      ...resetOptions,
      startIndex: this.activeIndex,
    }
    this.effect.destroy && this.effect.destroy(this.el)
    this.stateStore.revert()
    this.init(options)
  }

  next(): Promise<void> {
    return this.skipTo(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1, false)
  }

  prev(): Promise<void> {
    return this.skipTo(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1, true)
  }

  skipTo(nextIndex: number, backwards?: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isDestroyed || nextIndex === this.activeIndex) {
        return resolve()
      }

      if (nextIndex < 0 || nextIndex >= this.slides.length) {
        reject(new Error(`${nextIndex} is not a valid slide index`))
      }

      if (this.options.autoScroll) {
        this.stopAutoScroll()
      }

      const settings = {
        el: this.el,
        slides: this.slides,
        speed: this.options.speed,
        currentIndex: this.activeIndex,
        isPrevious: backwards === undefined ? nextIndex < this.activeIndex : backwards,
        nextIndex,
      }

      this.transitionPromise = (this.transitionPromise || Promise.resolve()).then(() => {
        requestAnimationFrame(() => {
          this.activeIndex = nextIndex

          this.emit('before', {
            currentIndex: settings.currentIndex,
            nextIndex: settings.nextIndex,
            speed: settings.speed,
          })

          return this.effect.transition(settings).then(() => {
            if (this.options.autoScroll) {
              this.setAutoScroll()
            }

            this.emit('after')
            resolve()
          })
        })
      })
    })
  }

  pause(): BoxSlider {
    if (this.autoScrollTimer) {
      this.stopAutoScroll()
      this.emit('pause')
    }

    return this
  }

  play(): BoxSlider {
    this.setAutoScroll()
    this.emit('play')

    return this
  }

  addEventListener(ev: SliderEventType, callback: (ev: SliderEventData) => void): BoxSlider {
    if (!Array.isArray(this.eventListeners[ev])) {
      this.eventListeners[ev] = []
    }

    this.eventListeners[ev].push(callback)

    return this
  }

  removeEventListener(ev: SliderEventType, callback: (ev: SliderEventData) => void): BoxSlider {
    this.eventListeners[ev] = this.eventListeners[ev]?.filter((cb) => cb !== callback)

    return this
  }

  destroy(): void {
    this.isDestroyed = true
    this.stopAutoScroll()

    if (this.effect.destroy) {
      this.effect.destroy(this.el)
    }

    this.stateStore.revert()
    responder.remove(this)
    this.emit('destroy')
    this.eventListeners = {}
    Object.keys(this.elListeners).forEach((ev) =>
      this.elListeners[ev].forEach((listener) => this.el.removeEventListener(ev, listener)),
    )
    this.elListeners = {}

    delete this._el
    delete this._stateStore
    delete this._effect
    this.slides.length = 0
  }

  private init(options: BoxSliderOptions) {
    this._effect = options.effect
    this.slides = this.getSlides()
    this.effect.initialize(this.el, this.slides, this.stateStore, options)
    this.addAriaAttributes()

    if (this.options.autoScroll) {
      this.setAutoScroll()
    }
  }

  private addAriaAttributes() {
    this.stateStore.storeAttributes(this.el, ['aria-live'])
    this.el.setAttribute('aria-live', 'polite')
    this.stateStore.storeAttributes(this.slides, ['aria-roledescription'])
    this.slides.forEach((slide) => slide.setAttribute('aria-roledescription', 'slide'))
  }

  private getSlides(): HTMLElement[] {
    return Array.from(this.el.children).filter((child: Node) => child instanceof HTMLElement) as HTMLElement[]
  }

  private stopAutoScroll() {
    window.clearTimeout(this.autoScrollTimer)
  }

  private emit(ev: SliderEventType, payload?: Partial<SliderEventData>) {
    this.eventListeners[ev]?.forEach((cb) =>
      cb({
        currentIndex: this.activeIndex,
        speed: this.options.speed,
        ...payload,
      }),
    )
  }

  private setAutoScroll() {
    this.stopAutoScroll()
    this.el.setAttribute('aria-live', 'off')

    this.autoScrollTimer = window.setTimeout(
      () =>
        this.next().then(() => {
          if (!this.isDestroyed) {
            this.setAutoScroll()
          }
        }),
      this.options.timeout,
    )
  }

  private addElListener(ev: keyof HTMLElementEventMap, handler: EventListener) {
    this.el.addEventListener(ev, handler)
    this.elListeners[ev] = this.elListeners[ev] || []
    this.elListeners[ev].push(handler)
  }

  private applyEventListeners() {
    if (this.options.autoScroll && this.options.pauseOnHover) {
      this.addElListener('pointerenter', () => this.pause())
      this.addElListener('pointerleave', () => this.play())
    }

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

export default BoxSlider
