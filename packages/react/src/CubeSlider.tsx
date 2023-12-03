import { useMemo } from 'react'
import {
  CubeSlider as BxCubeSlider,
  type CubeSliderOptions,
} from '@boxslider/slider'
import BoxSlider, { type BoxSliderProps } from './BoxSlider'

export interface CubeSliderProps extends Omit<BoxSliderProps, 'effect'> {
  effectOptions?: CubeSliderOptions
}

export function CubeSlider({ effectOptions, ...props }: CubeSliderProps) {
  const effect = useMemo(() => new BxCubeSlider(effectOptions), [effectOptions])

  return (
    <BoxSlider {...props} effect={effect}>
      {props.children}
    </BoxSlider>
  )
}

export default CubeSlider
