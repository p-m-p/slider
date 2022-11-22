import { type BoxSliderOptions } from '../box-slider-options'
import { type Effect, type TransitionSettings } from './effect'
import { applyCss } from '../utils'
import { StateStore } from '../state-store'

export interface CarouselSliderOptions {
  cover?: boolean
  timingFunction?: string
}

const SLIDE_STYLES = ['height', 'left', 'position', 'top', 'tranform', 'transition', 'width', 'visibility', 'z-index']
const BOX_STYLES = ['overflow', 'position']

export class CarouselSlider implements Effect {
  private readonly options: CarouselSliderOptions
  private slideWidth!: string
  private slideHeight!: string

  constructor(options?: CarouselSliderOptions) {
    this.options = {
      cover: options?.cover === true,
      timingFunction: options?.timingFunction || 'ease-in-out',
    }
  }

  initialize(el: HTMLElement, slides: HTMLElement[], stateStore: StateStore, options: BoxSliderOptions): void {
    this.slideWidth = `${el.offsetWidth}px`
    this.slideHeight = `${el.offsetHeight}px`

    stateStore.storeStyles(slides, SLIDE_STYLES)
    stateStore.storeStyles(el, BOX_STYLES)

    applyCss(el, { overflow: 'hidden' })

    if ('static inherit'.indexOf(getComputedStyle(el).position) !== -1) {
      applyCss(el, { position: 'relative' })
    }

    slides.forEach((slide, index) => {
      applyCss(slide, {
        height: this.slideHeight,
        left: '0',
        position: 'absolute',
        top: '0',
        transform: `translateX(${this.slideWidth})`,
        transition: 'initial',
        visibility: 'hidden',
        width: this.slideWidth,
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

  transition(settings: TransitionSettings): Promise<void> {
    const currentSlide = settings.slides[settings.currentIndex]
    const nextSlide = settings.slides[settings.nextIndex]

    return new Promise((resolve) => {
      applyCss(nextSlide, {
        transform: `translateX(${settings.isPrevious ? `-${this.slideWidth}` : this.slideWidth})`,
      })

      setTimeout(() => {
        applyCss(nextSlide, {
          transform: 'translateX(0px)',
          transition: `transform ${settings.speed}ms ${this.options.timingFunction}`,
          visibility: 'visible',
          'z-index': '2',
        })

        applyCss(currentSlide, {
          transform: this.options.cover
            ? 'translateX(0px)'
            : `translateX(${settings.isPrevious ? this.slideWidth : `-${this.slideWidth}`})`,
          transition: this.options.cover ? 'initial' : `transform ${settings.speed}ms ${this.options.timingFunction}`,
          visibility: 'visible',
          'z-index': '1',
        })

        window.setTimeout(() => {
          applyCss(currentSlide, {
            transform: `translateX(${this.slideWidth})`,
            transition: 'initial',
            visibility: 'hidden',
          })

          resolve()
        }, settings.speed)
      }, 0)
    })
  }
}

export default CarouselSlider
