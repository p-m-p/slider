import { FadeSlider as BxFadeSlider, type FadeSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface FadeSliderProps extends BoxSliderComponentProps {
  effectOptions?: FadeSliderOptions
}

export function FadeSlider({ effectOptions, sliderOptions, ...props }: FadeSliderProps) {
  return (
    <BoxSlider
      {...props}
      sliderOptions={{
        ...sliderOptions,
        effect: new BxFadeSlider(effectOptions),
      }}>
      {props.children}
    </BoxSlider>
  )
}

export default FadeSlider
