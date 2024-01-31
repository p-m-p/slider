import { TileEffect, TileSlider } from '@boxslider/slider'
import Slider, {
  SLIDER_ATTRIBUTES,
  SliderElement,
  camelize,
  getNumericAttribute,
} from './Slider'

export interface TileSliderElement extends SliderElement {
  rows: number
  rowOffset: number
  tileEffect: TileEffect
}

export const TILE_ATTRIBUTES = ['rows', 'row-offset', 'tile-effect']

export default class Tile extends Slider implements TileSliderElement {
  static observedAttributes = [...SLIDER_ATTRIBUTES, ...TILE_ATTRIBUTES]

  get rows() {
    return getNumericAttribute(this, 'rows', 8)
  }

  get rowOffset() {
    return getNumericAttribute(this, 'row-offset', 50)
  }

  get tileEffect() {
    return (this.getAttribute('tile-effect') || 'fade') as TileEffect
  }

  attributeChangedCallback(name: string) {
    if (TILE_ATTRIBUTES.includes(name)) {
      const propName = camelize(name) as keyof TileSliderElement

      this.reset(
        { [propName]: this[propName] },
        new TileSlider({
          rows: this.rows,
          rowOffset: this.rowOffset,
          tileEffect: this.tileEffect,
        }),
      )
    } else {
      super.attributeChangedCallback(name)
    }
  }

  connectedCallback() {
    this.init(
      new TileSlider({
        rows: this.rows,
        rowOffset: this.rowOffset,
        tileEffect: this.tileEffect,
      }),
    )
  }
}

if (typeof customElements !== 'undefined') {
  customElements.define('bs-tile', Tile)
}
