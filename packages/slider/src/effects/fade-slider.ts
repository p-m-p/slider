import type { StateStore } from '../state-store'
import type { BoxSliderOptions, Effect, TransitionSettings } from '../types'
import { applyCss } from '../utils'

export interface FadeSliderOptions {
  timingFunction?: string
}

const SLIDE_STYLES = [
  'display',
  'height',
  'left',
  'opacity',
  'position',
  'top',
  'transition',
  'width',
  'z-index',
]
const BOX_STYLES = ['height', 'overflow', 'position']

export default class FadeSlider implements Effect {
  private readonly options: FadeSliderOptions

  constructor(options?: FadeSliderOptions) {
    this.options = {
      timingFunction: options?.timingFunction || 'ease-in',
    }
  }

  initialize(
    el: HTMLElement,
    slides: HTMLElement[],
    styleStore: StateStore,
    options: BoxSliderOptions,
  ): void {
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

      setTimeout(resolve, settings.speed)
    })
  }
}
