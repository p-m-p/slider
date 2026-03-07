import type { StateStore } from '../state-store'
import type {
  BoxSliderOptions,
  Effect,
  ProgressiveTransitionState,
  TransitionSettings,
} from '../types'
import { applyCss } from '../utils'

export interface CubeSliderOptions {
  direction?: 'horizontal' | 'vertical'
  perspective?: number
}

export default class CubeSlider implements Effect {
  readonly options: CubeSliderOptions
  readonly supportsProgressiveTransition = true
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

  prepareTransition(settings: TransitionSettings): ProgressiveTransitionState {
    const targetAngle = settings.isPrevious ? 90 : -90
    const nextSlide = settings.slides[settings.nextIndex]
    const currentSlide = settings.slides[settings.currentIndex]

    // Cancel any existing animations to ensure clean state
    settings.el.getAnimations().forEach((a) => a.cancel())
    nextSlide.getAnimations().forEach((a) => a.cancel())
    currentSlide.getAnimations().forEach((a) => a.cancel())

    // Ensure el and current slide are at their default positions
    applyCss(settings.el, {
      transform: `translate3d(0,0,-${this.translateZ}px)`,
    })
    applyCss(currentSlide, {
      transform: `${this.rotation(0)} translate3d(0,0,${this.translateZ}px)`,
    })

    applyCss(nextSlide, {
      transform: `${this.rotation(-targetAngle)} translate3d(0,0,${this.translateZ}px)`,
    })

    return {
      setProgress: (progress: number) => {
        const angle = targetAngle * progress
        applyCss(settings.el, {
          transform: `translate3d(0,0,-${this.translateZ}px) ${this.rotation(angle)}`,
        })
      },

      complete: async (fromProgress: number) => {
        const currentAngle = targetAngle * fromProgress
        const remainingProgress = 1 - fromProgress
        const remainingDuration = settings.speed * remainingProgress

        await settings.el.animate(
          {
            transform: [
              `translate3d(0,0,-${this.translateZ}px) ${this.rotation(currentAngle)}`,
              `translate3d(0,0,-${this.translateZ}px) ${this.rotation(targetAngle)}`,
            ],
          },
          {
            duration: remainingDuration,
          },
        ).finished

        // Cancel any running animations
        settings.el.getAnimations().forEach((a) => a.cancel())

        settings.slides.forEach((s, index) => {
          if (index !== settings.nextIndex) {
            applyCss(s, { transform: 'initial' })
          }
        })

        applyCss(nextSlide, {
          transform: `${this.rotation(0)} translate3d(0,0,${this.translateZ}px)`,
        })

        applyCss(settings.el, {
          transform: `translate3d(0,0,-${this.translateZ}px)`,
        })
      },

      cancel: async (fromProgress: number) => {
        const currentAngle = targetAngle * fromProgress
        const remainingDuration = settings.speed * fromProgress

        await settings.el.animate(
          {
            transform: [
              `translate3d(0,0,-${this.translateZ}px) ${this.rotation(currentAngle)}`,
              `translate3d(0,0,-${this.translateZ}px) ${this.rotation(0)}`,
            ],
          },
          {
            duration: remainingDuration,
          },
        ).finished

        // Cancel any running animations
        settings.el.getAnimations().forEach((a) => a.cancel())

        applyCss(nextSlide, { transform: 'initial' })
        applyCss(currentSlide, {
          transform: `${this.rotation(0)} translate3d(0,0,${this.translateZ}px)`,
        })
        applyCss(settings.el, {
          transform: `translate3d(0,0,-${this.translateZ}px)`,
        })
      },

      abort: () => {
        settings.el.getAnimations().forEach((animation) => animation.cancel())

        applyCss(nextSlide, { transform: 'initial' })
        applyCss(currentSlide, {
          transform: `${this.rotation(0)} translate3d(0,0,${this.translateZ}px)`,
        })
        applyCss(settings.el, {
          transform: `translate3d(0,0,-${this.translateZ}px)`,
        })
      },
    }
  }
}
