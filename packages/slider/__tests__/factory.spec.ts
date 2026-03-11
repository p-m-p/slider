import {
  getSliderElement,
  createCarouselSlider,
  createCubeSlider,
  createFadeSlider,
  createTileSlider,
} from '../src/index'

function createSliderElement(id?: string): HTMLElement {
  const el = document.createElement('div')
  const viewport = document.createElement('div')

  el.innerHTML = `
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
  `

  if (id) {
    el.id = id
  }

  viewport.append(el)
  document.body.append(viewport)

  return el
}

describe('getSliderElement', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('returns the element when an HTMLElement is passed', () => {
    const el = document.createElement('div')
    expect(getSliderElement(el)).toBe(el)
  })

  test('returns the element when a valid selector string is passed', () => {
    const el = createSliderElement('test-slider')
    expect(getSliderElement('#test-slider')).toBe(el)
  })

  test('throws an error when a selector string does not match any element', () => {
    expect(() => getSliderElement('#non-existent')).toThrow(
      'Slider element not found: #non-existent',
    )
  })
})

describe('createCarouselSlider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('creates a BoxSlider with CarouselSlider effect using an HTMLElement', () => {
    const el = createSliderElement()
    const slider = createCarouselSlider(el, { autoScroll: false })

    expect(slider).toBeDefined()
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('creates a BoxSlider with CarouselSlider effect using a selector string', () => {
    createSliderElement('carousel-test')
    const slider = createCarouselSlider('#carousel-test', { autoScroll: false })

    expect(slider).toBeDefined()

    slider.destroy()
  })

  test('passes carousel-specific options to CarouselSlider', () => {
    const el = createSliderElement()
    const slider = createCarouselSlider(el, {
      autoScroll: false,
      cover: true,
      timingFunction: 'linear',
    })

    expect(slider).toBeDefined()

    slider.destroy()
  })

  test('uses default options when none provided', () => {
    const el = createSliderElement()
    const slider = createCarouselSlider(el)

    expect(slider).toBeDefined()

    slider.destroy()
  })
})

describe('createCubeSlider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('creates a BoxSlider with CubeSlider effect using an HTMLElement', () => {
    const el = createSliderElement()
    const slider = createCubeSlider(el, { autoScroll: false })

    expect(slider).toBeDefined()
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('creates a BoxSlider with CubeSlider effect using a selector string', () => {
    createSliderElement('cube-test')
    const slider = createCubeSlider('#cube-test', { autoScroll: false })

    expect(slider).toBeDefined()

    slider.destroy()
  })

  test('passes cube-specific options to CubeSlider', () => {
    const el = createSliderElement()
    const slider = createCubeSlider(el, {
      autoScroll: false,
      direction: 'vertical',
      perspective: 2000,
    })

    expect(slider).toBeDefined()

    slider.destroy()
  })

  test('uses default options when none provided', () => {
    const el = createSliderElement()
    const slider = createCubeSlider(el)

    expect(slider).toBeDefined()

    slider.destroy()
  })
})

describe('createFadeSlider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('creates a BoxSlider with FadeSlider effect using an HTMLElement', () => {
    const el = createSliderElement()
    const slider = createFadeSlider(el, { autoScroll: false })

    expect(slider).toBeDefined()
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('creates a BoxSlider with FadeSlider effect using a selector string', () => {
    createSliderElement('fade-test')
    const slider = createFadeSlider('#fade-test', { autoScroll: false })

    expect(slider).toBeDefined()

    slider.destroy()
  })

  test('passes fade-specific options to FadeSlider', () => {
    const el = createSliderElement()
    const slider = createFadeSlider(el, {
      autoScroll: false,
      timingFunction: 'ease-out',
    })

    expect(slider).toBeDefined()

    slider.destroy()
  })

  test('uses default options when none provided', () => {
    const el = createSliderElement()
    const slider = createFadeSlider(el)

    expect(slider).toBeDefined()

    slider.destroy()
  })
})

describe('createTileSlider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('creates a BoxSlider with TileSlider effect using an HTMLElement', () => {
    const el = createSliderElement()

    Object.defineProperty(el, 'offsetWidth', { value: 400, configurable: true })
    Object.defineProperty(el, 'offsetHeight', {
      value: 300,
      configurable: true,
    })
    el.style.width = '400px'
    el.style.height = '300px'

    const slider = createTileSlider(el, { autoScroll: false })

    expect(slider).toBeDefined()
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('creates a BoxSlider with TileSlider effect using a selector string', () => {
    const el = createSliderElement('tile-test')

    Object.defineProperty(el, 'offsetWidth', { value: 400, configurable: true })
    Object.defineProperty(el, 'offsetHeight', {
      value: 300,
      configurable: true,
    })
    el.style.width = '400px'
    el.style.height = '300px'

    const slider = createTileSlider('#tile-test', { autoScroll: false })

    expect(slider).toBeDefined()

    slider.destroy()
  })

  test('passes tile-specific options to TileSlider', () => {
    const el = createSliderElement()

    Object.defineProperty(el, 'offsetWidth', { value: 400, configurable: true })
    Object.defineProperty(el, 'offsetHeight', {
      value: 300,
      configurable: true,
    })
    el.style.width = '400px'
    el.style.height = '300px'

    const slider = createTileSlider(el, {
      autoScroll: false,
      rows: 4,
      tileEffect: 'fade',
    })

    expect(slider).toBeDefined()

    slider.destroy()
  })

  test('uses default options when none provided', () => {
    const el = createSliderElement()

    Object.defineProperty(el, 'offsetWidth', { value: 400, configurable: true })
    Object.defineProperty(el, 'offsetHeight', {
      value: 300,
      configurable: true,
    })
    el.style.width = '400px'
    el.style.height = '300px'

    const slider = createTileSlider(el)

    expect(slider).toBeDefined()

    slider.destroy()
  })
})
