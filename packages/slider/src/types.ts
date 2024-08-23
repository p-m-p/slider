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
   * Rotate from first to last slides when next and prev methods are called
   */
  loop: boolean

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
  /**
   * The slider element
   */
  el: HTMLElement

  /**
   * The slide elements
   */
  slides: HTMLElement[]

  /**
   * The currently active slide index
   */
  currentIndex: number

  /**
   * The next slide index to be shown
   */
  nextIndex: number

  /**
   * `true` if the next slide index should be shown in a backward direction
   */
  isPrevious: boolean

  /**
   * The transition speed for the slide animation
   */
  speed: number
}

export interface Effect {
  /**
   * Destroy the effect to remove any timers, event listeners, etc.
   */
  destroy?: (el: HTMLElement, slides: HTMLElement[]) => void

  /**
   * Set the initial state of the effect
   */
  initialize(
    /**
     * The slider element
     */
    el: HTMLElement,

    /**
     * The slide elements
     */
    slides: HTMLElement[],

    /**
     * The box slider options
     */
    options: BoxSliderOptions,

    /**
     * State store to persist any attributes that need to be restored
     * when the slider is destroyed.
     */
    stateStore: StateStore,
  ): void

  /**
   * Transition to the next slide
   */
  transition(settings: TransitionSettings): void | Promise<void>
}
