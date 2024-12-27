import type { CarouselSliderElement } from '@boxslider/components/Carousel'
import {
  extractSliderAttributes,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Carousel'

export interface CarouselSliderProps
  extends BaseComponentProps<CarouselSliderElement> {
  timingFunction?: string
  cover?: boolean
}

export function CarouselSlider({
  sliderRef,
  timingFunction,
  ...props
}: CarouselSliderProps) {
  const { attributes, elementProps, eventHandlers } =
    extractSliderAttributes(props)
  const htmlAttributes = { ...attributes }

  if (timingFunction) {
    htmlAttributes['timing-function'] = timingFunction
  }

  return (
    <bs-carousel
      {...elementProps}
      {...htmlAttributes}
      ref={sliderRefCallback(eventHandlers, sliderRef)}
    />
  )
}

export default CarouselSlider
