import type { SliderEventData } from '@boxslider/slider'

declare global {
  interface ElementEventMap {
    after: CustomEvent<SliderEventData>
    before: CustomEvent<SliderEventData>
    destroy: CustomEvent<void>
    pause: CustomEvent<SliderEventData>
    play: CustomEvent<SliderEventData>
  }
}

export type { SliderElement } from './Slider'
export { default as Carousel, type CarouselSliderElement } from './Carousel'
export { default as Cube, type CubeSliderElement } from './Cube'
export { default as Fade, type FadeSliderElement } from './Fade'
export { default as Tile, type TileSliderElement } from './Tile'
export {
  default as SliderControls,
  type SliderControlsElement,
} from './SliderControls'
