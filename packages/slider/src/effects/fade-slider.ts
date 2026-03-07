import type {
  BoxSliderOptions,
  Effect,
  ProgressiveTransitionState,
  TransitionSettings,
} from '../types'
import { applyCss } from '../utils'

export interface FadeSliderOptions {
  timingFunction?: string
}

export default class FadeSlider implements Effect {
  readonly options: FadeSliderOptions
  readonly supportsProgressiveTransition = true

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
    if ('static inherit'.includes(getComputedStyle(el).position)) {
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

  prepareTransition({
    currentIndex,
    nextIndex,
    slides,
    speed,
  }: TransitionSettings): ProgressiveTransitionState {
    const currentSlide = slides[currentIndex]
    const nextSlide = slides[nextIndex]

    // Cancel any existing animations
    currentSlide.getAnimations().forEach((a) => a.cancel())
    nextSlide.getAnimations().forEach((a) => a.cancel())

    // Set up initial state
    applyCss(currentSlide, { opacity: '1', 'z-index': '1' })
    applyCss(nextSlide, { opacity: '0', 'z-index': '2' })

    return {
      setProgress: (progress: number) => {
        applyCss(currentSlide, { opacity: String(1 - progress) })
        applyCss(nextSlide, { opacity: String(progress) })
      },

      complete: async (fromProgress: number) => {
        const remainingProgress = 1 - fromProgress
        const remainingDuration = speed * remainingProgress

        await Promise.all([
          currentSlide.animate(
            { opacity: [String(1 - fromProgress), '0'] },
            {
              duration: remainingDuration,
              easing: this.options.timingFunction,
              fill: 'forwards',
            },
          ).finished,
          nextSlide.animate(
            { opacity: [String(fromProgress), '1'] },
            {
              duration: remainingDuration,
              easing: this.options.timingFunction,
              fill: 'forwards',
            },
          ).finished,
        ])

        // Cancel animations and apply final styles
        currentSlide.getAnimations().forEach((a) => a.cancel())
        nextSlide.getAnimations().forEach((a) => a.cancel())

        applyCss(currentSlide, { opacity: '0', 'z-index': '1' })
        applyCss(nextSlide, { opacity: '1', 'z-index': '2' })
      },

      cancel: async (fromProgress: number) => {
        const remainingDuration = speed * fromProgress

        await Promise.all([
          currentSlide.animate(
            { opacity: [String(1 - fromProgress), '1'] },
            {
              duration: remainingDuration,
              easing: this.options.timingFunction,
              fill: 'forwards',
            },
          ).finished,
          nextSlide.animate(
            { opacity: [String(fromProgress), '0'] },
            {
              duration: remainingDuration,
              easing: this.options.timingFunction,
              fill: 'forwards',
            },
          ).finished,
        ])

        // Cancel animations and apply final styles
        currentSlide.getAnimations().forEach((a) => a.cancel())
        nextSlide.getAnimations().forEach((a) => a.cancel())

        applyCss(currentSlide, { opacity: '1', 'z-index': '2' })
        applyCss(nextSlide, { opacity: '0', 'z-index': '1' })
      },

      abort: () => {
        currentSlide.getAnimations().forEach((a) => a.cancel())
        nextSlide.getAnimations().forEach((a) => a.cancel())

        applyCss(currentSlide, { opacity: '1', 'z-index': '2' })
        applyCss(nextSlide, { opacity: '0', 'z-index': '1' })
      },
    }
  }
}
