import CarouselSlider from '@boxslider/slider/effects/Carousel'
import { register } from './core'
import Slider, { SLIDER_ATTRIBUTES, type SliderElement } from './Slider'

export interface CarouselSliderElement extends SliderElement {
  cover: boolean
  timingFunction: string
}

export default class Carousel extends Slider implements CarouselSliderElement {
  static observedAttributes = [...SLIDER_ATTRIBUTES, 'cover', 'timing-function']

  #timingFunction: string | null = null
  #cover = false

  get cover() {
    return this.#cover
  }

  set cover(cover: boolean) {
    this.#cover = cover
    this.reset(
      {},
      new CarouselSlider({
        cover,
        timingFunction: this.timingFunction,
      }),
    )
  }

  get timingFunction() {
    return this.#timingFunction ?? 'ease-out'
  }

  set timingFunction(timingFunction: string) {
    this.#timingFunction = timingFunction
    this.reset(
      {},
      new CarouselSlider({
        cover: this.cover,
        timingFunction,
      }),
    )
  }

  connectedCallback() {
    this.init(
      new CarouselSlider({
        cover: this.cover,
        timingFunction: this.timingFunction,
      }),
    )
  }

  attributeChangedCallback(name: string, _: string, value: string) {
    if (name === 'timing-function') {
      this.timingFunction = value
    } else if (name === 'cover') {
      this.cover = value !== 'false'
    } else {
      super.attributeChangedCallback(name, _, value)
    }
  }
}

register('bs-carousel', Carousel)
