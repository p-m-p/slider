import type { BoxSliderOptions, Effect, TransitionSettings } from '../types'
import { applyCss } from '../utils'

export interface FadeSliderOptions {
  timingFunction?: string
}

export default class FadeSlider implements Effect {
  readonly options: FadeSliderOptions

  constructor(options?: FadeSliderOptions) {
    this.options = {
      timingFunction: options?.timingFunction || 'ease-in',
    }
  }

  initialize(
    el: HTMLElement,
    slides: HTMLElement[],
    options: BoxSliderOptions,
  ): void {
    if ('static inherit'.indexOf(getComputedStyle(el).position) !== -1) {
      applyCss(el, { position: 'relative' })
    }

    slides.forEach((slide: HTMLElement, index: number) => {
      const active = index === options.startIndex

      applyCss(slide, {
        height: '100%',
        left: '0',
        opacity: active ? '1' : '0',
        position: 'absolute',
        top: '0',
        width: '100%',
        'z-index': active ? '2' : '1',
      })
    })
  }

  async transition({
    currentIndex,
    nextIndex,
    slides,
    speed,
  }: TransitionSettings) {
    const currentSlide = slides[currentIndex]
    const nextSlide = slides[nextIndex]

    applyCss(currentSlide, { 'z-index': '1' })
    applyCss(nextSlide, { 'z-index': '2' })

    await Promise.all([
      currentSlide.animate(
        { opacity: [1, 0] },
        {
          duration: speed,
          easing: this.options.timingFunction,
          fill: 'forwards',
        },
      ).finished,
      nextSlide.animate(
        { opacity: [0, 1] },
        {
          duration: speed,
          easing: this.options.timingFunction,
          fill: 'forwards',
        },
      ).finished,
    ])
  }

  destroy(_: HTMLElement, slides: HTMLElement[]) {
    slides.forEach((slide) => {
      slide.getAnimations().forEach((animation) => animation.cancel())
    })
  }
}
