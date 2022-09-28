import { FadeSlider as BxFadeSlider, type FadeSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface FadeSliderProps extends BoxSliderComponentProps {
  effectOptions?: FadeSliderOptions
}

export function FadeSlider(props: FadeSliderProps) {
  return (
    <BoxSlider
      {...props}
      sliderOptions={{
        ...props.sliderOptions,
        effect: new BxFadeSlider(props.effectOptions),
      }}>
      {props.children}
    </BoxSlider>
  )
}

export default FadeSlider
