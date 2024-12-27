import type { CubeSliderElement } from '@boxslider/components/Cube'
import {
  extractSliderAttributes,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Cube'

export interface CubeSliderProps extends BaseComponentProps<CubeSliderElement> {
  direction?: 'horizontal' | 'vertical'
  perspective?: number
}

export function Cube({ sliderRef, ...props }: CubeSliderProps) {
  const { attributes, elementProps, eventHandlers } =
    extractSliderAttributes(props)

  return (
    <bs-cube
      {...elementProps}
      {...attributes}
      ref={sliderRefCallback(eventHandlers, sliderRef)}
    />
  )
}

export default Cube
