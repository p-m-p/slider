import { TileSlider as BxTileSlider, type TileSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface TileSliderProps extends BoxSliderComponentProps {
  effectOptions?: TileSliderOptions
}

export function TileSlider({ effectOptions, sliderOptions, ...props }: TileSliderProps) {
  return (
    <BoxSlider
      {...props}
      sliderOptions={{
        ...sliderOptions,
        effect: new BxTileSlider(effectOptions),
      }}>
      {props.children}
    </BoxSlider>
  )
}

export default TileSlider
