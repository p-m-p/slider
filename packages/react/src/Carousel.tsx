import type { CarouselSliderElement } from '@boxslider/components/Carousel'
import {
  extractEventHandlers,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Carousel'

export interface CarouselSliderProps
  extends BaseComponentProps<CarouselSliderElement> {
  timingFunction?: string
  cover?: boolean
}

export function CarouselSlider({ sliderRef, ...props }: CarouselSliderProps) {
  const { elementProps, eventHandlers } = extractEventHandlers(props)

  return (
    <bs-carousel
      {...elementProps}
      ref={sliderRefCallback(eventHandlers, sliderRef)}
    />
  )
}

export default CarouselSlider
