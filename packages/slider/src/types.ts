import type { StateStore } from './state-store'
import type { BoxSlider } from './box-slider'

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
   * Event triggered when slider is initialized
   *
   * @deprecated - This event will not fire. Listen for `reset` event instead.
   */
  init: () => void

  /**
   * Event triggered when slider auto scrolling is stopped
   */
  pause: (data: SliderEventData) => void

  /**
   * Event triggered when slider auto scrolling is started
   */
  play: (data: SliderEventData) => void

  /**
   * Event triggered when slider is reset
   */
  reset: () => void
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
   * Speed of slide transition in milliseconds
   */
  speed: number

  /**
   * Slide index to start from
   */
  startIndex: number

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

/**
 * State controller for progressive (drag-based) transitions
 */
export interface ProgressiveTransitionState {
  /**
   * Set the progress of the transition (0-1)
   */
  setProgress(progress: number): void

  /**
   * Complete the transition from the current progress
   */
  complete(fromProgress: number): Promise<void>

  /**
   * Cancel the transition and return to the start position
   */
  cancel(fromProgress: number): Promise<void>

  /**
   * Immediately abort and reset to initial state
   */
  abort(): void
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

  /**
   * Whether this effect supports progressive (drag-based) transitions
   */
  readonly supportsProgressiveTransition?: boolean

  /**
   * Prepare a progressive transition and return a state controller.
   * Returns null if progressive transition is not supported or not possible.
   */
  prepareTransition?(
    settings: TransitionSettings,
  ): ProgressiveTransitionState | null
}

/**
 * Controller for a progressive transition initiated by a plugin
 */
export interface ProgressiveTransitionController {
  /**
   * Set the progress of the transition (0-1)
   */
  setProgress(progress: number): void

  /**
   * Complete the transition, optionally animating from the current progress
   */
  complete(): Promise<void>

  /**
   * Cancel the transition and return to the start position
   */
  cancel(): Promise<void>

  /**
   * Immediately abort without animation
   */
  abort(): void

  /**
   * The index that will become active if the transition completes
   */
  readonly nextIndex: number

  /**
   * The current progress value
   */
  readonly progress: number
}

/**
 * Context provided to plugins for interacting with the slider
 */
export interface PluginContext {
  /**
   * The BoxSlider instance
   */
  readonly slider: BoxSlider

  /**
   * The slider container element
   */
  readonly el: HTMLElement

  /**
   * The slide elements
   */
  readonly slides: readonly HTMLElement[]

  /**
   * The current slider options
   */
  readonly options: Readonly<BoxSliderOptions>

  /**
   * Add an event listener to an element. Listeners added through this method
   * are automatically cleaned up when the plugin is destroyed.
   */
  addListener<K extends keyof HTMLElementEventMap>(
    target: EventTarget,
    type: K,
    listener: (ev: HTMLElementEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ): void

  /**
   * Add a listener for a slider event. Listeners added through this method
   * are automatically cleaned up when the plugin is destroyed.
   */
  on<T extends SliderEventType>(
    event: T,
    handler: SliderEventListenerMap[T],
  ): void

  /**
   * Request a progressive transition in the given direction.
   * Returns null if the effect doesn't support progressive transitions
   * or if a transition cannot be started (e.g., at boundary with loop disabled).
   */
  requestProgressiveTransition(
    direction: 'next' | 'prev',
  ): ProgressiveTransitionController | null
}

/**
 * Plugin interface for extending BoxSlider functionality
 */
export interface Plugin {
  /**
   * Unique name for this plugin
   */
  readonly name: string

  /**
   * Initialize the plugin. Called after the effect is initialized.
   */
  initialize(context: PluginContext): void

  /**
   * Destroy the plugin and clean up resources.
   * Event listeners added via context.addListener are automatically cleaned up.
   */
  destroy(): void

  /**
   * Called when the slider is reset. Plugins can use this to reinitialize
   * with new options or slides.
   */
  reset?(context: PluginContext): void
}
