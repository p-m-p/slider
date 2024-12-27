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
  children,
  cover,
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

  if (cover !== undefined) {
    htmlAttributes.cover = `${cover}`
  }

  return (
    <bs-carousel
      {...elementProps}
      {...htmlAttributes}
      ref={sliderRefCallback(eventHandlers, sliderRef)}>
      {children}
    </bs-carousel>
  )
}

export default CarouselSlider
