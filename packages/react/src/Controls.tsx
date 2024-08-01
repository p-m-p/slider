import type { ComponentPropsWithoutRef } from 'react'

import '@boxslider/components/SliderControls'

export interface SliderControlsProps
  extends ComponentPropsWithoutRef<'bs-slider-controls'> {
  indexBtnLabel?: string
  indexLabel?: string
  nextBtnLabel?: string
  pauseBtnLabel?: string
  playBtnLabel?: string
  prevBtnLabel?: string
}

export function SliderControls({
  className,
  indexBtnLabel,
  indexLabel,
  nextBtnLabel,
  pauseBtnLabel,
  playBtnLabel,
  prevBtnLabel,
  ...props
}: SliderControlsProps) {
  const htmlAttributes: Record<string, string> = {}

  if (indexBtnLabel) htmlAttributes['index-btn-label'] = indexBtnLabel
  if (indexLabel) htmlAttributes['index-label'] = indexLabel
  if (nextBtnLabel) htmlAttributes['next-btn-label'] = nextBtnLabel
  if (pauseBtnLabel) htmlAttributes['pause-btn-label'] = pauseBtnLabel
  if (playBtnLabel) htmlAttributes['play-btn-label'] = playBtnLabel
  if (prevBtnLabel) htmlAttributes['prev-btn-label'] = prevBtnLabel

  return <bs-slider-controls class={className} {...htmlAttributes} {...props} />
}

export default SliderControls
