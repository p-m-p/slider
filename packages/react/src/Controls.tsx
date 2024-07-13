import type { ComponentPropsWithoutRef } from 'react'

import '@boxslider/components/SliderControls'

export interface SliderControlsProps
  extends ComponentPropsWithoutRef<'bs-slider-controls'> {
  nextBtnLabel?: string
  prevBtnLabel?: string
  playBtnLabel?: string
  pauseBtnLabel?: string
  indexBtnLabel?: string
}

export function SliderControls({
  className,
  nextBtnLabel,
  prevBtnLabel,
  playBtnLabel,
  pauseBtnLabel,
  indexBtnLabel,
  ...props
}: SliderControlsProps) {
  const htmlAttributes: Record<string, string> = {}

  if (nextBtnLabel) htmlAttributes['next-btn-label'] = nextBtnLabel
  if (prevBtnLabel) htmlAttributes['prev-btn-label'] = prevBtnLabel
  if (playBtnLabel) htmlAttributes['play-btn-label'] = playBtnLabel
  if (pauseBtnLabel) htmlAttributes['pause-btn-label'] = pauseBtnLabel
  if (indexBtnLabel) htmlAttributes['index-btn-label'] = indexBtnLabel

  return <bs-slider-controls class={className} {...htmlAttributes} {...props} />
}

export default SliderControls
