import { useMemo } from 'react'
import {
  CarouselSlider as BxCarouselSlider,
  type CarouselSliderOptions,
} from '@boxslider/slider'
import BoxSlider, { type BoxSliderProps } from './BoxSlider'

export interface CarouselSliderProps extends Omit<BoxSliderProps, 'effect'> {
  effectOptions?: CarouselSliderOptions
}

export function CarouselSlider({
  effectOptions,
  ...props
}: CarouselSliderProps) {
  const effect = useMemo(
    () => new BxCarouselSlider(effectOptions),
    [effectOptions],
  )

  return (
    <BoxSlider {...props} effect={effect}>
      {props.children}
    </BoxSlider>
  )
}

export default CarouselSlider
