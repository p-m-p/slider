import type { StateStore } from './state-store'

export type SliderEventData = {
  /**
   * The currently active slide index
   */
  currentIndex: number

  /**
   * The index of the slide to be active next
   */
  nextIndex?: number

  /**
   * The transition speed of the slide animation
   */
  speed: number
}

export interface SliderEventListenerMap {
  /**
   * Event triggered after slide transition completes
   */
  after: (data: SliderEventData) => void

  /**
   * Event triggered before slide transition begins
   */
  before: (data: SliderEventData) => void

  /**
   * Event triggered when slider is destroyed
   */
  destroy: () => void

  /**
   * Event triggered when slider auto scrolling is stopped
   */
  pause: (data: SliderEventData) => void

  /**
   * Event triggered when slider auto scrolling is started
   */
  play: (data: SliderEventData) => void
}

export type SliderEventType = keyof SliderEventListenerMap

export type EventListenerMap = {
  [Property in SliderEventType]?: SliderEventListenerMap[Property][]
}

export interface BoxSliderOptions {
  /**
   * Automatically scroll through the slides
   */
  autoScroll: boolean

  /**
   * Pause auto scrolling on mouse over
   */
  pauseOnHover: boolean

  /**
   * Speed of slide transition in milliseconds
   */
  speed: number

  /**
   * Slide index to start from
   */
  startIndex: number

  /**
   * Enable swiping to show next or previous slide
   */
  swipe: boolean

  /**
   * Minimum distance in pixels for a swipe transition
   */
  swipeTolerance: number

  /**
   * Number of milliseconds between each slide transition
   * when auto scrolling slides
   */
  timeout: number
}

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
