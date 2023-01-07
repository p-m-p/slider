import { useMemo, useState } from 'react'
import { CubeSlider as BxCubeSlider, type CubeSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface CubeSliderProps extends BoxSliderComponentProps {
  effectOptions?: CubeSliderOptions
}

export function CubeSlider({ effectOptions, sliderOptions, ...props }: CubeSliderProps) {
  const [options, setOptions] = useState({})

  useMemo(
    () => setOptions({ ...sliderOptions, effect: new BxCubeSlider(effectOptions) }),
    [effectOptions, sliderOptions],
  )

  return (
    <BoxSlider {...props} sliderOptions={options}>
      {props.children}
    </BoxSlider>
  )
}

export default CubeSlider
