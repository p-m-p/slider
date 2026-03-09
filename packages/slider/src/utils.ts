import type { ProgressiveTransitionState } from './types'

export function applyCss(
  el: HTMLElement,
  styles: { [style: string]: string },
): void {
  Object.keys(styles).forEach((key) => el.style.setProperty(key, styles[key]))
}

export function cancelAnimations(...elements: HTMLElement[]): void {
  elements.forEach((el) => el.getAnimations().forEach((a) => a.cancel()))
}

export function needsPositioning(el: HTMLElement): boolean {
  const pos = getComputedStyle(el).position
  return pos === 'static' || pos === 'inherit'
}

export function cloneSlideToFace(
  slide: HTMLElement,
  face: HTMLElement,
  nested = false,
): void {
  const clone = slide.cloneNode(true) as HTMLElement
  clone.style.removeProperty('visibility')
  const target = nested ? face.firstElementChild! : face
  target.replaceChildren(clone)
}

export function animOpts(
  duration: number,
  easing?: string,
  delay?: number,
): KeyframeAnimationOptions {
  return { delay, duration, easing, fill: 'forwards' }
}

const noop = () => {}
const asyncNoop = async () => {}

export interface ProgressiveTransitionConfig {
  elements: HTMLElement[]
  speed: number
  onProgress?: (progress: number) => void
  onComplete?: (
    fromProgress: number,
    remainingDuration: number,
  ) => Promise<void>
  onCancel?: (fromProgress: number, remainingDuration: number) => Promise<void>
  onFinish?: () => void
  onReset?: () => void
}

export function createProgressiveTransition(
  config: ProgressiveTransitionConfig,
): ProgressiveTransitionState {
  const {
    elements,
    speed,
    onProgress = noop,
    onComplete = asyncNoop,
    onCancel = asyncNoop,
    onFinish = noop,
    onReset = noop,
  } = config

  return {
    setProgress: onProgress,

    complete: async (fromProgress: number) => {
      const remainingDuration = speed * (1 - fromProgress)
      await onComplete(fromProgress, remainingDuration)
      onFinish()
      cancelAnimations(...elements)
    },

    cancel: async (fromProgress: number) => {
      const remainingDuration = speed * fromProgress
      await onCancel(fromProgress, remainingDuration)
      onReset()
      cancelAnimations(...elements)
    },

    abort: () => {
      onReset()
      cancelAnimations(...elements)
    },
  }
}
