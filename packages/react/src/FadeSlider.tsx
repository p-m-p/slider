import { useMemo, useState } from 'react'
import { FadeSlider as BxFadeSlider, type FadeSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface FadeSliderProps extends BoxSliderComponentProps {
  effectOptions?: FadeSliderOptions
}

export function FadeSlider({ effectOptions, sliderOptions, ...props }: FadeSliderProps) {
  const [options, setOptions] = useState({})

  useMemo(
    () => setOptions({ ...sliderOptions, effect: new BxFadeSlider(effectOptions) }),
    [effectOptions, sliderOptions],
  )

  return (
    <BoxSlider {...props} sliderOptions={options}>
      {props.children}
    </BoxSlider>
  )
}

export default FadeSlider
