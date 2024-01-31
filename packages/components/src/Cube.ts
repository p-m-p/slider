import { CubeSlider } from '@boxslider/slider'
import Slider, {
  SLIDER_ATTRIBUTES,
  type SliderElement,
  getNumericAttribute,
  camelize,
} from './Slider'

export interface CubeSliderElement extends SliderElement {
  direction: 'horizontal' | 'vertical'
  perspective: number
}

export const CUBE_ATTRIBUTES = ['direction', 'perspective']

export default class Cube extends Slider implements CubeSliderElement {
  static observedAttributes = [...SLIDER_ATTRIBUTES, ...CUBE_ATTRIBUTES]

  get direction() {
    const propDirection = this.getAttribute('direction')?.trim()

    if (propDirection === 'horizontal' || propDirection === 'vertical') {
      return propDirection
    }

    return 'horizontal'
  }

  get perspective() {
    return getNumericAttribute(this, 'perspective', 1000)
  }

  attributeChangedCallback(name: string) {
    if (CUBE_ATTRIBUTES.includes(name)) {
      const propName = camelize(name) as keyof CubeSliderElement

      this.reset(
        { [propName]: this[propName] },
        new CubeSlider({
          direction: this.direction,
          perspective: this.perspective,
        }),
      )
    } else {
      super.attributeChangedCallback(name)
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

if (typeof customElements !== 'undefined') {
  customElements.define('bs-cube', Cube)
}
