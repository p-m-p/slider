import BxTileSlider, { type TileSliderOptions } from '@boxslider/slider/dist/effects/tile/tile-slider'
import BoxSlider, { type BxlComponentProps } from './BoxSlider'

export interface TileSliderProps extends BxlComponentProps {
  effectOptions: TileSliderOptions | undefined
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
