import type { BoxSliderOptions } from './types'
import FadeSlider, { type FadeSliderOptions } from './effects/fade-slider'
import CarouselSlider, {
  type CarouselSliderOptions,
} from './effects/carousel-slider'
import CubeSlider, { type CubeSliderOptions } from './effects/cube-slider'
import TileSlider, { type TileSliderOptions } from './effects/tile/tile-slider'
import BoxSlider from './box-slider'

export function getSliderElement(el: string | HTMLElement): HTMLElement {
  if (typeof el === 'string') {
    const queryEl = document.querySelector<HTMLElement>(el)

    if (queryEl === null) {
      throw new Error(`Slider element not found: ${el}`)
    }

    return queryEl
  }

  return el
}

export type CreateCarouselSliderOptions = Partial<BoxSliderOptions> &
  CarouselSliderOptions

export function createCarouselSlider(
  el: string | HTMLElement,
  options: CreateCarouselSliderOptions = {},
) {
  const { timingFunction, cover, ...boxSliderOptions } = options

  return new BoxSlider(
    getSliderElement(el),
    new CarouselSlider({ timingFunction, cover }),
    boxSliderOptions,
  )
}

export type CreateCubeSliderOptions = Partial<BoxSliderOptions> &
  CubeSliderOptions

export function createCubeSlider(
  el: string | HTMLElement,
  options: CreateCubeSliderOptions = {},
) {
  const { direction, perspective, ...boxSliderOptions } = options

  return new BoxSlider(
    getSliderElement(el),
    new CubeSlider({ direction, perspective }),
    boxSliderOptions,
  )
}

export type CreateFadeSliderOptions = Partial<BoxSliderOptions> &
  FadeSliderOptions

export function createFadeSlider(
  el: string | HTMLElement,
  options: CreateFadeSliderOptions = {},
) {
  const { timingFunction, ...boxSliderOptions } = options

  return new BoxSlider(
    getSliderElement(el),
    new FadeSlider({ timingFunction }),
    boxSliderOptions,
  )
}

export type CreateTileSliderOptions = Partial<BoxSliderOptions> &
  Partial<TileSliderOptions>

export function createTileSlider(
  el: string | HTMLElement,
  options: CreateTileSliderOptions = {},
) {
  const { rowOffset, rows, tileEffect, ...boxSliderOptions } = options

  return new BoxSlider(
    getSliderElement(el),
    new TileSlider({ rowOffset, rows, tileEffect }),
    boxSliderOptions,
  )
}

export { BoxSlider, defaultOptions } from './box-slider'
export * from './types'
export * from './effects'
