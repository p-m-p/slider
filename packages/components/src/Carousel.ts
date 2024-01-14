import { CarouselSlider } from '@boxslider/slider'
import Slider, {
  SLIDER_ATTRIBUTES,
  getBbooleanAttribute,
  type SliderElement,
} from './Slider'

export interface CarouselSliderElement extends SliderElement {
  cover: boolean
  timingFunction: string
}

export const CAROUSEL_ATTRIBUTES = ['cover', 'timing-function']

export default class Carousel extends Slider implements CarouselSliderElement {
  static observedAttributes = [...SLIDER_ATTRIBUTES, ...CAROUSEL_ATTRIBUTES]

  get cover() {
    return getBbooleanAttribute(this, 'cover', false)
  }

  get timingFunction() {
    return this.getAttribute('timing-function') || 'ease-out'
  }

  connectedCallback() {
    this.init(
      new CarouselSlider({
        cover: this.cover,
        timingFunction: this.timingFunction,
      }),
    )
  }

  attributeChangedCallback(name: string) {
    if (CAROUSEL_ATTRIBUTES.includes(name)) {
      this.reset(
        new CarouselSlider({
          cover: this.cover,
          timingFunction: this.timingFunction,
        }),
      )
    } else {
      super.attributeChangedCallback(name)
    }
  }
}

if (typeof customElements !== 'undefined') {
  customElements.define('bs-carousel', Carousel)
}
