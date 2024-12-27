import type { TileSliderElement } from '@boxslider/components/Tile'
import type { TileEffect } from '@boxslider/slider'
import {
  extractSliderAttributes,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Tile'

export interface TileSliderProps extends BaseComponentProps<TileSliderElement> {
  tileEffect?: TileEffect
  rows?: number
  rowOffset?: number
}

export function TileSlider({
  children,
  sliderRef,
  rows,
  rowOffset,
  tileEffect,
  ...props
}: TileSliderProps) {
  const { attributes, elementProps, eventHandlers } =
    extractSliderAttributes(props)
  const htmlAttributes = { ...attributes }

  if (rows !== undefined) {
    htmlAttributes.rows = `${rows}`
  }

  if (rowOffset !== undefined) {
    htmlAttributes['row-offset'] = `${rowOffset}`
  }

  if (tileEffect !== undefined) {
    htmlAttributes['tile-effect'] = tileEffect
  }

  return (
    <bs-tile
      {...elementProps}
      {...htmlAttributes}
      ref={sliderRefCallback(eventHandlers, sliderRef)}>
      {children}
    </bs-tile>
  )
}

export default TileSlider
