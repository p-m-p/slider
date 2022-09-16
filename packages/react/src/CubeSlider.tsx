import { CubeSlider as BxCubeSlider, type CubeSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BxlComponentProps } from './BoxSlider'

export interface CubeSliderProps extends BxlComponentProps {
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
