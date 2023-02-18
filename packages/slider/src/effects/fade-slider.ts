import type { BoxSliderOptions } from '../box-slider-options'
import type { Effect, TransitionSettings } from './effect'
import { applyCss } from '../utils'
import { StateStore } from '../state-store'

export interface FadeSliderOptions {
  timingFunction?: string
}

const SLIDE_STYLES = ['height', 'left', 'opacity', 'position', 'top', 'transition', 'width', 'z-index']
const BOX_STYLES = ['height', 'overflow', 'position']

export class FadeSlider implements Effect {
  private readonly options: FadeSliderOptions

  constructor(options?: FadeSliderOptions) {
    this.options = {
      timingFunction: options?.timingFunction || 'ease-in',
    }
  }

  initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StateStore, options: BoxSliderOptions): void {
    styleStore.storeStyles(slides, SLIDE_STYLES)
    styleStore.storeStyles(el, BOX_STYLES)

    if ('static inherit'.indexOf(getComputedStyle(el).position) !== -1) {
      applyCss(el, { position: 'relative' })
    }

    applyCss(el, {
      height: `${slides[options.startIndex || 0].offsetHeight}px`,
      overflow: 'hidden',
    })

    slides.forEach((slide: HTMLElement, index: number) => {
      applyCss(slide, {
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '100%',
      })

      if (index !== options.startIndex) {
        applyCss(slide, { opacity: '0' })
      }
    })
  }

  transition(settings: TransitionSettings): Promise<void> {
    return new Promise((resolve) => {
      const currentSlide = settings.slides[settings.currentIndex]
      const nextSlide = settings.slides[settings.nextIndex]

      applyCss(currentSlide, {
        'z-index': '1',
      })
      applyCss(nextSlide, {
        opacity: '1',
        transition: `opacity ${settings.speed}ms ${this.options.timingFunction}`,
        'z-index': '2',
      })

      setTimeout(() => {
        applyCss(currentSlide, {
          transition: 'none',
          opacity: '0',
        })

        resolve()
      }, settings.speed)
    })
  }
}

export default FadeSlider
