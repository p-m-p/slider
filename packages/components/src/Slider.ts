import BoxSlider, { defaultOptions } from '@boxslider/slider/BoxSlider'
import type {
  BoxSliderOptions,
  Effect,
  SliderEventType,
} from '@boxslider/slider'
import { SafeBaseElement } from './core'

const BOOLEAN_ATTRIBUTES = ['auto-scroll', 'loop', 'pause-on-hover', 'swipe']
const NUMERIC_ATTRIBUTES = [
  'speed',
  'start-index',
  'swipe-tolerance',
  'timeout',
]
export const SLIDER_ATTRIBUTES = [...BOOLEAN_ATTRIBUTES, ...NUMERIC_ATTRIBUTES]

export interface SliderElementProps {
  autoScroll: boolean
  pauseOnHover: boolean
  speed: number
  swipe: boolean
  swipeTolerance: number
  startIndex: number
  timeout: number
}

type NumericProp = 'speed' | 'startIndex' | 'swipeTolerance' | 'timeout'
type BooleanProp = 'autoScroll' | 'loop' | 'pauseOnHover' | 'swipe'

export interface SliderElement extends SliderElementProps, HTMLElement {
  readonly slider?: BoxSlider
  readonly options: BoxSliderOptions
}

export default abstract class Slider
  extends SafeBaseElement
  implements SliderElementProps
{
  #slider?: BoxSlider
  #observer: MutationObserver

  #autoScroll = defaultOptions.autoScroll
  #loop = defaultOptions.loop
  #pauseOnHove = defaultOptions.pauseOnHover
  #speed = defaultOptions.speed
  #swipe = defaultOptions.swipe
  #swipeTolerance = defaultOptions.swipeTolerance
  #startIndex = defaultOptions.startIndex
  #timeout = defaultOptions.timeout

  static observedAttributes = SLIDER_ATTRIBUTES

  get slider() {
    return this.#slider
  }

  get autoScroll() {
    return this.#autoScroll
  }

  set autoScroll(autoScroll: boolean) {
    this.#autoScroll = autoScroll

    if (autoScroll) {
      this.slider?.play()
    } else {
      this.slider?.pause()
    }
  }

  get loop() {
    return this.#loop
  }

  set loop(loop: boolean) {
    this.#loop = loop
    this.reset({ loop })
  }

  get pauseOnHover() {
    return this.#pauseOnHove
  }

  set pauseOnHover(pauseOnHover: boolean) {
    this.#pauseOnHove = pauseOnHover
    this.reset({ pauseOnHover })
  }

  get speed() {
    return this.#speed
  }

  set speed(speed: number) {
    this.#speed = speed
    this.reset({ speed })
  }

  get startIndex() {
    return this.#startIndex
  }

  set startIndex(startIndex: number) {
    this.#startIndex = startIndex
    this.reset({ startIndex })
  }

  get swipe() {
    return this.#swipe
  }

  set swipe(swipe: boolean) {
    this.#swipe = swipe
    this.reset({ swipe })
  }

  get swipeTolerance() {
    return this.#swipeTolerance
  }

  set swipeTolerance(swipeTolerance: number) {
    this.#swipeTolerance = swipeTolerance
    this.reset({ swipeTolerance })
  }

  get timeout() {
    return this.#timeout
  }

  set timeout(timeout: number) {
    this.#timeout = timeout
    this.reset({ timeout })
  }

  get options(): BoxSliderOptions {
    return {
      autoScroll: this.autoScroll,
      loop: this.loop,
      pauseOnHover: this.pauseOnHover,
      speed: this.speed,
      startIndex: this.startIndex,
      swipe: this.swipe,
      swipeTolerance: this.swipeTolerance,
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
        this.reset({
          ...this.options,
          startIndex: this.slider?.activeIndex ?? 0,
        })
      }
    })
  }

  protected init(effect: Effect) {
    const slider = new BoxSlider(this, effect, this.options)
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
  }

  protected reset(options: Partial<BoxSliderOptions>, effect?: Effect) {
    this.slider?.reset(options, effect)
  }

  attributeChangedCallback(name: string, _: string, value: string) {
    if (SLIDER_ATTRIBUTES.includes(name)) {
      const propName = name.replace(/-./g, (m) => m[1].toUpperCase())

      if (NUMERIC_ATTRIBUTES.includes(name)) {
        this[propName as NumericProp] = parseInt(value, 10)
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
