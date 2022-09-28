import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'
import { CarouselSlider as BxCarouselSlider, type CarouselSliderOptions } from '@boxslider/slider'

export interface CarouselSliderProps extends BoxSliderComponentProps {
  effectOptions?: CarouselSliderOptions
}

export function CarouselSlider(props: CarouselSliderProps) {
  return (
    <BoxSlider
      {...props}
      sliderOptions={{
        ...props.sliderOptions,
        effect: new BxCarouselSlider(props.effectOptions),
      }}>
      {props.children}
    </BoxSlider>
  )
}

export default CarouselSlider
