import TileSlider, { type TileEffect } from '@boxslider/slider/effects/Tile'
import { register } from './core'
import Slider, { SLIDER_ATTRIBUTES, SliderElement } from './Slider'

export interface TileSliderElement extends SliderElement {
  rows: number
  rowOffset: number
  tileEffect: TileEffect
}

export default class Tile extends Slider implements TileSliderElement {
  static observedAttributes = [
    ...SLIDER_ATTRIBUTES,
    'rows',
    'row-offset',
    'tile-effect',
  ]

  #rows = 8
  #rowOffset = 50
  #tileEffect: TileEffect = 'flip'

  get rows() {
    return this.#rows
  }

  set rows(rows: number) {
    this.#rows = rows
    this.reset(
      {},
      new TileSlider({
        rowOffset: this.rowOffset,
        rows,
        tileEffect: this.tileEffect,
      }),
    )
  }

  get rowOffset() {
    return this.#rowOffset
  }

  set rowOffset(rowOffset: number) {
    this.#rowOffset = rowOffset
    this.reset(
      {},
      new TileSlider({
        rowOffset,
        rows: this.rows,
        tileEffect: this.tileEffect,
      }),
    )
  }

  get tileEffect() {
    return this.#tileEffect
  }

  set tileEffect(tileEffect: TileEffect) {
    this.#tileEffect = tileEffect
    this.reset(
      {},
      new TileSlider({
        rowOffset: this.rowOffset,
        rows: this.rows,
        tileEffect,
      }),
    )
  }

  attributeChangedCallback(name: string, _: string, value: string) {
    if (name === 'rows') {
      this.rows = parseInt(value, 10)
    } else if (name === 'row-offset') {
      this.rowOffset = parseInt(value, 10)
    } else if (name === 'tile-effect') {
      this.tileEffect = value as TileEffect
    } else {
      super.attributeChangedCallback(name, _, value)
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

register('bs-tile', Tile)
