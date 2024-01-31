import { FadeSlider } from '@boxslider/slider'
import Slider, { SLIDER_ATTRIBUTES, SliderElement, camelize } from './Slider'

export interface FadeSliderElement extends SliderElement {
  timingFunction: string
}

export const FADE_ATTRIBUTES = ['timing-function']

export default class Fade extends Slider implements FadeSliderElement {
  static observedAttributes = [...SLIDER_ATTRIBUTES, ...FADE_ATTRIBUTES]

  get timingFunction() {
    return this.getAttribute('timing-function')?.trim() || 'ease-in-out'
  }

  attributeChangedCallback(name: string) {
    if (FADE_ATTRIBUTES.includes(name)) {
      const propName = camelize(name) as keyof FadeSliderElement

      this.reset(
        { [propName]: this[propName] },
        new FadeSlider({
          timingFunction: this.timingFunction,
        }),
      )
    } else {
      super.attributeChangedCallback(name)
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

if (typeof customElements !== 'undefined') {
  customElements.define('bs-fade', Fade)
}
