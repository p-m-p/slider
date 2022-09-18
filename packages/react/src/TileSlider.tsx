import { TileSlider as BxTileSlider, type TileSliderOptions } from '@boxslider/slider'
import BoxSlider, { type BoxSliderComponentProps } from './BoxSlider'

export interface TileSliderProps extends BoxSliderComponentProps {
  effectOptions?: TileSliderOptions
}

export function TileSlider(props: TileSliderProps) {
  return (
    <BoxSlider
      {...props}
      sliderOptions={{
        ...props.sliderOptions,
        effect: new BxTileSlider(props.effectOptions),
      }}>
      {props.children}
    </BoxSlider>
  )
}

export default TileSlider
