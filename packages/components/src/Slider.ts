import { BoxSlider, defaultOptions } from '@boxslider/slider'
import type {
  BoxSliderOptions,
  Effect,
  SliderEventData,
  SliderEventType,
} from '@boxslider/slider'

declare global {
  interface ElementEventMap {
    after: CustomEvent<SliderEventData>
    before: CustomEvent<SliderEventData>
    destroy: CustomEvent<void>
    pause: CustomEvent<SliderEventData>
    play: CustomEvent<SliderEventData>
  }
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

export function getBbooleanAttribute(
  el: HTMLElement,
  attribute: string,
  defaultValue: boolean,
) {
  if (el.hasAttribute(attribute)) {
    return el.getAttribute(attribute) !== 'false'
  }

  return defaultValue
}

const BOOLEAN_ATTRIBUTES = ['auto-scroll', 'pause-on-hover']
const NUMBER_ATTRIBUTES = [
  'speed',
  'timeout',
  'start-index',
  'swipe',
  'swipe-tolerance',
]
export const SLIDER_ATTRIBUTES = [...BOOLEAN_ATTRIBUTES, ...NUMBER_ATTRIBUTES]

export interface SliderElement extends HTMLElement {
  readonly slider?: BoxSlider
  autoScroll: boolean
  pauseOnHover: boolean
  speed: number
  swipe: boolean
  swipeTolerance: number
  timeout: number
}

export default abstract class Slider
  extends HTMLElement
  implements SliderElement
{
  #slider?: BoxSlider

  get slider() {
    return this.#slider
  }

  get autoScroll() {
    return getBbooleanAttribute(this, 'auto-scroll', defaultOptions.autoScroll)
  }

  get pauseOnHover() {
    return getBbooleanAttribute(
      this,
      'pause-on-hover',
      defaultOptions.pauseOnHover,
    )
  }

  get speed() {
    return getNumericAttribute(this, 'speed', defaultOptions.speed)
  }

  get startIndex() {
    return getNumericAttribute(this, 'start-index', defaultOptions.startIndex)
  }

  get swipe() {
    return getBbooleanAttribute(this, 'swipe', defaultOptions.swipe)
  }

  get swipeTolerance() {
    return getNumericAttribute(
      this,
      'swipe-tolerance',
      defaultOptions.swipeTolerance,
    )
  }

  get timeout() {
    return getNumericAttribute(this, 'timeout', defaultOptions.timeout)
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

  protected reset(effect?: Effect) {
    this.slider?.reset(this.options, effect)
  }

  attributeChangedCallback(name: string) {
    if (SLIDER_ATTRIBUTES.includes(name)) {
      this.reset()
    }
  }

  disconnectedCallback() {
    this.slider?.destroy()
    this.#slider = undefined
  }
}
