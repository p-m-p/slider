import type { TileSliderElement } from '@boxslider/components/Tile'
import type { TileEffect } from '@boxslider/slider'
import {
  extractEventHandlers,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Tile'

export interface TileSliderProps extends BaseComponentProps<TileSliderElement> {
  tileEffect?: TileEffect
  rows?: number
  rowOffset?: number
}

export function TileSlider({ sliderRef, ...props }: TileSliderProps) {
  const { elementProps, eventHandlers } = extractEventHandlers(props)

  return (
    <bs-tile
      {...elementProps}
      ref={sliderRefCallback(eventHandlers, sliderRef)}
    />
  )
}

export default TileSlider
