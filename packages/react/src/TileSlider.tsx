import { useMemo } from 'react'
import {
  TileSlider as BxTileSlider,
  type TileSliderOptions,
} from '@boxslider/slider'
import BoxSlider, { type BoxSliderProps } from './BoxSlider'

export interface TileSliderProps extends Omit<BoxSliderProps, 'effect'> {
  effectOptions?: TileSliderOptions
}

export default function TileSlider({
  effectOptions,
  ...props
}: TileSliderProps) {
  const effect = useMemo(() => new BxTileSlider(effectOptions), [effectOptions])

  return (
    <BoxSlider {...props} effect={effect}>
      {props.children}
    </BoxSlider>
  )
}
