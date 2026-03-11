import {
  BoxSlider,
  CarouselSlider,
  CubeSlider,
  FadeSlider,
  TileSlider,
} from '../src'
import { StateStore } from '../src/state-store'

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

describe('BoxSlider API', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('getOption returns the correct option value', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 300,
    })

    expect(slider.getOption('speed')).toBe(300)

    slider.destroy()
  })

  test('el getter returns the slider element', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), { autoScroll: false })

    expect(slider.el).toBe(el)

    slider.destroy()
  })

  test('length returns number of slides', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), { autoScroll: false })

    expect(slider.length).toBe(3)

    slider.destroy()
  })

  test('next advances to the next slide', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
    })

    await slider.next()
    expect(slider.activeIndex).toBe(1)

    slider.destroy()
  })

  test('prev goes back to previous slide', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
      startIndex: 1,
    })

    await slider.prev()
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('next wraps around from last to first slide when loop is enabled', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
      startIndex: 2,
      loop: true,
    })

    await slider.next()
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('prev wraps around from first to last slide when loop is enabled', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
      startIndex: 0,
      loop: true,
    })

    await slider.prev()
    expect(slider.activeIndex).toBe(2)

    slider.destroy()
  })

  test('next does not advance past last slide when loop is disabled', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
      startIndex: 2,
      loop: false,
    })

    await slider.next()
    expect(slider.activeIndex).toBe(2)

    slider.destroy()
  })

  test('prev does not advance past first slide when loop is disabled', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
      startIndex: 0,
      loop: false,
    })

    await slider.prev()
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('skipTo advances to a specific slide', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
    })

    await slider.skipTo(2)
    expect(slider.activeIndex).toBe(2)

    slider.destroy()
  })

  test('skipTo with explicit backwards flag', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
      startIndex: 2,
    })

    await slider.skipTo(0, true)
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('play starts auto scrolling and emits play event', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
    })

    const playSpy = vi.fn()
    slider.addEventListener('play', playSpy)
    slider.play()

    expect(playSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('pause stops auto scrolling and emits pause event', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: true,
    })

    // Wait for requestAnimationFrame to fire and set the auto scroll timer
    await new Promise((resolve) => requestAnimationFrame(resolve))

    const pauseSpy = vi.fn()
    slider.addEventListener('pause', pauseSpy)
    slider.pause()

    expect(pauseSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('pause does not emit when not auto scrolling', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
    })

    const pauseSpy = vi.fn()
    slider.addEventListener('pause', pauseSpy)
    slider.pause()

    expect(pauseSpy).not.toHaveBeenCalled()

    slider.destroy()
  })

  test('addEventListener and removeEventListener work correctly', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
    })

    const afterSpy = vi.fn()
    slider.addEventListener('after', afterSpy)
    await slider.next()
    expect(afterSpy).toHaveBeenCalledTimes(1)

    slider.removeEventListener('after', afterSpy)
    await slider.next()
    expect(afterSpy).toHaveBeenCalledTimes(1)

    slider.destroy()
  })

  test('emit triggers before and after events with correct data', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
    })

    const beforeSpy = vi.fn()
    const afterSpy = vi.fn()
    slider.addEventListener('before', beforeSpy)
    slider.addEventListener('after', afterSpy)

    await slider.next()

    expect(beforeSpy).toHaveBeenCalledWith(
      expect.objectContaining({ currentIndex: 0, nextIndex: 1 }),
    )
    expect(afterSpy).toHaveBeenCalledWith(
      expect.objectContaining({ currentIndex: 1 }),
    )

    slider.destroy()
  })

  test('destroy emits destroy event', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
    })

    const destroySpy = vi.fn()
    slider.addEventListener('destroy', destroySpy)
    slider.destroy()

    expect(destroySpy).toHaveBeenCalled()
  })

  test('reset re-initializes the slider', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 300,
    })

    const resetSpy = vi.fn()
    slider.addEventListener('reset', resetSpy)
    slider.reset({ speed: 500 })

    expect(resetSpy).toHaveBeenCalled()
    expect(slider.getOption('speed')).toBe(500)

    slider.destroy()
  })

  test('reset with new effect changes the effect', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
    })

    slider.reset(undefined, new CarouselSlider())
    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('reset with startIndex changes active index', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
    })

    slider.reset({ startIndex: 2 })
    expect(slider.activeIndex).toBe(2)

    slider.destroy()
  })

  test('aria attributes are set on initialization', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      startIndex: 0,
    })

    expect(el.getAttribute('aria-live')).toBe('polite')
    expect(el.getAttribute('role')).toBe('region')

    const slides = el.children
    expect(slides[0].getAttribute('aria-hidden')).toBe('false')
    expect(slides[1].getAttribute('aria-hidden')).toBe('true')

    slider.destroy()
  })

  test('aria-live is set to off when auto scrolling', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: true,
      timeout: 10,
    })

    await new Promise((resolve) => requestAnimationFrame(resolve))
    expect(el.getAttribute('aria-live')).toBe('off')

    slider.destroy()
  })

  test('aria attributes update after transition', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      speed: 10,
    })

    await slider.next()

    const slides = el.children
    expect(slides[0].getAttribute('aria-hidden')).toBe('true')
    expect(slides[1].getAttribute('aria-hidden')).toBe('false')

    slider.destroy()
  })

  test('progress events are emitted during progressive transitions', async () => {
    const el = createSliderElement()
    Object.defineProperty(el, 'offsetWidth', { value: 100, configurable: true })

    const slider = new BoxSlider(el, new CarouselSlider(), {
      autoScroll: false,
      speed: 10,
      swipe: true,
      swipeTolerance: 5,
    })

    const progressSpy = vi.fn()
    slider.addEventListener('progress', progressSpy)

    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchmove', {
        cancelable: true,
        touches: [{ clientX: 90, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchmove', {
        cancelable: true,
        touches: [{ clientX: 70, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 70, clientY: 100 } as Touch],
      }),
    )

    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(progressSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('cancel event is emitted when progressive transition is cancelled', async () => {
    const el = createSliderElement()
    Object.defineProperty(el, 'offsetWidth', { value: 200, configurable: true })

    const slider = new BoxSlider(el, new CarouselSlider(), {
      autoScroll: false,
      speed: 10,
      swipe: true,
      swipeTolerance: 5,
    })

    const cancelSpy = vi.fn()
    slider.addEventListener('cancel', cancelSpy)

    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    // Move just enough to trigger progressive transition
    el.dispatchEvent(
      new TouchEvent('touchmove', {
        cancelable: true,
        touches: [{ clientX: 90, clientY: 100 } as Touch],
      }),
    )

    // End with insufficient progress to complete (less than 50% of 200px = 100px)
    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 80, clientY: 100 } as Touch],
      }),
    )

    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(cancelSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('touchcancel aborts progressive transition', async () => {
    const el = createSliderElement()
    Object.defineProperty(el, 'offsetWidth', { value: 100, configurable: true })

    const slider = new BoxSlider(el, new CarouselSlider(), {
      autoScroll: false,
      speed: 10,
      swipe: true,
      swipeTolerance: 5,
    })

    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchmove', {
        cancelable: true,
        touches: [{ clientX: 80, clientY: 100 } as Touch],
      }),
    )

    expect(() => el.dispatchEvent(new TouchEvent('touchcancel'))).not.toThrow()

    slider.destroy()
  })

  test('perpendicular swipe does not trigger navigation', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      swipe: true,
      swipeTolerance: 10,
    })

    const nextSpy = vi.spyOn(slider, 'next')
    const prevSpy = vi.spyOn(slider, 'prev')

    // Move primarily in Y direction (perpendicular to horizontal swipe)
    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [{ clientX: 100, clientY: 100 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchmove', {
        cancelable: true,
        touches: [{ clientX: 102, clientY: 150 } as Touch],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 102, clientY: 150 } as Touch],
      }),
    )

    expect(nextSpy).not.toHaveBeenCalled()
    expect(prevSpy).not.toHaveBeenCalled()

    slider.destroy()
  })

  test('multi-touch start does not track touch', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      swipe: true,
      swipeTolerance: 10,
    })

    const nextSpy = vi.spyOn(slider, 'next')

    // Multi-touch (2 fingers)
    el.dispatchEvent(
      new TouchEvent('touchstart', {
        touches: [
          { clientX: 100, clientY: 100 } as Touch,
          { clientX: 200, clientY: 100 } as Touch,
        ],
      }),
    )

    el.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 200, clientY: 100 } as Touch],
      }),
    )

    expect(nextSpy).not.toHaveBeenCalled()

    slider.destroy()
  })

  test('touchend without tracking does cleanup', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
      swipe: true,
      swipeTolerance: 10,
    })

    // Trigger touchend without a prior touchstart
    expect(() =>
      el.dispatchEvent(
        new TouchEvent('touchend', {
          changedTouches: [{ clientX: 100, clientY: 100 } as Touch],
        }),
      ),
    ).not.toThrow()

    slider.destroy()
  })

  test('el getter throws after destroy', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new FadeSlider(), {
      autoScroll: false,
    })

    slider.destroy()

    expect(() => slider.el).toThrow('Slider element is undefined')
  })

  test('TileSlider works with BoxSlider', async () => {
    const el = createSliderElement()
    Object.defineProperty(el, 'offsetWidth', { value: 400, configurable: true })
    Object.defineProperty(el, 'offsetHeight', {
      value: 300,
      configurable: true,
    })
    el.style.width = '400px'
    el.style.height = '300px'

    const slider = new BoxSlider(el, new TileSlider({ rows: 2 }), {
      autoScroll: false,
      speed: 10,
    })

    await slider.next()
    expect(slider.activeIndex).toBe(1)

    slider.destroy()
  })
})

describe('StateStore', () => {
  test('reverts attributes including empty string values', () => {
    const store = new StateStore()
    const el = document.createElement('div')
    el.dataset.test = ''

    store.storeAttributes([el], ['data-test'])
    el.dataset.test = 'changed'

    store.revert()

    expect(el.dataset.test).toBeUndefined()
  })
})
