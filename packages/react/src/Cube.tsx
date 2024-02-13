import {
  extractSliderAttributes,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Cube'

export interface CubeSliderProps extends BaseComponentProps<'bs-cube'> {
  direction?: 'horizontal' | 'vertical'
  perspective?: number
}

export function Cube({
  children,
  className,
  direction,
  perspective,
  sliderRef,
  ...props
}: CubeSliderProps) {
  const { attributes, extraProps } = extractSliderAttributes(props)
  const htmlAttributes = { ...attributes }

  if (direction !== undefined) {
    htmlAttributes.direction = direction
  }

  if (perspective !== undefined) {
    htmlAttributes.perspective = `${perspective}`
  }

  return (
    <bs-cube
      {...htmlAttributes}
      ref={sliderRefCallback(extraProps, sliderRef)}
      class={className}>
      {children}
    </bs-cube>
  )
}

export default Cube
