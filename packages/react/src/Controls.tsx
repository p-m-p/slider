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

export function SliderControls(props: SliderControlsProps) {
  return <bs-slider-controls {...props} />
}

export default SliderControls
