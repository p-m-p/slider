import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { SliderElement } from '@boxslider/components'

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
      'custom-slider': JSXSliderElement<SliderElement>
    }
  }
}

export * from './Carousel'
export * from './Cube'
export * from './CustomEffect'
export * from './Fade'
export * from './Tile'
