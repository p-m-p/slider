import { StateStore } from './state-store'
import { responder } from './responder'
import { type TransitionQueue, createQueue } from './transition-queue'
import type {
  BoxSliderOptions,
  Effect,
  EventListenerMap,
  Plugin,
  PluginContext,
  ProgressiveTransitionController,
  SliderEventData,
  SliderEventListenerMap,
  SliderEventType,
} from './types'

function safeMatchMedia(query: string): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia(query).matches
}

export const defaultOptions: BoxSliderOptions = Object.freeze({
  autoScroll: !safeMatchMedia('(prefers-reduced-motion: reduce)'),
  loop: true,
  speed: 800,
  startIndex: 0,
  timeout: 5000,
})

interface PluginEntry {
  plugin: Plugin
  listeners: Array<{
    target: EventTarget
    type: string
    listener: EventListener
    options?: AddEventListenerOptions
  }>
  sliderListeners: Array<{
    event: SliderEventType
    handler: SliderEventListenerMap[SliderEventType]
  }>
}

export class BoxSlider {
  private _activeIndex: number
  private _el?: HTMLElement
  private _effect?: Effect
  private _stateStore?: StateStore

  private options: BoxSliderOptions
  private slides: HTMLElement[]
  private autoScrollTimer?: ReturnType<typeof setTimeout>
  private eventListeners: EventListenerMap
  private isDestroyed: boolean
  private transitionQueue: TransitionQueue
  private plugins: PluginEntry[]
  private progressiveTransitionInProgress: boolean

  /**
   * The currently active slide index
   */
  get activeIndex() {
    return this._activeIndex
  }

  /**
   * The slider element
   */
  get el() {
    if (this._el === undefined) {
      throw new Error('Slider element is undefined')
    }

    return this._el
  }

  /**
   * The number of slides in the slider
   */
  get length() {
    return this.slides.length
  }

  /**
   * Return the value of a option at key
   */
  getOption<T extends keyof BoxSliderOptions>(key: T): BoxSliderOptions[T] {
    return this.options[key]
  }

  private get stateStore() {
    if (this._stateStore === undefined) {
      throw new Error(
        'State store is undefined, are you trying to interact with a destroyed slider?',
      )
    }

    return this._stateStore
  }

  private get effect() {
    if (this._effect === undefined) {
      throw new Error(
        'Slide effect is undefined, are you trying to interact with a destroyed slider?',
      )
    }

    return this._effect
  }

  constructor(
    el: HTMLElement,
    effect: Effect,
    options?: Partial<BoxSliderOptions>,
    plugins?: Plugin[],
  ) {
    this._el = el
    this._stateStore = new StateStore()

    this.transitionQueue = createQueue()
    this.slides = []
    this.eventListeners = {}
    this.isDestroyed = false
    this.plugins = []
    this.progressiveTransitionInProgress = false

    this.options = {
      ...defaultOptions,
      ...options,
    }
    this._activeIndex = this.options.startIndex
    this.init(effect)
    this.initializePlugins(plugins || [])

    responder.add(this)
  }

  /**
   * Reset the slider with optional new settings and effect
   */
  reset(options?: Partial<BoxSliderOptions>, effect?: Effect) {
    this.stopAutoScroll()

    if (typeof this.effect.destroy === 'function') {
      this.effect.destroy(this.el, this.slides)
    }

    this.stateStore.revert()
    this.options = {
      ...this.options,
      ...options,
    }

    if (
      options?.startIndex !== undefined &&
      !Number.isNaN(options.startIndex)
    ) {
      this._activeIndex = options.startIndex
    }

    this.init(effect || this.effect)
    this.resetPlugins()
    this.emit('reset')
  }

  /**
   * Show the next slide. If the slider is at the last slide and loop is disabled
   * then the slider will not advance back to the first slide.
   */
  next() {
    const isLastSlide = this.activeIndex === this.slides.length - 1

    if (isLastSlide && !this.options.loop) {
      return Promise.resolve()
    }

    return this.skipTo(isLastSlide ? 0 : this.activeIndex + 1, false)
  }

  /**
   * Show the previous slide. If the slider is at the first slide and loop is disabled
   * then the slider will not advance back to the last slide.
   */
  prev(): Promise<void> {
    const isFirstSlide = this.activeIndex === 0

    if (isFirstSlide && !this.options.loop) {
      return Promise.resolve()
    }

    return this.skipTo(
      isFirstSlide ? this.slides.length - 1 : this.activeIndex - 1,
      true,
    )
  }

  /**
   * Skip to a specific slide index
   */
  skipTo(nextIndex: number, backwards?: boolean): Promise<void> {
    return new Promise((resolve) => {
      this.transitionQueue.push(async () => {
        await this.transitionTo(
          nextIndex,
          backwards === undefined ? nextIndex < this.activeIndex : backwards,
        )
        resolve()
      })
    })
  }

  /**
   * Pause the slider from auto scrolling
   */
  pause(): BoxSlider {
    this.options.autoScroll = false

    if (this.autoScrollTimer) {
      this.stopAutoScroll()
      this.emit('pause')
    }

    return this
  }

  /**
   * Start the slider auto scrolling
   */
  play(): BoxSlider {
    this.options.autoScroll = true
    this.setAutoScroll()
    this.emit('play')

    return this
  }

  /**
   * Add an event listener for a slider event
   */
  addEventListener<T extends SliderEventType>(
    ev: T,
    callback: SliderEventListenerMap[T],
  ): BoxSlider {
    if (!Array.isArray(this.eventListeners[ev])) {
      this.eventListeners[ev] = []
    }

    this.eventListeners[ev]!.push(callback)

    return this
  }

  /**
   * Remove an event listener for a slider event. The listener
   * must be the original function passed to addEventListener
   */
  removeEventListener<T extends SliderEventType>(
    ev: T,
    callback: SliderEventListenerMap[T],
  ): BoxSlider {
    const listeners = this.eventListeners[ev]?.filter(
      (cb) => cb !== callback,
    ) as EventListenerMap[T]

    this.eventListeners[ev] = listeners

    return this
  }

  /**
   * Destroy the slider, remove all event listeners and attributes
   */
  destroy(): void {
    this.isDestroyed = true
    this.stopAutoScroll()

    this.plugins.forEach((entry) => this.destroyPluginEntry(entry))
    this.plugins = []

    if (this.effect.destroy) {
      this.effect.destroy(this.el, this.slides)
    }

    this.stateStore.revert()
    this.transitionQueue.clear()
    responder.remove(this)
    this.emit('destroy')
    this.eventListeners = {}

    delete this._el
    delete this._stateStore
    delete this._effect
    this.slides.length = 0
  }

  /**
   * Register a plugin with the slider
   */
  use(plugin: Plugin): BoxSlider {
    if (this.plugins.some((entry) => entry.plugin.name === plugin.name)) {
      return this
    }

    const entry: PluginEntry = {
      plugin,
      listeners: [],
      sliderListeners: [],
    }

    this.plugins.push(entry)
    plugin.initialize(this.createPluginContext(entry))

    return this
  }

  /**
   * Remove a plugin by name
   */
  unuse(pluginName: string): BoxSlider {
    const index = this.plugins.findIndex(
      (entry) => entry.plugin.name === pluginName,
    )

    if (index !== -1) {
      const entry = this.plugins[index]
      this.destroyPluginEntry(entry)
      this.plugins.splice(index, 1)
    }

    return this
  }

  /**
   * Get a plugin by name
   */
  getPlugin<T extends Plugin>(name: string): T | undefined {
    const entry = this.plugins.find((e) => e.plugin.name === name)
    return entry?.plugin as T | undefined
  }

  private init(effect: Effect) {
    this._effect = effect
    this.slides = this.getSlides()
    this.stateStore.storeAttributes([this.el, ...this.slides], ['style'])

    if (this.activeIndex >= this.slides.length) {
      this._activeIndex = 0
    }

    this.effect.initialize(
      this.el,
      this.slides,
      {
        ...this.options,
        startIndex: this.activeIndex,
      },
      this.stateStore,
    )
    this.addAriaAttributes()

    if (this.options.autoScroll) {
      this.setAutoScroll()
    }
  }

  private addAriaAttributes() {
    this.stateStore.storeAttributes(
      [this.el, ...this.slides],
      ['aria-hidden', 'aria-live', 'aria-roledescription', 'role'],
    )

    this.el.setAttribute('aria-atomic', 'false')
    this.el.setAttribute('aria-live', 'polite')

    if (!this.el.hasAttribute('role')) {
      this.el.setAttribute('role', 'region')
    }

    this.slides.forEach((slide, index) => {
      if (!slide.hasAttribute('role')) {
        slide.setAttribute('role', 'group')
      }

      if (!slide.hasAttribute('aria-roledescription')) {
        slide.setAttribute('aria-roledescription', 'slide')
      }

      slide.setAttribute(
        'aria-hidden',
        index === this.activeIndex ? 'false' : 'true',
      )
    })
  }

  private getSlides(): HTMLElement[] {
    return [...this.el.children].filter(
      (child: Node) => child instanceof HTMLElement,
    ) as HTMLElement[]
  }

  private initializePlugins(plugins: Plugin[]) {
    plugins.forEach((plugin) => this.use(plugin))
  }

  private createPluginContext(entry: PluginEntry): PluginContext {
    return {
      slider: this,
      el: this.el,
      slides: this.slides,
      options: this.options,

      addListener: <K extends keyof HTMLElementEventMap>(
        target: EventTarget,
        type: K,
        listener: (ev: HTMLElementEventMap[K]) => void,
        options?: AddEventListenerOptions,
      ) => {
        target.addEventListener(type, listener as EventListener, options)
        entry.listeners.push({
          target,
          type,
          listener: listener as EventListener,
          options,
        })
      },

      on: <T extends SliderEventType>(
        event: T,
        handler: SliderEventListenerMap[T],
      ) => {
        this.addEventListener(event, handler)
        entry.sliderListeners.push({ event, handler })
      },

      requestProgressiveTransition: (direction: 'next' | 'prev') => {
        return this.requestProgressiveTransition(direction)
      },
    }
  }

  private destroyPluginEntry(entry: PluginEntry) {
    entry.plugin.destroy()

    entry.listeners.forEach(({ target, type, listener, options }) => {
      target.removeEventListener(type, listener, options)
    })
    entry.listeners = []

    entry.sliderListeners.forEach(({ event, handler }) => {
      this.removeEventListener(event, handler)
    })
    entry.sliderListeners = []
  }

  private resetPlugins() {
    this.plugins.forEach((entry) => {
      if (entry.plugin.reset) {
        entry.listeners.forEach(({ target, type, listener, options }) => {
          target.removeEventListener(type, listener, options)
        })
        entry.listeners = []

        entry.sliderListeners.forEach(({ event, handler }) => {
          this.removeEventListener(event, handler)
        })
        entry.sliderListeners = []

        entry.plugin.reset(this.createPluginContext(entry))
      }
    })
  }

  private requestProgressiveTransition(
    direction: 'next' | 'prev',
  ): ProgressiveTransitionController | null {
    if (
      this.progressiveTransitionInProgress ||
      !this.effect.supportsProgressiveTransition ||
      !this.effect.prepareTransition
    ) {
      return null
    }

    const isNext = direction === 'next'
    const isLastSlide = this.activeIndex === this.slides.length - 1
    const isFirstSlide = this.activeIndex === 0

    if (isNext && isLastSlide && !this.options.loop) {
      return null
    }

    if (!isNext && isFirstSlide && !this.options.loop) {
      return null
    }

    const nextIndex = isNext
      ? isLastSlide
        ? 0
        : this.activeIndex + 1
      : isFirstSlide
        ? this.slides.length - 1
        : this.activeIndex - 1

    const settings = {
      el: this.el,
      slides: this.slides,
      speed: this.options.speed,
      currentIndex: this.activeIndex,
      isPrevious: !isNext,
      nextIndex,
    }

    const state = this.effect.prepareTransition(settings)

    if (!state) {
      return null
    }

    this.progressiveTransitionInProgress = true
    this.stopAutoScroll()

    this.emit('before', {
      currentIndex: settings.currentIndex,
      nextIndex: settings.nextIndex,
      speed: settings.speed,
    })

    let currentProgress = 0

    const controller: ProgressiveTransitionController = {
      nextIndex,

      get progress() {
        return currentProgress
      },

      setProgress: (progress: number) => {
        currentProgress = Math.max(0, Math.min(1, progress))
        state.setProgress(currentProgress)
      },

      complete: async () => {
        try {
          await state.complete(currentProgress)
        } finally {
          this.progressiveTransitionInProgress = false
        }

        if (this.isDestroyed) {
          return
        }

        this._activeIndex = nextIndex
        this.slides[settings.currentIndex].setAttribute('aria-hidden', 'true')
        this.slides[nextIndex].setAttribute('aria-hidden', 'false')

        if (this.options.autoScroll) {
          this.setAutoScroll()
        }

        this.emit('after')
      },

      cancel: async () => {
        try {
          await state.cancel(currentProgress)
        } finally {
          this.progressiveTransitionInProgress = false
        }

        if (this.options.autoScroll && !this.isDestroyed) {
          this.setAutoScroll()
        }
      },

      abort: () => {
        state.abort()
        this.progressiveTransitionInProgress = false

        if (this.options.autoScroll && !this.isDestroyed) {
          this.setAutoScroll()
        }
      },
    }

    return controller
  }

  private async transitionTo(
    nextIndex: number,
    backwards: boolean,
  ): Promise<void> {
    this.stopAutoScroll()

    if (
      this.isDestroyed ||
      nextIndex === this.activeIndex ||
      nextIndex < 0 ||
      nextIndex >= this.slides.length
    ) {
      return
    }

    const settings = {
      el: this.el,
      slides: this.slides,
      speed: this.options.speed,
      currentIndex: this.activeIndex,
      isPrevious: backwards,
      nextIndex,
    }

    this._activeIndex = nextIndex

    this.emit('before', {
      currentIndex: settings.currentIndex,
      nextIndex: settings.nextIndex,
      speed: settings.speed,
    })

    try {
      await (this.effect.transition(settings) ?? Promise.resolve())
    } catch {
      // Transition may throw an error from aborted animation if slides are removed
      return
    }

    // It's possible that the slider was destroyed before the transition completed
    if (this.isDestroyed) {
      return
    }

    if (this.options.autoScroll) {
      this.setAutoScroll()
    }

    this.slides[settings.currentIndex].setAttribute('aria-hidden', 'true')
    this.slides[settings.nextIndex].setAttribute('aria-hidden', 'false')

    this.emit('after')
  }

  private stopAutoScroll() {
    globalThis.clearTimeout(this.autoScrollTimer)
  }

  private emit<T extends SliderEventType>(ev: T, payload?: SliderEventData) {
    const handlers: EventListenerMap[T] = this.eventListeners[ev]

    if (ev === 'destroy') {
      const destroyHandlers = handlers as EventListenerMap['destroy']
      destroyHandlers?.forEach((cb) => cb())
    } else {
      handlers?.forEach((cb) =>
        cb({
          currentIndex: this.activeIndex,
          speed: this.options.speed,
          ...payload,
        }),
      )
    }
  }

  private setAutoScroll() {
    this.stopAutoScroll()

    globalThis.requestAnimationFrame(() => {
      // Check if the element is still in the DOM, might have been removed
      // before animation frame callback is called
      if (!this._el) {
        return
      }

      this.el.setAttribute('aria-live', 'off')

      this.autoScrollTimer = globalThis.setTimeout(
        () => this.next(),
        this.options.timeout,
      )
    })
  }
}

export default BoxSlider
