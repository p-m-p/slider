import BoxSlider, { defaultOptions } from '@boxslider/slider/BoxSlider'
import type {
  BoxSliderOptions,
  Effect,
  SliderEventType,
} from '@boxslider/slider'
import { SafeBaseElement } from './core'

const BOOLEAN_ATTRIBUTES = [
  'auto-scroll',
  'loop',
  'enable-touch',
  'pause-on-hover',
]
const NUMERIC_ATTRIBUTES = ['speed', 'start-index', 'timeout']
export const SLIDER_ATTRIBUTES = [...BOOLEAN_ATTRIBUTES, ...NUMERIC_ATTRIBUTES]

type NumericProp = 'speed' | 'startIndex' | 'timeout'
type BooleanProp = 'autoScroll' | 'loop' | 'enableTouch' | 'pauseOnHover'

export interface SliderElement extends BoxSliderOptions, HTMLElement {
  readonly slider?: BoxSlider
  readonly options: BoxSliderOptions
  enableTouch: boolean
  pauseOnHover: boolean
}

export default abstract class Slider
  extends SafeBaseElement
  implements SliderElement
{
  #slider?: BoxSlider
  #observer: MutationObserver
  #optionsCache: Partial<BoxSliderOptions> = {}
  #enableTouch = true
  #pauseOnHover = true

  static observedAttributes = SLIDER_ATTRIBUTES

  #getOrDefault<T extends keyof BoxSliderOptions>(
    option: T,
  ): BoxSliderOptions[T] {
    return (
      this.#optionsCache[option] ??
      this.#slider?.getOption(option) ??
      defaultOptions[option]
    )
  }

  get slider() {
    return this.#slider
  }

  get autoScroll() {
    return this.#getOrDefault('autoScroll')
  }

  set autoScroll(autoScroll: boolean) {
    if (this.slider) {
      if (autoScroll) {
        this.slider.play()
      } else {
        this.slider.pause()
      }
    } else {
      this.reset({ autoScroll })
    }
  }

  get loop() {
    return this.#getOrDefault('loop')
  }

  set loop(loop: boolean) {
    this.reset({ loop })
  }

  get enableTouch() {
    return this.#enableTouch
  }

  set enableTouch(enableTouch: boolean) {
    if (this.#enableTouch === enableTouch) {
      return
    }

    this.#enableTouch = enableTouch
    this.slider?.reset({ swipe: enableTouch })
  }

  get pauseOnHover() {
    return this.#pauseOnHover
  }

  set pauseOnHover(pauseOnHover: boolean) {
    if (this.#pauseOnHover === pauseOnHover) {
      return
    }

    this.#pauseOnHover = pauseOnHover
    this.slider?.reset({ pauseOnHover })
  }

  get speed() {
    return this.#getOrDefault('speed')
  }

  set speed(speed: number) {
    this.reset({ speed })
  }

  get startIndex() {
    return this.#getOrDefault('startIndex')
  }

  set startIndex(startIndex: number) {
    this.reset({ startIndex })
  }

  get timeout() {
    return this.#getOrDefault('timeout')
  }

  set timeout(timeout: number) {
    this.reset({ timeout })
  }

  get swipe() {
    return this.#enableTouch
  }

  set swipe(swipe: boolean) {
    this.enableTouch = swipe
  }

  get swipeDirection(): 'horizontal' | 'vertical' {
    return this.getSwipeDirection()
  }

  set swipeDirection(_: 'horizontal' | 'vertical') {
    // swipeDirection is determined by the component type (e.g., Cube with vertical direction)
    // Setting via this property is not supported - use the component's direction attribute instead
  }

  get swipeTolerance() {
    return this.#getOrDefault('swipeTolerance')
  }

  set swipeTolerance(swipeTolerance: number) {
    this.reset({ swipeTolerance })
  }

  get options(): BoxSliderOptions {
    return {
      autoScroll: this.autoScroll,
      loop: this.loop,
      pauseOnHover: this.pauseOnHover,
      speed: this.speed,
      startIndex: this.startIndex,
      swipe: this.enableTouch,
      swipeDirection: this.getSwipeDirection(),
      swipeTolerance: this.#getOrDefault('swipeTolerance'),
      timeout: this.timeout,
    }
  }

  constructor() {
    super()

    this.#observer = new MutationObserver((mutations) => {
      const needsReset = mutations.some((mutation) =>
        [...mutation.addedNodes, ...mutation.removedNodes].some(
          (node: Node) => {
            return !(node instanceof HTMLElement && node.dataset.bsElement)
          },
        ),
      )

      if (needsReset) {
        this.reset({ startIndex: this.slider?.activeIndex ?? 0 })
      }
    })
  }

  protected getSwipeDirection(): 'horizontal' | 'vertical' {
    return 'horizontal'
  }

  protected init(effect: Effect) {
    const slider = new BoxSlider(this, effect, {
      ...this.#optionsCache,
      swipe: this.#enableTouch,
      swipeDirection: this.getSwipeDirection(),
      pauseOnHover: this.#pauseOnHover,
    })
    const events: SliderEventType[] = [
      'after',
      'before',
      'destroy',
      'pause',
      'play',
      'reset',
    ]

    events.forEach((ev) =>
      slider.addEventListener(ev, (detail) =>
        this.dispatchEvent(new CustomEvent(ev, { detail })),
      ),
    )

    this.#slider = slider
    this.#observer.observe(this, { childList: true })
    this.#optionsCache = {}
  }

  protected reset(options: Partial<BoxSliderOptions>, effect?: Effect) {
    if (this.slider) {
      const combinedOptions = { ...this.#optionsCache, ...options }

      this.slider?.reset(combinedOptions, effect)
      this.#optionsCache = {}
    } else {
      this.#optionsCache = { ...this.#optionsCache, ...options }
    }
  }

  attributeChangedCallback(name: string, _: string, value: string) {
    if (SLIDER_ATTRIBUTES.includes(name)) {
      const propName = name.replaceAll(/-./g, (m) => m[1].toUpperCase())

      if (NUMERIC_ATTRIBUTES.includes(name)) {
        this[propName as NumericProp] = Number.parseInt(value, 10)
      } else if (BOOLEAN_ATTRIBUTES.includes(name)) {
        this[propName as BooleanProp] = value !== 'false'
      }
    }
  }

  disconnectedCallback() {
    this.#observer.disconnect()
    this.slider?.destroy()
    this.#slider = undefined
  }
}
