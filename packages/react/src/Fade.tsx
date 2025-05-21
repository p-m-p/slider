import type { FadeSliderElement } from '@boxslider/components/Fade'
import {
  extractEventHandlers,
  type BaseComponentProps,
  sliderRefCallback,
} from './core'

import '@boxslider/components/Fade'

export interface FadeSliderProps extends BaseComponentProps<FadeSliderElement> {
  timingFunction?: string
}

export function FadeSlider({ sliderRef, ...props }: FadeSliderProps) {
  const { elementProps, eventHandlers } = extractEventHandlers(props)

  return (
    <bs-fade
      {...elementProps}
      ref={sliderRefCallback(eventHandlers, sliderRef)}
    />
  )
}

export default FadeSlider
