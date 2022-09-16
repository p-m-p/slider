import { FadeSlider as BxFadeSlider, type FadeSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BxlComponentProps } from './BoxSlider'

export interface FadeSliderProps extends BxlComponentProps {
  effectOptions: FadeSliderOptions | undefined
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
