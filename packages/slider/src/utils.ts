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

export interface ProgressiveTransitionConfig {
  elements: HTMLElement[]
  onProgress: (progress: number) => void
  onComplete: (fromProgress: number) => Promise<void>
  onCancel: (fromProgress: number) => Promise<void>
  onFinish: () => void
  onReset: () => void
}

export function createProgressiveTransition(
  config: ProgressiveTransitionConfig,
): ProgressiveTransitionState {
  const { elements, onProgress, onComplete, onCancel, onFinish, onReset } =
    config

  return {
    setProgress: onProgress,

    complete: async (fromProgress: number) => {
      await onComplete(fromProgress)
      cancelAnimations(...elements)
      onFinish()
    },

    cancel: async (fromProgress: number) => {
      await onCancel(fromProgress)
      cancelAnimations(...elements)
      onReset()
    },

    abort: () => {
      cancelAnimations(...elements)
      onReset()
    },
  }
}
