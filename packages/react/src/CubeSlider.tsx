import { CubeSlider as BxCubeSlider, type CubeSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface CubeSliderProps extends BoxSliderComponentProps {
  effectOptions?: CubeSliderOptions
}

export function CubeSlider(props: CubeSliderProps) {
    return (
      <BoxSlider
        {...props}
        sliderOptions={{
          ...props.sliderOptions,
          effect: new BxCubeSlider(props.effectOptions),
        }}>
        {props.children}
      </BoxSlider>
    )
}

export default CubeSlider
