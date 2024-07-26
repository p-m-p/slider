import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type {
  CarouselSliderElement,
  CubeSliderElement,
  FadeSliderElement,
  SliderControlsElement,
  TileSliderElement,
} from '@boxslider/components'

interface JSXSliderElement<T> extends DetailedHTMLProps<HTMLAttributes<T>, T> {
  class?: string
  timeout?: string
  speed?: string
  swipe?: boolean
}

declare global {
  /* eslint-disable-next-line @typescript-eslint/no-namespace */
  namespace JSX {
    interface IntrinsicElements {
      'bs-carousel': JSXSliderElement<CarouselSliderElement>
      'bs-cube': JSXSliderElement<CubeSliderElement>
      'bs-fade': JSXSliderElement<FadeSliderElement>
      'bs-tile': JSXSliderElement<TileSliderElement>
      'bs-slider-controls': JSXSliderElement<SliderControlsElement>
    }
  }
}

export * from './Carousel'
export * from './Cube'
export * from './Fade'
export * from './Tile'
