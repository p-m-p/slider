import BoxSlider from './BoxSlider'
import Carousel from './Carousel'
import Cube from './Cube'
import Fade from './Fade'
import Tile from './Tile'

export type { SliderElement } from './Slider'
export type { CarouselSliderElement } from './Carousel'
export type { CubeSliderElement } from './Cube'
export type { FadeSliderElement } from './Fade'
export type { TileSliderElement } from './Tile'

if (typeof customElements !== 'undefined') {
  customElements.define('bs-carousel', Carousel)
  customElements.define('bs-cube', Cube)
  customElements.define('bs-fade', Fade)
  customElements.define('bs-tile', Tile)
  customElements.define('bs-slider', BoxSlider)
}
