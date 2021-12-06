import { Component } from 'react';
import { CarouselSlider, CarouselSliderOptions } from '@boxslider/slider';
import { BxlComponentProps, BxlSlider } from './BxlSlider';

export interface CarouselSliderProps extends BxlComponentProps {
  effectOptions: CarouselSliderOptions;
}

export class BxlCarouselSlider extends Component<CarouselSliderProps, {}> {
  render() {
    return <BxlSlider {...this.props} sliderOptions={{
      ...this.props.sliderOptions,
      effect: new CarouselSlider(this.props.effectOptions)
    }}>{ this.props.children }</BxlSlider>
  }
}
