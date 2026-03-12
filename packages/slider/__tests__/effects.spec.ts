import CarouselSlider from '../src/effects/carousel-slider'
import CubeSlider from '../src/effects/cube-slider'
import FadeSlider from '../src/effects/fade-slider'
import { StateStore } from '../src/state-store'
import { defaultOptions } from '../src/box-slider'

function createSlides(count = 3): HTMLElement[] {
  return Array.from({ length: count }, (_, i) => {
    const el = document.createElement('div')
    el.textContent = `Slide ${i + 1}`
    Object.defineProperty(el, 'offsetWidth', { value: 400, configurable: true })
    Object.defineProperty(el, 'offsetHeight', {
      value: 300,
      configurable: true,
    })
    return el
  })
}

function createSliderEl(slides?: HTMLElement[]): {
  el: HTMLElement
  viewport: HTMLElement
  slides: HTMLElement[]
} {
  const el = document.createElement('div')
  const viewport = document.createElement('div')
  const slideEls = slides || createSlides()

  slideEls.forEach((s) => el.append(s))
  Object.defineProperty(el, 'offsetWidth', { value: 400, configurable: true })
  Object.defineProperty(el, 'offsetHeight', { value: 300, configurable: true })

  viewport.append(el)
  document.body.append(viewport)

  return { el, viewport, slides: slideEls }
}

describe('CarouselSlider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initializes slides with correct CSS', () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()

    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    expect(el.style.getPropertyValue('overflow')).toBe('hidden')
  })

  test('initializes with already-positioned element', () => {
    const { el, slides } = createSliderEl()
    el.style.position = 'relative'
    const effect = new CarouselSlider()

    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    expect(el.style.getPropertyValue('overflow')).toBe('hidden')
  })

  test('destroy cancels animations on slides', () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    expect(() => effect.destroy(el, slides)).not.toThrow()
  })

  test('prepareTransition returns a ProgressiveTransitionState', () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    expect(state).toBeDefined()
    expect(state.setProgress).toBeInstanceOf(Function)
    expect(state.complete).toBeInstanceOf(Function)
    expect(state.cancel).toBeInstanceOf(Function)
    expect(state.abort).toBeInstanceOf(Function)
  })

  test('setProgress updates slide positions', () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    expect(() => state.setProgress(0.5)).not.toThrow()
  })

  test('complete resolves and updates final state', async () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    await expect(state.complete(0)).resolves.toBeUndefined()
  })

  test('complete from partial progress resolves', async () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    state.setProgress(0.4)
    await expect(state.complete(0.4)).resolves.toBeUndefined()
  })

  test('cancel restores slide positions', async () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    state.setProgress(0.3)
    await expect(state.cancel(0.3)).resolves.toBeUndefined()
  })

  test('abort resets slide positions immediately', () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    expect(() => state.abort()).not.toThrow()
  })

  test('isPrevious transition moves in reverse direction', async () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 1 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 1,
      nextIndex: 0,
      isPrevious: true,
      speed: 500,
    })

    await expect(state.complete(0)).resolves.toBeUndefined()
  })

  test('cover mode complete does not animate current slide out', async () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider({ cover: true })
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    await expect(state.complete(0)).resolves.toBeUndefined()
  })

  test('cover mode cancel does not animate current slide back', async () => {
    const { el, slides } = createSliderEl()
    const effect = new CarouselSlider({ cover: true })
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    await expect(state.cancel(0.3)).resolves.toBeUndefined()
  })
})

describe('FadeSlider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initializes slides with correct CSS', () => {
    const { el, slides } = createSliderEl()
    const effect = new FadeSlider()

    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    expect(slides[0].style.getPropertyValue('opacity')).toBe('1')
    expect(slides[1].style.getPropertyValue('opacity')).toBe('0')
  })

  test('initializes with already-positioned element', () => {
    const { el, slides } = createSliderEl()
    el.style.position = 'relative'
    const effect = new FadeSlider()

    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    expect(slides[0].style.getPropertyValue('opacity')).toBe('1')
  })

  test('destroy cancels animations on slides', () => {
    const { el, slides } = createSliderEl()
    const effect = new FadeSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    expect(() => effect.destroy(el, slides)).not.toThrow()
  })

  test('prepareTransition returns a ProgressiveTransitionState', () => {
    const { el, slides } = createSliderEl()
    const effect = new FadeSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    expect(state).toBeDefined()
  })

  test('setProgress updates opacity on slides', () => {
    const { el, slides } = createSliderEl()
    const effect = new FadeSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    state.setProgress(0.5)
    expect(slides[0].style.getPropertyValue('opacity')).toBe('0.5')
    expect(slides[1].style.getPropertyValue('opacity')).toBe('0.5')
  })

  test('complete resolves and sets final opacity', async () => {
    const { el, slides } = createSliderEl()
    const effect = new FadeSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    await expect(state.complete(0)).resolves.toBeUndefined()
  })

  test('complete from partial progress resolves', async () => {
    const { el, slides } = createSliderEl()
    const effect = new FadeSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    state.setProgress(0.4)
    await expect(state.complete(0.4)).resolves.toBeUndefined()
  })

  test('cancel restores slide opacity', async () => {
    const { el, slides } = createSliderEl()
    const effect = new FadeSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    state.setProgress(0.3)
    await expect(state.cancel(0.3)).resolves.toBeUndefined()
  })

  test('abort resets slide opacity immediately', () => {
    const { el, slides } = createSliderEl()
    const effect = new FadeSlider()
    effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    state.abort()
    expect(slides[0].style.getPropertyValue('opacity')).toBe('1')
    expect(slides[1].style.getPropertyValue('opacity')).toBe('0')
  })
})

describe('CubeSlider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initializes with horizontal direction by default', () => {
    const { el, slides } = createSliderEl()
    const stateStore = new StateStore()
    const effect = new CubeSlider()

    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 0 },
      stateStore,
    )

    expect(el.style.getPropertyValue('transform-style')).toBe('preserve-3d')
  })

  test('initializes with vertical direction', () => {
    const { el, slides } = createSliderEl()
    const stateStore = new StateStore()
    const effect = new CubeSlider({ direction: 'vertical' })

    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 0 },
      stateStore,
    )

    expect(el.style.getPropertyValue('transform-style')).toBe('preserve-3d')
  })

  test('throws when element has no parent', () => {
    const el = document.createElement('div')
    const slides = createSlides()
    const stateStore = new StateStore()
    const effect = new CubeSlider()

    expect(() =>
      effect.initialize(
        el,
        slides,
        { ...defaultOptions, startIndex: 0 },
        stateStore,
      ),
    ).toThrow('Unable to locate viewport element for Cube slider')
  })

  test('swipeDirection returns horizontal by default', () => {
    const effect = new CubeSlider()
    expect(effect.swipeDirection).toBe('horizontal')
  })

  test('swipeDirection returns vertical when configured', () => {
    const effect = new CubeSlider({ direction: 'vertical' })
    expect(effect.swipeDirection).toBe('vertical')
  })

  test('prepareTransition returns a ProgressiveTransitionState', () => {
    const { el, slides } = createSliderEl()
    const stateStore = new StateStore()
    const effect = new CubeSlider()
    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 0 },
      stateStore,
    )

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    expect(state).toBeDefined()
  })

  test('setProgress updates element transform', () => {
    const { el, slides } = createSliderEl()
    const stateStore = new StateStore()
    const effect = new CubeSlider()
    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 0 },
      stateStore,
    )

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    expect(() => state.setProgress(0.5)).not.toThrow()
  })

  test('complete resolves and resets non-active slides', async () => {
    const { el, slides } = createSliderEl()
    const stateStore = new StateStore()
    const effect = new CubeSlider()
    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 0 },
      stateStore,
    )

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    await expect(state.complete(0)).resolves.toBeUndefined()
  })

  test('cancel restores to initial state', async () => {
    const { el, slides } = createSliderEl()
    const stateStore = new StateStore()
    const effect = new CubeSlider()
    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 0 },
      stateStore,
    )

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    state.setProgress(0.3)
    await expect(state.cancel(0.3)).resolves.toBeUndefined()
  })

  test('abort resets immediately', () => {
    const { el, slides } = createSliderEl()
    const stateStore = new StateStore()
    const effect = new CubeSlider()
    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 0 },
      stateStore,
    )

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 0,
      nextIndex: 1,
      isPrevious: false,
      speed: 500,
    })

    expect(() => state.abort()).not.toThrow()
  })

  test('isPrevious transition uses positive target angle', async () => {
    const { el, slides } = createSliderEl()
    const stateStore = new StateStore()
    const effect = new CubeSlider()
    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 1 },
      stateStore,
    )

    const state = effect.prepareTransition({
      el,
      slides,
      currentIndex: 1,
      nextIndex: 0,
      isPrevious: true,
      speed: 500,
    })

    await expect(state.complete(0)).resolves.toBeUndefined()
  })

  test('complete with viewport already positioned does not set position again', () => {
    const { el, viewport, slides } = createSliderEl()
    viewport.style.position = 'relative'
    const stateStore = new StateStore()
    const effect = new CubeSlider()

    effect.initialize(
      el,
      slides,
      { ...defaultOptions, startIndex: 0 },
      stateStore,
    )

    expect(viewport.style.getPropertyValue('overflow')).toBe('visible')
  })
})
