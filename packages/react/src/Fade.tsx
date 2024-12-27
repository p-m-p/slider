import type { FadeSliderElement } from '@boxslider/components/Fade'
import {
  extractSliderAttributes,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Fade'

export interface FadeSliderProps extends BaseComponentProps<FadeSliderElement> {
  timingFunction?: string
}

export function FadeSlider({
  children,
  sliderRef,
  timingFunction,
  ...props
}: FadeSliderProps) {
  const { attributes, elementProps, eventHandlers } =
    extractSliderAttributes(props)
  const htmlAttributes = { ...attributes }

  if (timingFunction) {
    htmlAttributes['timing-function'] = timingFunction
  }

  return (
    <bs-fade
      {...elementProps}
      {...htmlAttributes}
      ref={sliderRefCallback(eventHandlers, sliderRef)}>
      {children}
    </bs-fade>
  )
}

export default FadeSlider
