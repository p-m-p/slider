import BoxSlider, { defaultOptions } from '@boxslider/slider/BoxSlider'
import type {
  BoxSliderOptions,
  Effect,
  SliderEventType,
} from '@boxslider/slider'
import { SafeBaseElement } from './core'

const BOOLEAN_ATTRIBUTES = ['auto-scroll', 'pause-on-hover', 'swipe']
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
type BooleanProp = 'autoScroll' | 'pauseOnHover' | 'swipe'

export interface SliderElement extends SliderElementProps, HTMLElement {
  readonly slider?: BoxSlider
  readonly options: BoxSliderOptions
}

export default abstract class Slider
  extends SafeBaseElement
  implements SliderElementProps
{
  #slider?: BoxSlider

  #autoScroll = defaultOptions.autoScroll
  #pauseOnHove = defaultOptions.pauseOnHover
  #speed = defaultOptions.speed
  #swipe = defaultOptions.swipe
  #swipeTolerance = defaultOptions.swipeTolerance
  #startIndex = defaultOptions.startIndex
  #timeout = defaultOptions.timeout

  get slider() {
    return this.#slider
  }

  get autoScroll() {
    return this.#autoScroll
  }

  set autoScroll(autoScroll: boolean) {
    this.#autoScroll = autoScroll
    this.reset({ autoScroll })
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
      pauseOnHover: this.pauseOnHover,
      speed: this.speed,
      startIndex: this.startIndex,
      swipe: this.swipe,
      swipeTolerance: this.swipeTolerance,
      timeout: this.timeout,
    }
  }

  protected init(effect: Effect) {
    const slider = new BoxSlider(this, effect, this.options)
    const events: SliderEventType[] = [
      'play',
      'pause',
      'before',
      'after',
      'destroy',
    ]

    events.forEach((ev) =>
      slider.addEventListener(ev, (detail) =>
        this.dispatchEvent(new CustomEvent(ev, { detail })),
      ),
    )

    this.#slider = slider
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
    this.slider?.destroy()
    this.#slider = undefined
  }
}
