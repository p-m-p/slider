import {
  extractSliderAttributes,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Carousel'

export interface CarouselSliderProps extends BaseComponentProps<'bs-carousel'> {
  timingFunction?: string
  cover?: boolean
}

export function CarouselSlider({
  children,
  className,
  cover,
  sliderRef,
  timingFunction,
  ...props
}: CarouselSliderProps) {
  const { attributes, extraProps } = extractSliderAttributes(props)
  const htmlAttributes = { ...attributes }

  if (timingFunction) {
    htmlAttributes['timing-function'] = timingFunction
  }

  if (cover !== undefined) {
    htmlAttributes.cover = `${cover}`
  }

  return (
    <bs-carousel
      {...htmlAttributes}
      ref={sliderRefCallback(extraProps, sliderRef)}
      class={className}>
      {children}
    </bs-carousel>
  )
}

export default CarouselSlider
