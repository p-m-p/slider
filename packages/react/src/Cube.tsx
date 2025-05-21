import type { CubeSliderElement } from '@boxslider/components/Cube'
import {
  extractEventHandlers,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Cube'

export interface CubeSliderProps extends BaseComponentProps<CubeSliderElement> {
  direction?: 'horizontal' | 'vertical'
  perspective?: number
}

export function Cube({ sliderRef, ...props }: CubeSliderProps) {
  const { elementProps, eventHandlers } = extractEventHandlers(props)

  return (
    <bs-cube
      {...elementProps}
      ref={sliderRefCallback(eventHandlers, sliderRef)}
    />
  )
}

export default Cube
