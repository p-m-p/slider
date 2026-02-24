import CubeSlider from '@boxslider/slider/effects/Cube'
import type { TouchGesturePluginOptions } from '@boxslider/slider/plugins'
import { register } from './core'
import Slider, { SLIDER_ATTRIBUTES, type SliderElement } from './Slider'

export type Direction = 'horizontal' | 'vertical'

export interface CubeSliderElement extends SliderElement {
  direction: 'horizontal' | 'vertical'
  perspective: number
}

export default class Cube extends Slider implements CubeSliderElement {
  static observedAttributes = [...SLIDER_ATTRIBUTES, 'direction', 'perspective']

  #direction: Direction = 'horizontal'
  #perspective = 1000

  get direction() {
    return this.#direction
  }

  set direction(direction: Direction) {
    this.#direction = direction
    this.reset(
      {},
      new CubeSlider({
        direction,
        perspective: this.perspective,
      }),
    )
  }

  get perspective() {
    return this.#perspective
  }

  set perspective(perspective: number) {
    this.#perspective = perspective
    this.reset(
      {},
      new CubeSlider({
        direction: this.direction,
        perspective,
      }),
    )
  }

  protected override getTouchGestureOptions(): TouchGesturePluginOptions {
    return { direction: this.#direction }
  }

  attributeChangedCallback(name: string, _: string, value: string) {
    if (name === 'perspective') {
      this.perspective = Number.parseInt(value, 10)
    } else if (name === 'direction') {
      this.direction = value as Direction
    } else {
      super.attributeChangedCallback(name, _, value)
    }
  }

  connectedCallback() {
    this.init(
      new CubeSlider({
        direction: this.direction,
        perspective: this.perspective,
      }),
    )
  }
}

register('bs-cube', Cube)
