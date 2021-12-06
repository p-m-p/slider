import { Component } from 'react';
import { FadeSlider, FadeSliderOptions } from '@boxslider/slider';
import { BxlComponentProps, BxlSlider } from './BxlSlider';

export interface FadeSliderProps extends BxlComponentProps {
  effectOptions: FadeSliderOptions | undefined;
}

export class BxlFadeSlider extends Component<FadeSliderProps, {}> {
  render() {
    return <BxlSlider {...this.props} sliderOptions={{
      ...this.props.sliderOptions,
      effect: new FadeSlider(this.props.effectOptions)
    }}>{ this.props.children }</BxlSlider>
  }
}
