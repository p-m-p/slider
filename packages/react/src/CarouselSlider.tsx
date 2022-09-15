import BxCarouselSlider, { type CarouselSliderOptions } from '@boxslider/slider/dist/effects/carousel-slider'
import BoxSlider, { type BxlComponentProps } from './BoxSlider'

export interface CarouselSliderProps extends BxlComponentProps {
  effectOptions: CarouselSliderOptions
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
