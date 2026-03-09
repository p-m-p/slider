import type {
  BoxSliderOptions,
  Effect,
  ProgressiveTransitionState,
  TransitionSettings,
} from '../types'
import {
  animOpts,
  applyCss,
  cancelAnimations,
  createProgressiveTransition,
  needsPositioning,
} from '../utils'

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
    if (needsPositioning(el)) {
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

  destroy(_: HTMLElement, slides: HTMLElement[]) {
    cancelAnimations(...slides)
  }

  prepareTransition({
    currentIndex,
    nextIndex,
    slides,
    speed,
  }: TransitionSettings): ProgressiveTransitionState {
    const currentSlide = slides[currentIndex]
    const nextSlide = slides[nextIndex]
    const timingFunction = this.options.timingFunction

    cancelAnimations(currentSlide, nextSlide)

    applyCss(currentSlide, { opacity: '1', 'z-index': '1' })
    applyCss(nextSlide, { opacity: '0', 'z-index': '2' })

    return createProgressiveTransition({
      elements: [currentSlide, nextSlide],
      speed,

      onProgress: (progress: number) => {
        applyCss(currentSlide, { opacity: String(1 - progress) })
        applyCss(nextSlide, { opacity: String(progress) })
      },

      onComplete: async (fromProgress: number, remainingDuration: number) => {
        const opts = animOpts(remainingDuration, timingFunction)
        await Promise.all([
          currentSlide.animate(
            { opacity: [String(1 - fromProgress), '0'] },
            opts,
          ).finished,
          nextSlide.animate({ opacity: [String(fromProgress), '1'] }, opts)
            .finished,
        ])
      },

      onCancel: async (fromProgress: number, remainingDuration: number) => {
        const opts = animOpts(remainingDuration, timingFunction)
        await Promise.all([
          currentSlide.animate(
            { opacity: [String(1 - fromProgress), '1'] },
            opts,
          ).finished,
          nextSlide.animate({ opacity: [String(fromProgress), '0'] }, opts)
            .finished,
        ])
      },

      onFinish: () => {
        applyCss(currentSlide, { opacity: '0', 'z-index': '1' })
        applyCss(nextSlide, { opacity: '1', 'z-index': '2' })
      },

      onReset: () => {
        applyCss(currentSlide, { opacity: '1', 'z-index': '2' })
        applyCss(nextSlide, { opacity: '0', 'z-index': '1' })
      },
    })
  }
}
