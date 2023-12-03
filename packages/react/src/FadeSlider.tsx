import { useMemo } from 'react'
import {
  FadeSlider as BxFadeSlider,
  type FadeSliderOptions,
} from '@boxslider/slider'
import BoxSlider, { type BoxSliderProps } from './BoxSlider'

export interface FadeSliderProps extends Omit<BoxSliderProps, 'effect'> {
  effectOptions?: FadeSliderOptions
}

export function FadeSlider({ effectOptions, ...props }: FadeSliderProps) {
  const effect = useMemo(() => new BxFadeSlider(effectOptions), [effectOptions])

  return (
    <BoxSlider {...props} effect={effect}>
      {props.children}
    </BoxSlider>
  )
}

export default FadeSlider
