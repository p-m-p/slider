import type {
  BoxSliderOptions,
  Effect,
  ProgressiveTransitionState,
  TransitionSettings,
} from '../types'
import {
  applyCss,
  cancelAnimations,
  createProgressiveTransition,
} from '../utils'

export interface CarouselSliderOptions {
  cover?: boolean
  timingFunction?: string
}

export default class CarouselSlider implements Effect {
  readonly options: CarouselSliderOptions

  constructor(options?: CarouselSliderOptions) {
    this.options = {
      cover: options?.cover === true,
      timingFunction: options?.timingFunction || 'ease-in-out',
    }
  }

  initialize(
    el: HTMLElement,
    slides: HTMLElement[],
    options: BoxSliderOptions,
  ) {
    applyCss(el, {
      overflow: 'hidden',
    })

    if ('static inherit'.includes(getComputedStyle(el).position)) {
      applyCss(el, { position: 'relative' })
    }

    slides.forEach((slide, index) => {
      const active = index === options.startIndex

      applyCss(slide, {
        left: '0',
        position: 'absolute',
        top: '0',
        transform: `translateX(${active ? 0 : slide.offsetWidth}px)`,
        'z-index': active ? '3' : '1',
      })
    })
  }

  destroy(_: HTMLElement, slides: HTMLElement[]) {
    cancelAnimations(...slides)
  }

  prepareTransition({
    currentIndex,
    isPrevious,
    nextIndex,
    slides,
    speed,
  }: TransitionSettings): ProgressiveTransitionState {
    const currentSlide = slides[currentIndex]
    const currentSlideWidth = currentSlide.offsetWidth
    const nextSlide = slides[nextIndex]
    const nextSlideWidth = nextSlide.offsetWidth
    const isCover = this.options.cover
    const timingFunction = this.options.timingFunction

    cancelAnimations(currentSlide, nextSlide)

    const nextStartX = isPrevious ? -nextSlideWidth : nextSlideWidth
    const currentEndX = isPrevious ? currentSlideWidth : -currentSlideWidth

    applyCss(currentSlide, { transform: 'translateX(0px)', 'z-index': '2' })
    applyCss(nextSlide, {
      transform: `translateX(${nextStartX}px)`,
      'z-index': '3',
    })

    return createProgressiveTransition({
      elements: [currentSlide, nextSlide],
      speed,

      onProgress: (progress: number) => {
        const nextX = nextStartX * (1 - progress)
        applyCss(nextSlide, { transform: `translateX(${nextX}px)` })

        if (!isCover) {
          const currentX = currentEndX * progress
          applyCss(currentSlide, { transform: `translateX(${currentX}px)` })
        }
      },

      onComplete: async (fromProgress: number, remainingDuration: number) => {
        const nextX = nextStartX * (1 - fromProgress)

        const animateIn = nextSlide.animate(
          { transform: [`translateX(${nextX}px)`, 'translateX(0px)'] },
          {
            duration: remainingDuration,
            easing: timingFunction,
            fill: 'forwards',
          },
        )

        if (!isCover) {
          const currentX = currentEndX * fromProgress
          await currentSlide.animate(
            {
              transform: [
                `translateX(${currentX}px)`,
                `translateX(${currentEndX}px)`,
              ],
            },
            {
              duration: remainingDuration,
              easing: timingFunction,
              fill: 'forwards',
            },
          ).finished
        }

        await animateIn.finished
      },

      onCancel: async (fromProgress: number, remainingDuration: number) => {
        const nextX = nextStartX * (1 - fromProgress)

        const animateOut = nextSlide.animate(
          {
            transform: [
              `translateX(${nextX}px)`,
              `translateX(${nextStartX}px)`,
            ],
          },
          {
            duration: remainingDuration,
            easing: timingFunction,
            fill: 'forwards',
          },
        )

        if (!isCover) {
          const currentX = currentEndX * fromProgress
          await currentSlide.animate(
            { transform: [`translateX(${currentX}px)`, 'translateX(0px)'] },
            {
              duration: remainingDuration,
              easing: timingFunction,
              fill: 'forwards',
            },
          ).finished
        }

        await animateOut.finished
      },

      onFinish: () => {
        applyCss(nextSlide, { transform: 'translateX(0px)', 'z-index': '3' })
        applyCss(currentSlide, {
          transform: `translateX(${currentEndX}px)`,
          'z-index': '1',
        })
      },

      onReset: () => {
        applyCss(nextSlide, {
          transform: `translateX(${nextStartX}px)`,
          'z-index': '1',
        })
        applyCss(currentSlide, { transform: 'translateX(0px)', 'z-index': '3' })
      },
    })
  }
}
