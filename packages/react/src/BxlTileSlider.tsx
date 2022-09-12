import { Component } from 'react'
import { TileSlider, TileSliderOptions } from '@boxslider/slider'
import { BxlComponentProps, BxlSlider } from './BxlSlider'

export interface TileSliderProps extends BxlComponentProps {
  effectOptions: TileSliderOptions | undefined
}

export class BxlTileSlider extends Component<TileSliderProps, {}> {
  render() {
    return (
      <BxlSlider
        {...this.props}
        sliderOptions={{
          ...this.props.sliderOptions,
          effect: new TileSlider(this.props.effectOptions),
        }}>
        {this.props.children}
      </BxlSlider>
    )
  }
}
