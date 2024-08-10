import BoxSlider, { defaultOptions } from '@boxslider/slider/BoxSlider'
import type {
  BoxSliderOptions,
  Effect,
  SliderEventData,
  SliderEventType,
} from '@boxslider/slider'
import { SafeBaseElement } from './core'

declare global {
  interface ElementEventMap {
    after: CustomEvent<SliderEventData>
    before: CustomEvent<SliderEventData>
    destroy: CustomEvent<void>
    pause: CustomEvent<SliderEventData>
    play: CustomEvent<SliderEventData>
  }
}

export function camelize(str: string) {
  return str.replace(/-./g, (m) => m[1].toUpperCase())
}

export function getNumericAttribute(
  el: HTMLElement,
  attribute: string,
  defaultValue: number,
) {
  const attributeValue = el.getAttribute(attribute)
  let value: number = NaN

  if (attributeValue !== null) {
    value = parseInt(attributeValue, 10)
  }

  return isNaN(value) ? defaultValue : value
}

export function getBooleanAttribute(
  el: HTMLElement,
  attribute: string,
  defaultValue: boolean,
) {
  if (el.hasAttribute(attribute)) {
    return el.getAttribute(attribute) !== 'false'
  }

  return defaultValue
}

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

  get slider() {
    return this.#slider
  }

  get autoScroll() {
    return (
      this.#slider?.getOption('autoScroll') ??
      getBooleanAttribute(this, 'auto-scroll', defaultOptions.autoScroll)
    )
  }

  set autoScroll(autoScroll: boolean) {
    this.reset({ autoScroll })
  }

  get pauseOnHover() {
    return (
      this.#slider?.getOption('pauseOnHover') ?? defaultOptions.pauseOnHover
    )
  }

  set pauseOnHover(pauseOnHover: boolean) {
    this.reset({ pauseOnHover })
  }

  get speed() {
    return (
      this.#slider?.getOption('speed') ??
      getNumericAttribute(this, 'speed', defaultOptions.speed)
    )
  }

  set speed(speed: number) {
    this.reset({ speed })
  }

  get startIndex() {
    return (
      this.#slider?.getOption('startIndex') ??
      getNumericAttribute(this, 'start-index', defaultOptions.startIndex)
    )
  }

  set startIndex(startIndex: number) {
    this.reset({ startIndex })
  }

  get swipe() {
    return (
      this.#slider?.getOption('swipe') ??
      getBooleanAttribute(this, 'swipe', defaultOptions.swipe)
    )
  }

  set swipe(swipe: boolean) {
    this.reset({ swipe })
  }

  get swipeTolerance() {
    return (
      this.#slider?.getOption('swipeTolerance') ??
      getNumericAttribute(
        this,
        'swipe-tolerance',
        defaultOptions.swipeTolerance,
      )
    )
  }

  set swipeTolerance(swipeTolerance: number) {
    this.reset({ swipeTolerance })
  }

  get timeout() {
    return (
      this.#slider?.getOption('timeout') ??
      getNumericAttribute(this, 'timeout', defaultOptions.timeout)
    )
  }

  set timeout(timeout: number) {
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
      const propName = camelize(name)

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
