import { Component } from 'react'
import { CubeSlider, CubeSliderOptions } from '@boxslider/slider'

import { BxlComponentProps, BxlSlider } from './BxlSlider'

export interface CubeSliderProps extends BxlComponentProps {
  effectOptions: CubeSliderOptions | undefined
}

export class BxlCubeSlider extends Component<CubeSliderProps, {}> {
  render() {
    return (
      <BxlSlider
        {...this.props}
        sliderOptions={{
          ...this.props.sliderOptions,
          effect: new CubeSlider(this.props.effectOptions),
        }}>
        {this.props.children}
      </BxlSlider>
    )
  }
}
