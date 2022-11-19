import { CubeSlider as BxCubeSlider, type CubeSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface CubeSliderProps extends BoxSliderComponentProps {
  effectOptions?: CubeSliderOptions
}

export function CubeSlider({ effectOptions, sliderOptions, ...props }: CubeSliderProps) {
  return (
    <BoxSlider
      {...props}
      sliderOptions={{
        ...sliderOptions,
        effect: new BxCubeSlider(effectOptions),
      }}>
      {props.children}
    </BoxSlider>
  )
}

export default CubeSlider
