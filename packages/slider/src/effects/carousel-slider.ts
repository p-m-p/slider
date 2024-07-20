import type { BoxSliderOptions, Effect, TransitionSettings } from '../types'
import { applyCss } from '../utils'

export interface CarouselSliderOptions {
  cover?: boolean
  timingFunction?: string
}

export default class CarouselSlider implements Effect {
  private readonly options: CarouselSliderOptions
  private transitionTimer = 0
  private asyncTimer = 0

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
  ): void {
    applyCss(el, {
      overflow: 'hidden',
    })

    if ('static inherit'.indexOf(getComputedStyle(el).position) !== -1) {
      applyCss(el, { position: 'relative' })
    }

    slides.forEach((slide, index) => {
      applyCss(slide, {
        left: '0',
        position: 'absolute',
        top: '0',
        transform: `translateX(${slide.offsetWidth}px)`,
        transition: 'initial',
        visibility: 'hidden',
        'z-index': '1',
      })

      if (index === options.startIndex) {
        applyCss(slide, {
          transform: 'translateX(0px)',
          visibility: 'visible',
          'z-index': '2',
        })
      }
    })
  }

  destroy() {
    window.clearTimeout(this.transitionTimer)
    window.clearTimeout(this.asyncTimer)
  }

  transition(settings: TransitionSettings): Promise<void> {
    return new Promise((resolve) => {
      const currentSlide = settings.slides[settings.currentIndex]
      const currentSlideWidth = `${currentSlide.offsetWidth}px`
      const nextSlide = settings.slides[settings.nextIndex]
      const nextSlideWidth = `${nextSlide.offsetWidth}px`

      applyCss(nextSlide, {
        transform: `translateX(${
          settings.isPrevious ? '-' + nextSlideWidth : nextSlideWidth
        })`,
      })

      this.asyncTimer = window.setTimeout(() => {
        applyCss(nextSlide, {
          transform: 'translateX(0px)',
          transition: `transform ${settings.speed}ms ${this.options.timingFunction}`,
          visibility: 'visible',
          'z-index': '2',
        })

        applyCss(currentSlide, {
          transform: this.options.cover
            ? 'translateX(0px)'
            : `translateX(${
                settings.isPrevious
                  ? currentSlideWidth
                  : '-' + currentSlideWidth
              })`,
          transition: this.options.cover
            ? 'initial'
            : `transform ${settings.speed}ms ${this.options.timingFunction}`,
          visibility: 'visible',
          'z-index': '1',
        })

        this.transitionTimer = window.setTimeout(() => {
          applyCss(currentSlide, {
            transform: `translateX(${currentSlideWidth})`,
            transition: 'initial',
            visibility: 'hidden',
          })

          resolve()
        }, settings.speed)
      }, 0)
    })
  }
}
