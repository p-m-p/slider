import type { BoxSliderOptions, Effect, TransitionSettings } from '../types'
import { applyCss } from '../utils'

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

    if ('static inherit'.indexOf(getComputedStyle(el).position) !== -1) {
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
}
