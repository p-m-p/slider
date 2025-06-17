import type { SliderEventData } from '@boxslider/slider'
import type { CarouselSliderElement } from './Carousel'
import type { CubeSliderElement } from './Cube'
import type { FadeSliderElement } from './Fade'
import type { TileSliderElement } from './Tile'
import type { SliderControlsElement } from './SliderControls'

declare global {
  interface ElementEventMap {
    after: CustomEvent<SliderEventData>
    before: CustomEvent<SliderEventData>
    destroy: CustomEvent<void>
    pause: Event | CustomEvent<SliderEventData>
    play: Event | CustomEvent<SliderEventData>
  }

  interface HTMLElementTagNameMap {
    'bs-carousel': CarouselSliderElement
    'bs-cube': CubeSliderElement
    'bs-fade': FadeSliderElement
    'bs-tile': TileSliderElement
    'bs-slider-controls': SliderControlsElement
  }
}

export {
  default as Slider,
  SLIDER_ATTRIBUTES,
  type SliderElement,
} from './Slider'
export { default as Carousel, type CarouselSliderElement } from './Carousel'
export { default as Cube, type CubeSliderElement } from './Cube'
export { default as Fade, type FadeSliderElement } from './Fade'
export { default as Tile, type TileSliderElement } from './Tile'
export {
  default as SliderControls,
  type SliderControlsElement,
} from './SliderControls'
