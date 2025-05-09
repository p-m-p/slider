import type { BoxSliderOptions } from './types'
import {
  default as FadeSlider,
  type FadeSliderOptions,
} from './effects/fade-slider'
import { default as BoxSlider, defaultOptions } from './box-slider'

export type CreateFadeSliderOptions = Partial<BoxSliderOptions> &
  FadeSliderOptions

export function createFadeSlider(
  el: string | HTMLElement,
  options: CreateFadeSliderOptions,
) {
  const { timingFunction, ...boxSliderOptions } = options
  let sliderEl: HTMLElement

  if (typeof el === 'string') {
    const queryEl = document.querySelector<HTMLElement>(el)

    if (queryEl === null) {
      throw new Error(`Slider element not found: ${el}`)
    }

    sliderEl = queryEl
  } else {
    sliderEl = el
  }

  return new BoxSlider(
    sliderEl,
    new FadeSlider({ timingFunction }),
    boxSliderOptions,
  )
}

export { BoxSlider, defaultOptions }
export * from './types'
export * from './effects'
