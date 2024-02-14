import {
  extractSliderAttributes,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Fade'

export interface FadeSliderProps extends BaseComponentProps<'bs-fade'> {
  timingFunction?: string
}

export function FadeSlider({
  children,
  className,
  sliderRef,
  timingFunction,
  ...props
}: FadeSliderProps) {
  const { attributes, eventHandlers } = extractSliderAttributes(props)
  const htmlAttributes = { ...attributes }

  if (timingFunction) {
    htmlAttributes['timing-function'] = timingFunction
  }

  return (
    <bs-fade
      {...htmlAttributes}
      ref={sliderRefCallback(eventHandlers, sliderRef)}
      class={className}>
      {children}
    </bs-fade>
  )
}

export default FadeSlider
