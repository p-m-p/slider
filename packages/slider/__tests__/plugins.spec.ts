import { BoxSlider, CarouselSlider, CubeSlider, FadeSlider } from '../src'

function createSliderElement(): HTMLElement {
  const el = document.createElement('div')
  const viewport = document.createElement('div')

  el.innerHTML = `
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
  `

  viewport.append(el)
  document.body.append(viewport)

  return el
}

describe('Pause on hover', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('pauses slider on pointer enter when auto scrolling and pauseOnHover is true', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new CarouselSlider(), {
      autoScroll: true,
      pauseOnHover: true,
    })

    const pauseSpy = vi.spyOn(slider, 'pause')
    el.dispatchEvent(new PointerEvent('pointerenter'))

    expect(pauseSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('resumes slider on pointer leave', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new CarouselSlider(), {
      autoScroll: true,
      pauseOnHover: true,
    })

    el.dispatchEvent(new PointerEvent('pointerenter'))

    const playSpy = vi.spyOn(slider, 'play')
    el.dispatchEvent(new PointerEvent('pointerleave'))

    expect(playSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('does not pause on hover when pauseOnHover is false', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new CarouselSlider(), {
      autoScroll: true,
      pauseOnHover: false,
    })

    const pauseSpy = vi.spyOn(slider, 'pause')
    el.dispatchEvent(new PointerEvent('pointerenter'))

    expect(pauseSpy).not.toHaveBeenCalled()

    slider.destroy()
  })
})

describe('Swipe navigation', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('triggers prev on right swipe', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
      startIndex: 1,
      swipe: true,
      swipeTolerance: 10,
    })

    const prevSpy = vi.spyOn(slider, 'prev')

    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 200, clientY: 100 } as Touch],
      }),
    )

    expect(prevSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('triggers next on left swipe', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
      swipe: true,
      swipeTolerance: 10,
    })

    const nextSpy = vi.spyOn(slider, 'next')

    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 200, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    expect(nextSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('does not trigger transition if threshold not met', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      swipe: true,
      swipeTolerance: 100,
    })

    const nextSpy = vi.spyOn(slider, 'next')
    const prevSpy = vi.spyOn(slider, 'prev')

    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 120, clientY: 100 } as Touch],
      }),
    )

    expect(nextSpy).not.toHaveBeenCalled()
    expect(prevSpy).not.toHaveBeenCalled()

    slider.destroy()
  })

  test('does not respond to swipe when swipe is disabled', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      swipe: false,
    })

    const nextSpy = vi.spyOn(slider, 'next')
    const prevSpy = vi.spyOn(slider, 'prev')

    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 200, clientY: 100 } as Touch],
      }),
    )

    expect(nextSpy).not.toHaveBeenCalled()
    expect(prevSpy).not.toHaveBeenCalled()

    slider.destroy()
  })

  test('vertical swipe direction triggers correct navigation', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(
      el,
      new CubeSlider({ direction: 'vertical' }),
      {
        autoScroll: false,
        startIndex: 1,
        swipe: true,
        swipeTolerance: 10,
      },
    )

    const prevSpy = vi.spyOn(slider, 'prev')

    // Swipe up (negative Y delta) should trigger prev for vertical
    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 200 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    expect(prevSpy).toHaveBeenCalled()

    slider.destroy()
  })
})

describe('Progressive Transitions', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('CarouselSlider supports progressive transitions', () => {
    const effect = new CarouselSlider()
    expect(effect.prepareTransition).toBeDefined()
  })

  test('FadeSlider supports progressive transitions', () => {
    const effect = new FadeSlider()
    expect(effect.prepareTransition).toBeDefined()
  })

  test('progressive drag transition works with carousel', async () => {
    const el = createSliderElement()
    Object.defineProperty(el, 'offsetWidth', { value: 100 })

    const slider = new BoxSlider(el, new CarouselSlider(), {
      autoScroll: false,
      speed: 10,
      swipe: true,
      swipeTolerance: 5,
    })

    // Start touch
    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    // Move past threshold to start progressive transition
    el.dispatchEvent(
      new TouchEvent('touchmove', {
        cancelable: true,
        touches: [{ clientX: 90, clientY: 100 } as Touch],
      }),
    )

    // Continue moving
    el.dispatchEvent(
      new TouchEvent('touchmove', {
        cancelable: true,
        touches: [{ clientX: 40, clientY: 100 } as Touch],
      }),
    )

    // End touch - should complete the transition
    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 40, clientY: 100 } as Touch],
      }),
    )

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(slider.activeIndex).toBe(1)

    slider.destroy()
  })
})
