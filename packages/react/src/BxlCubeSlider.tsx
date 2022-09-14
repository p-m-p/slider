import { CubeSlider, CubeSliderOptions } from '@boxslider/slider'
import { type BxlComponentProps, BxlSlider } from './BxlSlider'

export interface CubeSliderProps extends BxlComponentProps {
  effectOptions?: CubeSliderOptions
}

export function BxlCubeSlider(props: CubeSliderProps) {
    return (
      <BxlSlider
        {...props}
        sliderOptions={{
          ...props.sliderOptions,
          effect: new CubeSlider(props.effectOptions),
        }}>
        {props.children}
      </BxlSlider>
    )
}
