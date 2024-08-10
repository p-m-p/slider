import type { BoxSliderOptions, Effect, TransitionSettings } from '../types'
import { applyCss } from '../utils'

export interface FadeSliderOptions {
  timingFunction?: string
}

export default class FadeSlider implements Effect {
  readonly options: FadeSliderOptions
  private transitionTimer = 0

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
      applyCss(slide, {
        height: '100%',
        left: '0',
        opacity: '2',
        position: 'absolute',
        top: '0',
        transition: `opacity ${options.speed}ms ${this.options.timingFunction}`,
        width: '100%',
        'z-index': '2',
      })

      if (index !== options.startIndex) {
        applyCss(slide, { opacity: '0', 'z-index': '1' })
      }
    })
  }

  transition(settings: TransitionSettings): Promise<void> {
    return new Promise((resolve) => {
      const currentSlide = settings.slides[settings.currentIndex]
      const nextSlide = settings.slides[settings.nextIndex]

      applyCss(currentSlide, { 'z-index': '1', opacity: '0' })
      applyCss(nextSlide, { 'z-index': '2', opacity: '1' })

      this.transitionTimer = window.setTimeout(resolve, settings.speed)
    })
  }

  destroy() {
    window.clearTimeout(this.transitionTimer)
  }
}
