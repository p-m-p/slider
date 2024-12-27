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

export function Cube({
  children,
  direction,
  perspective,
  sliderRef,
  ...props
}: CubeSliderProps) {
  const { attributes, elementProps, eventHandlers } =
    extractSliderAttributes(props)
  const htmlAttributes = { ...attributes }

  if (direction !== undefined) {
    htmlAttributes.direction = direction
  }

  if (perspective !== undefined) {
    htmlAttributes.perspective = `${perspective}`
  }

  return (
    <bs-cube
      {...elementProps}
      {...htmlAttributes}
      ref={sliderRefCallback(eventHandlers, sliderRef)}>
      {children}
    </bs-cube>
  )
}

export default Cube
