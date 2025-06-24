import type { StateStore } from '../state-store'
import type { BoxSliderOptions, Effect, TransitionSettings } from '../types'
import { applyCss } from '../utils'

export interface CubeSliderOptions {
  direction?: 'horizontal' | 'vertical'
  perspective?: number
}

export default class CubeSlider implements Effect {
  readonly options: CubeSliderOptions
  private translateZ!: number

  constructor(options?: Partial<CubeSliderOptions>) {
    this.options = {
      direction: options?.direction || 'horizontal',
      perspective: options?.perspective || 1000,
    }
  }

  initialize(
    el: HTMLElement,
    slides: HTMLElement[],
    options: BoxSliderOptions,
    stateStore: StateStore,
  ) {
    const width = el.offsetWidth
    const height = el.offsetHeight
    const perspective = `${this.options.perspective}px`
    const viewport = el.parentElement

    if (viewport == null) {
      throw new Error('Unable to locate viewport element for Cube slider')
    }

    this.translateZ =
      this.options.direction === 'vertical' ? height / 2 : width / 2

    stateStore.storeAttributes(viewport, ['style'])

    slides.forEach((slide: HTMLElement) =>
      applyCss(slide, {
        left: '0',
        position: 'absolute',
        top: '0',
      }),
    )

    applyCss(el, {
      left: '0',
      overflow: 'visible',
      position: 'absolute',
      top: '0',
    })

    if (
      !['absolute', 'fixed', 'relative'].includes(
        getComputedStyle(viewport).position,
      )
    ) {
      applyCss(viewport, { position: 'relative' })
    }

    applyCss(viewport, {
      overflow: 'visible',
      perspective: perspective,
    })

    applyCss(slides[options.startIndex ?? 0], {
      transform: `${this.rotation(0)} translate3d(0,0,${this.translateZ}px)`,
    })

    applyCss(el, {
      'transform-style': 'preserve-3d',
      transform: `translate3d(0,0,-${this.translateZ}px)`,
    })
  }

  async transition(settings: TransitionSettings) {
    const angle = settings.isPrevious ? 90 : -90

    applyCss(settings.slides[settings.nextIndex], {
      transform: `${this.rotation(-angle)} translate3d(0,0,${this.translateZ}px)`,
    })

    await settings.el.animate(
      {
        transform: `translate3d(0,0,-${this.translateZ}px) ${this.rotation(angle)}`,
      },
      {
        duration: settings.speed,
      },
    ).finished

    settings.slides.forEach((s, index) => {
      if (index !== settings.nextIndex) {
        applyCss(s, { transform: 'initial' })
      }
    })

    applyCss(settings.slides[settings.nextIndex], {
      transform: `${this.rotation(0)} translate3d(0,0,${this.translateZ}px)`,
    })

    applyCss(settings.el, {
      transform: `translate3d(0,0,-${this.translateZ}px)`,
    })
  }

  private rotation(angle: number): string {
    return `rotate3d(${
      this.options.direction === 'vertical' ? '1, 0, 0' : '0, 1, 0'
    }, ${angle}deg)`
  }
}
