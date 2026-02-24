import type {
  BoxSliderOptions,
  Effect,
  ProgressiveTransitionState,
  TransitionSettings,
} from '../types'
import { applyCss } from '../utils'

export interface CarouselSliderOptions {
  cover?: boolean
  timingFunction?: string
}

export default class CarouselSlider implements Effect {
  readonly options: CarouselSliderOptions
  readonly supportsProgressiveTransition = true

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

  async transition({
    currentIndex,
    isPrevious,
    nextIndex,
    slides,
    speed,
  }: TransitionSettings) {
    const currentSlide = slides[currentIndex]
    const currentSlideWidth = currentSlide.offsetWidth
    const nextSlide = slides[nextIndex]
    const nextSlideWidth = nextSlide.offsetWidth

    applyCss(nextSlide, {
      'z-index': '3',
    })

    applyCss(currentSlide, {
      'z-index': '2',
    })

    const animateIn = nextSlide.animate(
      {
        transform: [
          `translateX(${isPrevious ? '-' + nextSlideWidth : nextSlideWidth}px)`,
          'translateX(0px)',
        ],
      },
      {
        duration: speed,
        easing: this.options.timingFunction,
        fill: 'forwards',
      },
    )

    if (!this.options.cover) {
      await currentSlide.animate(
        {
          transform: [
            'translateX(0px)',
            `translateX(${isPrevious ? currentSlideWidth : '-' + currentSlideWidth}px)`,
          ],
        },
        {
          duration: speed,
          easing: this.options.timingFunction,
          fill: 'forwards',
        },
      ).finished
    }

    await animateIn.finished

    applyCss(currentSlide, {
      'z-index': '1',
    })
  }

  destroy(_: HTMLElement, slides: HTMLElement[]) {
    slides.forEach((slide) => {
      slide.getAnimations().forEach((animation) => animation.cancel())
    })
  }

  prepareTransition({
    currentIndex,
    isPrevious,
    nextIndex,
    slides,
    speed,
  }: TransitionSettings): ProgressiveTransitionState | null {
    const currentSlide = slides[currentIndex]
    const currentSlideWidth = currentSlide.offsetWidth
    const nextSlide = slides[nextIndex]
    const nextSlideWidth = nextSlide.offsetWidth
    const isCover = this.options.cover

    applyCss(nextSlide, { 'z-index': '3' })
    applyCss(currentSlide, { 'z-index': '2' })

    const nextStartX = isPrevious ? -nextSlideWidth : nextSlideWidth
    const currentEndX = isPrevious ? currentSlideWidth : -currentSlideWidth

    applyCss(nextSlide, {
      transform: `translateX(${nextStartX}px)`,
    })

    return {
      setProgress: (progress: number) => {
        const nextX = nextStartX * (1 - progress)
        applyCss(nextSlide, {
          transform: `translateX(${nextX}px)`,
        })

        if (!isCover) {
          const currentX = currentEndX * progress
          applyCss(currentSlide, {
            transform: `translateX(${currentX}px)`,
          })
        }
      },

      complete: async (fromProgress: number) => {
        const remainingProgress = 1 - fromProgress
        const remainingDuration = speed * remainingProgress

        const nextX = nextStartX * (1 - fromProgress)

        const animateIn = nextSlide.animate(
          {
            transform: [`translateX(${nextX}px)`, 'translateX(0px)'],
          },
          {
            duration: remainingDuration,
            easing: this.options.timingFunction,
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
              easing: this.options.timingFunction,
              fill: 'forwards',
            },
          ).finished
        }

        await animateIn.finished

        applyCss(currentSlide, { 'z-index': '1' })
      },

      cancel: async (fromProgress: number) => {
        const remainingDuration = speed * fromProgress

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
            easing: this.options.timingFunction,
            fill: 'forwards',
          },
        )

        if (!isCover) {
          const currentX = currentEndX * fromProgress
          await currentSlide.animate(
            {
              transform: [`translateX(${currentX}px)`, 'translateX(0px)'],
            },
            {
              duration: remainingDuration,
              easing: this.options.timingFunction,
              fill: 'forwards',
            },
          ).finished
        }

        await animateOut.finished

        applyCss(nextSlide, { 'z-index': '1' })
        applyCss(currentSlide, { 'z-index': '3' })
      },

      abort: () => {
        nextSlide.getAnimations().forEach((animation) => animation.cancel())
        currentSlide.getAnimations().forEach((animation) => animation.cancel())

        applyCss(nextSlide, {
          transform: `translateX(${nextStartX}px)`,
          'z-index': '1',
        })
        applyCss(currentSlide, {
          transform: 'translateX(0px)',
          'z-index': '3',
        })
      },
    }
  }
}
