import { TileSlider as BxTileSlider, type TileSliderOptions } from '@boxslider/slider'
import { useMemo, useState } from 'react'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface TileSliderProps extends BoxSliderComponentProps {
  effectOptions?: TileSliderOptions
}

export function TileSlider({ effectOptions, sliderOptions, ...props }: TileSliderProps) {
  const [options, setOptions] = useState({})

  useMemo(
    () => setOptions({ ...sliderOptions, effect: new BxTileSlider(effectOptions) }),
    [effectOptions, sliderOptions],
  )

  return (
    <BoxSlider {...props} sliderOptions={options}>
      {props.children}
    </BoxSlider>
  )
}

export default TileSlider
