import { type BoxSliderOptions } from './box-slider-options'
import { type Effect } from './effects'
import { StateStore } from './state-store'
import { responder } from './responder'

export type EventType = 'after' | 'before' | 'destroy' | 'pause' | 'play'
export type EventData = { [key: string]: 'string' | number } | null
export type EventListenerCallback = (payload: EventData) => void

export class BoxSlider {
  private readonly options: BoxSliderOptions

  private _stateStore: StateStore | undefined
  private _el: HTMLElement | undefined
  private _effect: Effect | undefined
  private readonly slides: HTMLElement[]
  private activeIndex: number
  private autoScrollTimer?: number
  private eventListeners: { [ev: string]: EventListenerCallback[] }
  private elListeners: { [ev: string]: EventListener[] }
  private isDestroyed: boolean
  private transitionPromise?: Promise<void>

  get el() {
    if (this._el === undefined) {
      throw new Error('Slider element is null')
    }

    return this._el
  }

  get stateStore() {
    if (this._stateStore === undefined) {
      throw new Error('State store is null, are you trying ot interact with a destroyed slider?')
    }

    return this._stateStore
  }

  get effect() {
    if (this._effect === undefined) {
      throw new Error('Slide effect is null, are you trying ot interact with a destroyed slider?')
    }

    return this._effect
  }

  constructor(el: HTMLElement, options: Partial<BoxSliderOptions>) {
    if (!options.effect) {
      throw new Error('Effect must be specified in slider options')
    }

    this._effect = options.effect
    this._el = el
    this._stateStore = new StateStore()

    this.options = {
      speed: options.speed || 800,
      responsive: options.responsive !== false,
      timeout: options.timeout || 5000,
      autoScroll: options.autoScroll !== false,
      pauseOnHover: options.pauseOnHover !== false,
      startIndex: options.startIndex || 0,
      swipe: options.swipe !== false,
      swipeTolerance: options.swipeTolerance || 30,
    }
    this.slides = Array.from(el.children).filter((child: Node) => child instanceof HTMLElement) as HTMLElement[]
    this.activeIndex = this.options.startIndex
    this.eventListeners = {}
    this.elListeners = {}
    this.isDestroyed = false

    if (this.slides.length < this.activeIndex) {
      this.destroy()
      throw new Error(`Start index option is out of bounds - slides=${this.slides.length} start=${this.activeIndex}`)
    }

    this.applyEventListeners()
    responder.add(this)

    this.stateStore.storeAttributes(this.slides, ['aria-roledescription'])
    this.stateStore.storeAttributes(this.el, ['aria-live'])
    this.el.setAttribute('aria-live', 'polite')
    this.slides.forEach((slide) => slide.setAttribute('aria-roledescription', 'slide'))
    this.effect.initialize(this.el, this.slides, this.stateStore, { ...this.options })

    if (this.options.autoScroll) {
      this.setAutoScroll()
    }
  }

  reset(): void {
    this.stateStore.revert()
    this.effect.initialize(this.el, this.slides, this.stateStore, {
      ...this.options,
      startIndex: this.activeIndex,
    })
  }

  next(): Promise<void> {
    return this.skipTo(this.activeIndex === this.slides.length - 1 ? 0 : this.activeIndex + 1, false)
  }

  prev(): Promise<void> {
    return this.skipTo(this.activeIndex === 0 ? this.slides.length - 1 : this.activeIndex - 1, true)
  }

  skipTo(nextIndex: number, backwards?: boolean): Promise<void> {
    if (this.isDestroyed || nextIndex === this.activeIndex) {
      return Promise.resolve()
    }

    if (nextIndex < 0 || nextIndex >= this.slides.length) {
      throw new Error(`${nextIndex} is not a valid slide index`)
    }

    const settings = {
      el: this.el,
      slides: this.slides,
      speed: this.options.speed,
      currentIndex: this.activeIndex,
      isPrevious: backwards === undefined ? nextIndex < this.activeIndex : backwards,
      nextIndex,
    }
    this.activeIndex = nextIndex

    this.transitionPromise = (this.transitionPromise || Promise.resolve()).then(() => {
      if (this.options.autoScroll) {
        this.stopAutoPlay()
      }

      this.emit('before', {
        currentIndex: settings.currentIndex,
        nextIndex: settings.nextIndex,
        speed: settings.speed,
      })

      return this.effect.transition(settings).then(() => {
        if (this.options.autoScroll) {
          this.setAutoScroll()
        }

        this.emit('after', { activeIndex: settings.nextIndex })
      })
    })

    return this.transitionPromise
  }

  pause(): BoxSlider {
    if (this.autoScrollTimer) {
      this.stopAutoPlay()
      this.emit('pause')
    }

    return this
  }

  play(): BoxSlider {
    this.setAutoScroll()
    this.emit('play')

    return this
  }

  addEventListener(ev: EventType, callback: EventListenerCallback): BoxSlider {
    this.eventListeners[ev] = this.eventListeners[ev] || []
    this.eventListeners[ev].push(callback)

    return this
  }

  removeEventListener(ev: EventType, callback: EventListenerCallback): BoxSlider {
    if (this.eventListeners[ev]) {
      this.eventListeners[ev] = this.eventListeners[ev].filter((cb) => cb !== callback)
    }

    return this
  }

  destroy(): void {
    this.isDestroyed = true
    this.stopAutoPlay()

    if (this.effect.destroy) {
      this.effect.destroy(this.el)
    }

    this.stateStore.revert()
    responder.remove(this)
    this.emit('destroy')
    this.eventListeners = {}
    Object.keys(this.elListeners)
      .forEach(ev => this.elListeners[ev]
        .forEach(listener => this.el.removeEventListener(ev, listener)))
    this.elListeners = {}

    delete this._el
    delete this._stateStore
    delete this._effect
    this.slides.length = 0
  }

  private stopAutoPlay() {
    window.clearTimeout(this.autoScrollTimer)
  }

  private emit(ev: EventType, payload: EventData = null) {
    (this.eventListeners[ev] || []).forEach((cb) => cb(payload))
  }

  private setAutoScroll(): void {
    this.stopAutoPlay()
    this.el.setAttribute('aria-live', 'off')

    this.autoScrollTimer = window.setTimeout(() => this.next().then(() => {
      if (!this.isDestroyed) {
        this.setAutoScroll()
      }
    }), this.options.timeout)
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
