import TileSlider from '../src/effects/tile/tile-slider'
import FadeTransition from '../src/effects/tile/fade-transition'
import FlipTransition from '../src/effects/tile/flip-transition'
import {
  TILE_CLASS,
  FRONT_FACE_CLASS,
  BACK_FACE_CLASS,
} from '../src/effects/tile/tile-transition'
import { defaultOptions } from '../src/box-slider'

function createSlides(count = 3): HTMLElement[] {
  return Array.from({ length: count }, (_, i) => {
    const el = document.createElement('div')
    el.textContent = `Slide ${i + 1}`
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

  // Set dimensions for tile grid calculation
  Object.defineProperty(el, 'offsetWidth', { value: 400, configurable: true })
  Object.defineProperty(el, 'offsetHeight', { value: 300, configurable: true })
  el.style.width = '400px'
  el.style.height = '300px'

  viewport.append(el)
  document.body.append(viewport)

  return { el, viewport, slides: slideEls }
}

describe('TileSlider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('constructor', () => {
    test('uses default options when none provided', () => {
      const effect = new TileSlider()
      expect(effect.options.rows).toBe(8)
      expect(effect.options.rowOffset).toBe(50)
      expect(effect.options.tileEffect).toBe('flip')
    })

    test('merges provided options with defaults', () => {
      const effect = new TileSlider({ rows: 4, tileEffect: 'fade' })
      expect(effect.options.rows).toBe(4)
      expect(effect.options.tileEffect).toBe('fade')
      expect(effect.options.rowOffset).toBe(50)
    })

    test('creates FadeTransition when tileEffect is fade', () => {
      const effect = new TileSlider({ tileEffect: 'fade' })
      expect(effect.options.tileEffect).toBe('fade')
    })

    test('creates FlipTransition when tileEffect is flip', () => {
      const effect = new TileSlider({ tileEffect: 'flip' })
      expect(effect.options.tileEffect).toBe('flip')
    })
  })

  describe('initialize', () => {
    test('creates tile wrapper element', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider()

      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      expect(el.querySelector('[data-bs-element]')).not.toBeNull()
    })

    test('throws when accessing tileWrapper before initialize', () => {
      const effect = new TileSlider()
      expect(() => effect.tileWrapper).toThrow('TileWrapper is undefined')
    })

    test('sets position relative when el has no positioning', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider()

      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      expect(el.style.getPropertyValue('position')).toBe('relative')
    })

    test('does not override position when already set', () => {
      const { el, slides } = createSliderEl()
      el.style.position = 'absolute'
      const effect = new TileSlider()

      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      expect(el.style.getPropertyValue('position')).toBe('absolute')
    })

    test('creates tiles for each row and column', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ rows: 2 })

      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      const tiles = effect.tileWrapper.querySelectorAll(`.${TILE_CLASS}`)
      expect(tiles.length).toBeGreaterThan(0)
    })

    test('hides non-active slides', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider()

      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      expect(slides[1].style.getPropertyValue('visibility')).toBe('hidden')
      expect(slides[2].style.getPropertyValue('visibility')).toBe('hidden')
    })

    test('re-initializes when called a second time', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider()

      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })
      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      const wrappers = el.querySelectorAll('[data-bs-element]')
      expect(wrappers.length).toBe(1)
    })

    test('initializes with fade tileEffect', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ tileEffect: 'fade', rows: 2 })

      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      const tiles = effect.tileWrapper.querySelectorAll(`.${TILE_CLASS}`)
      expect(tiles.length).toBeGreaterThan(0)
    })
  })

  describe('prepareTransition', () => {
    test('returns a ProgressiveTransitionState', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ rows: 2 })
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
      expect(state.complete).toBeInstanceOf(Function)
    })

    test('shows tile wrapper and hides current slide', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ rows: 2 })
      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      effect.prepareTransition({
        el,
        slides,
        currentIndex: 0,
        nextIndex: 1,
        isPrevious: false,
        speed: 500,
      })

      expect(effect.tileWrapper.style.getPropertyValue('display')).toBe('block')
      expect(slides[0].style.getPropertyValue('visibility')).toBe('hidden')
    })

    test('complete triggers tile animations and restores visibility', async () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ rows: 2 })
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
      expect(slides[1].style.getPropertyValue('visibility')).toBe('visible')
      expect(effect.tileWrapper.style.getPropertyValue('display')).toBe('none')
    })

    test('cancel hides tile wrapper and restores current slide', async () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ rows: 2 })
      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      const state = effect.prepareTransition({
        el,
        slides,
        currentIndex: 0,
        nextIndex: 1,
        isPrevious: false,
        speed: 500,
      })

      await expect(state.cancel(0)).resolves.toBeUndefined()
      expect(slides[0].style.getPropertyValue('visibility')).toBe('visible')
      expect(effect.tileWrapper.style.getPropertyValue('display')).toBe('none')
    })

    test('abort hides tile wrapper and restores current slide', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ rows: 2 })
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
      expect(slides[0].style.getPropertyValue('visibility')).toBe('visible')
    })

    test('transitions between faces on subsequent transitions', async () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ rows: 2 })
      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      // First transition
      const state1 = effect.prepareTransition({
        el,
        slides,
        currentIndex: 0,
        nextIndex: 1,
        isPrevious: false,
        speed: 500,
      })
      await state1.complete(0)

      // Second transition
      const state2 = effect.prepareTransition({
        el,
        slides,
        currentIndex: 1,
        nextIndex: 2,
        isPrevious: false,
        speed: 500,
      })
      await expect(state2.complete(0)).resolves.toBeUndefined()
    })

    test('setProgress does nothing (tile transitions do not support drag)', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider({ rows: 2 })
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
  })

  describe('destroy', () => {
    test('removes the tile wrapper from the DOM', () => {
      const { el, slides } = createSliderEl()
      const effect = new TileSlider()
      effect.initialize(el, slides, { ...defaultOptions, startIndex: 0 })

      effect.destroy()

      expect(el.querySelector('[data-bs-element]')).toBeNull()
    })
  })
})

describe('FadeTransition', () => {
  test('createTile creates a tile with front and back faces', () => {
    const transition = new FadeTransition()
    const tile = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 0,
      fromTop: 0,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 1,
    })

    expect(tile.classList.contains(TILE_CLASS)).toBe(true)
    expect(tile.querySelector(`.${FRONT_FACE_CLASS}`)).not.toBeNull()
    expect(tile.querySelector(`.${BACK_FACE_CLASS}`)).not.toBeNull()
  })

  test('createTile applies correct positioning styles', () => {
    const transition = new FadeTransition()
    const tile = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 50,
      fromTop: 25,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 1,
    })

    expect(tile.style.getPropertyValue('left')).toBe('50px')
    expect(tile.style.getPropertyValue('top')).toBe('25px')
  })

  test('setTileFace clones the slide into the face element', () => {
    const transition = new FadeTransition()
    const slide = document.createElement('div')
    slide.textContent = 'Slide content'
    slide.style.visibility = 'hidden'

    const face = document.createElement('div')
    transition.setTileFace(slide, face)

    expect(face.children.length).toBe(1)
    expect(face.firstElementChild?.textContent).toBe('Slide content')
    // Visibility property should be removed
    expect(
      (face.firstElementChild as HTMLElement)?.style.getPropertyValue(
        'visibility',
      ),
    ).toBe('')
  })

  test('transition animates tile faces', async () => {
    const transition = new FadeTransition()
    const tile = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 0,
      fromTop: 0,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 1,
    })

    await expect(
      transition.transition({
        tile,
        nextFace: 'back',
        delay: 0,
        duration: 100,
      }),
    ).resolves.toBeUndefined()
  })

  test('transition to front face animates correctly', async () => {
    const transition = new FadeTransition()
    const tile = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 0,
      fromTop: 0,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 1,
    })

    await expect(
      transition.transition({
        tile,
        nextFace: 'front',
        delay: 0,
        duration: 100,
      }),
    ).resolves.toBeUndefined()
  })
})

describe('FlipTransition', () => {
  test('createTile creates a tile holder with inner tile and faces', () => {
    const transition = new FlipTransition()
    const tileHolder = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 0,
      fromTop: 0,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 5,
    })

    expect(tileHolder.querySelector(`.${TILE_CLASS}`)).not.toBeNull()
    expect(tileHolder.querySelector(`.${FRONT_FACE_CLASS}`)).not.toBeNull()
    expect(tileHolder.querySelector(`.${BACK_FACE_CLASS}`)).not.toBeNull()
  })

  test('createTile applies correct positioning styles', () => {
    const transition = new FlipTransition()
    const tileHolder = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 100,
      fromTop: 50,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 3,
    })

    expect(tileHolder.style.getPropertyValue('left')).toBe('100px')
    expect(tileHolder.style.getPropertyValue('top')).toBe('50px')
    expect(tileHolder.style.getPropertyValue('z-index')).toBe('3')
  })

  test('setTileFace clones slide into the face element child', () => {
    const transition = new FlipTransition()
    const slide = document.createElement('div')
    slide.textContent = 'Flip content'
    slide.style.visibility = 'hidden'

    const tileHolder = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 0,
      fromTop: 0,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 1,
    })

    const frontFace = tileHolder.querySelector(
      `.${FRONT_FACE_CLASS}`,
    ) as HTMLElement
    transition.setTileFace(slide, frontFace)

    const innerFaceEl = frontFace.firstElementChild as HTMLElement
    expect(innerFaceEl).not.toBeNull()
    expect(innerFaceEl?.firstElementChild?.textContent).toBe('Flip content')
  })

  test('transition to back face animates the tile', async () => {
    const transition = new FlipTransition()
    const tileHolder = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 0,
      fromTop: 0,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 1,
    })

    const innerTile = tileHolder.querySelector(`.${TILE_CLASS}`) as HTMLElement

    await expect(
      transition.transition({
        tile: innerTile,
        nextFace: 'back',
        delay: 0,
        duration: 100,
      }),
    ).resolves.toBeUndefined()
  })

  test('transition to front face animates correctly', async () => {
    const transition = new FlipTransition()
    const tileHolder = transition.createTile({
      backClass: BACK_FACE_CLASS,
      boxWidth: 400,
      boxHeight: 300,
      fromLeft: 0,
      fromTop: 0,
      frontClass: FRONT_FACE_CLASS,
      height: 50,
      speed: 500,
      tileClass: TILE_CLASS,
      width: 50,
      zIndex: 1,
    })

    const innerTile = tileHolder.querySelector(`.${TILE_CLASS}`) as HTMLElement

    await expect(
      transition.transition({
        tile: innerTile,
        nextFace: 'front',
        delay: 0,
        duration: 100,
      }),
    ).resolves.toBeUndefined()
  })
})
