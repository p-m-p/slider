import FadeSlider from '@boxslider/slider/effects/Fade'
import { register } from './core'
import Slider, { SLIDER_ATTRIBUTES, SliderElement } from './Slider'

export interface FadeSliderElement extends SliderElement {
  timingFunction: string
}

export default class Fade extends Slider implements FadeSliderElement {
  static observedAttributes = [...SLIDER_ATTRIBUTES, 'timing-function']

  #timingFunction?: string

  get timingFunction() {
    return this.#timingFunction ?? 'ease-in-out'
  }

  set timingFunction(timingFunction: string) {
    this.#timingFunction = timingFunction
    this.reset(
      {},
      new FadeSlider({
        timingFunction,
      }),
    )
  }

  attributeChangedCallback(name: string, _: string, value: string) {
    if (name === 'timing-function') {
      this.timingFunction = value
    } else {
      super.attributeChangedCallback(name, _, value)
    }
  }

  connectedCallback() {
    this.init(
      new FadeSlider({
        timingFunction: this.timingFunction,
      }),
    )
  }
}

register('bs-fade', Fade)
