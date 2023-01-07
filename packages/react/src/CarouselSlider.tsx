import { useMemo, useState } from 'react'
import { CarouselSlider as BxCarouselSlider, type CarouselSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface CarouselSliderProps extends BoxSliderComponentProps {
  effectOptions?: CarouselSliderOptions
}

export function CarouselSlider({ effectOptions, sliderOptions, ...props }: CarouselSliderProps) {
  const [options, setOptions] = useState({})

  useMemo(
    () => setOptions({ ...sliderOptions, effect: new BxCarouselSlider(effectOptions) }),
    [effectOptions, sliderOptions],
  )

  return (
    <BoxSlider {...props} sliderOptions={options}>
      {props.children}
    </BoxSlider>
  )
}

export default CarouselSlider
