import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { SliderControlsElement } from '@boxslider/components/SliderControls'

import '@boxslider/components/SliderControls'

type BaseProps = Omit<
  DetailedHTMLProps<
    HTMLAttributes<SliderControlsElement>,
    SliderControlsElement
  >,
  | 'index-btn-label'
  | 'index-label'
  | 'next-btn-label'
  | 'pause-btn-label'
  | 'play-btn-label'
  | 'prev-btn-label'
>

export interface SliderControlsProps extends BaseProps {
  indexBtnLabel?: string
  indexLabel?: string
  nextBtnLabel?: string
  pauseBtnLabel?: string
  playBtnLabel?: string
  prevBtnLabel?: string
}

export function SliderControls({
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

  return <bs-slider-controls {...htmlAttributes} {...props} />
}

export default SliderControls
