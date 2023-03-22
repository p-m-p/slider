import { useMemo } from 'react'
import { TileSlider as BxTileSlider, type TileSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface TileSliderProps extends BoxSliderComponentProps {
  effectOptions?: TileSliderOptions
}

export default function TileSlider({ effectOptions, sliderOptions, ...props }: TileSliderProps) {
  const options = useMemo(
    () => ({ ...sliderOptions, effect: new BxTileSlider(effectOptions) }),
    [effectOptions, sliderOptions],
  )

  return (
    <BoxSlider {...props} sliderOptions={options}>
      {props.children}
    </BoxSlider>
  )
}
