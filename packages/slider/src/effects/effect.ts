import type { BoxSliderOptions } from '../box-slider-options'
import type { StateStore } from '../state-store'

export interface TransitionSettings {
  el: HTMLElement
  slides: HTMLElement[]
  currentIndex: number
  nextIndex: number
  isPrevious: boolean
  speed: number
}

export interface Effect {
  destroy?: (el: HTMLElement) => void
  initialize(
    el: HTMLElement,
    slides: HTMLElement[],
    stateStore: StateStore,
    options?: BoxSliderOptions,
  ): void
  transition(settings: TransitionSettings): Promise<void>
}
