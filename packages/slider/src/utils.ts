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
