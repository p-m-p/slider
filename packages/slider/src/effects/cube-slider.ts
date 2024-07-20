import type { StateStore } from '../state-store'
import type { BoxSliderOptions, Effect, TransitionSettings } from '../types'
import { applyCss } from '../utils'

export interface CubeSliderOptions {
  direction?: 'horizontal' | 'vertical'
  perspective?: number
}

export default class CubeSlider implements Effect {
  private readonly options: CubeSliderOptions
  private translateZ!: number
  private transitionTimer = 0

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
  ): void {
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

    // ensure parent is positioned to hold the box
    if (
      ['absolute', 'fixed', 'relative'].indexOf(
        getComputedStyle(viewport).position,
      ) === -1
    ) {
      applyCss(viewport, { position: 'relative' })
    }

    applyCss(viewport, {
      overflow: 'visible',
      perspective: perspective,
    })

    applyCss(slides[options.startIndex || 0], {
      transform: `${this.rotation(0)} translate3d(0, 0, ${this.translateZ}px)`,
    })

    applyCss(el, {
      'transform-style': 'preserve-3d',
      transform: `translate3d(0, 0, -${this.translateZ}px)`,
    })

    this.transitionTimer = window.setTimeout(
      () =>
        applyCss(el, {
          transition: `transform ${options.speed}ms`,
        }),
      50,
    )
  }

  transition(settings: TransitionSettings): Promise<void> {
    return new Promise((resolve) => {
      const angle = settings.isPrevious ? 90 : -90

      applyCss(settings.slides[settings.nextIndex], {
        transform: `${this.rotation(-angle)} translate3d(0, 0, ${
          this.translateZ
        }px)`,
        'z-index': '2',
      })

      applyCss(settings.el, {
        transition: `transform ${settings.speed}ms`,
        transform: `translate3d(0, 0, -${this.translateZ}px) ${this.rotation(
          angle,
        )}`,
      })

      this.transitionTimer = window.setTimeout(() => {
        settings.slides.forEach((s, index) => {
          if (index !== settings.nextIndex) {
            applyCss(s, { transform: 'initial' })
          }
        })

        applyCss(settings.el, {
          transition: 'initial',
          transform: `translate3d(0, 0, -${this.translateZ}px) ${this.rotation(
            0,
          )}`,
        })

        applyCss(settings.slides[settings.nextIndex], {
          transform: `${this.rotation(0)} translate3d(0, 0, ${
            this.translateZ
          }px)`,
          'z-index': '1',
        })

        resolve()
      }, settings.speed)
    })
  }

  destroy() {
    window.clearTimeout(this.transitionTimer)
  }

  private rotation(angle: number): string {
    return `rotate3d(${
      this.options.direction === 'vertical' ? '1, 0, 0' : '0, 1, 0'
    }, ${angle}deg)`
  }
}
