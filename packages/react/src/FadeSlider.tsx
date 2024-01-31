import {
  extractSliderAttributes,
  type BaseComponentProps,
  sliderRefCallback,
} from './BoxSlider'

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
  const { attributes, extraProps } = extractSliderAttributes(props)
  const htmlAttributes = { ...attributes }

  if (timingFunction) {
    htmlAttributes['timing-function'] = timingFunction
  }

  return (
    <bs-fade
      {...htmlAttributes}
      ref={sliderRefCallback(extraProps, sliderRef)}
      class={className}>
      {children}
    </bs-fade>
  )
}

export default FadeSlider
