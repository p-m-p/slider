import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'
import { CarouselSlider as BxCarouselSlider, type CarouselSliderOptions } from '@boxslider/slider'

export interface CarouselSliderProps extends BoxSliderComponentProps {
  effectOptions?: CarouselSliderOptions
}

export function CarouselSlider({ effectOptions, sliderOptions, ...props }: CarouselSliderProps) {
  return (
    <BoxSlider
      {...props}
      sliderOptions={{
        ...sliderOptions,
        effect: new BxCarouselSlider(effectOptions),
      }}>
      {props.children}
    </BoxSlider>
  )
}

export default CarouselSlider
