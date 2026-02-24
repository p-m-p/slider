import { BoxSlider, CarouselSlider, FadeSlider } from '../src'
import { PauseOnHoverPlugin, TouchGesturePlugin } from '../src/plugins'
import type { Plugin, PluginContext } from '../src/types'

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

describe('Plugin System', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('plugins can be registered via constructor', () => {
    const el = createSliderElement()
    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: vi.fn(),
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])

    expect(plugin.initialize).toHaveBeenCalledTimes(1)
    expect(slider.getPlugin('test-plugin')).toBe(plugin)

    slider.destroy()
  })

  test('plugins can be registered via use()', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new CarouselSlider())
    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: vi.fn(),
      destroy: vi.fn(),
    }

    slider.use(plugin)

    expect(plugin.initialize).toHaveBeenCalledTimes(1)
    expect(slider.getPlugin('test-plugin')).toBe(plugin)

    slider.destroy()
  })

  test('duplicate plugin registration is ignored', () => {
    const el = createSliderElement()
    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: vi.fn(),
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])
    slider.use(plugin)

    expect(plugin.initialize).toHaveBeenCalledTimes(1)

    slider.destroy()
  })

  test('plugins can be removed via unuse()', () => {
    const el = createSliderElement()
    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: vi.fn(),
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])
    slider.unuse('test-plugin')

    expect(plugin.destroy).toHaveBeenCalledTimes(1)
    expect(slider.getPlugin('test-plugin')).toBeUndefined()

    slider.destroy()
  })

  test('plugins are destroyed when slider is destroyed', () => {
    const el = createSliderElement()
    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: vi.fn(),
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])
    slider.destroy()

    expect(plugin.destroy).toHaveBeenCalledTimes(1)
  })

  test('plugin reset() is called when slider is reset', () => {
    const el = createSliderElement()
    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: vi.fn(),
      destroy: vi.fn(),
      reset: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])
    slider.reset()

    expect(plugin.reset).toHaveBeenCalledTimes(1)

    slider.destroy()
  })

  test('plugin context provides access to slider', () => {
    const el = createSliderElement()
    let capturedContext: PluginContext | undefined

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        capturedContext = context
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])

    expect(capturedContext).toBeDefined()
    expect(capturedContext!.slider).toBe(slider)
    expect(capturedContext!.el).toBe(el)
    expect(capturedContext!.slides.length).toBe(3)

    slider.destroy()
  })

  test('plugin listeners are automatically cleaned up on destroy', () => {
    const el = createSliderElement()
    const clickHandler = vi.fn()

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        context.addListener(context.el, 'click', clickHandler)
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])

    el.click()
    expect(clickHandler).toHaveBeenCalledTimes(1)

    slider.destroy()

    el.click()
    expect(clickHandler).toHaveBeenCalledTimes(1)
  })

  test('plugin slider event listeners are automatically cleaned up on destroy', () => {
    const el = createSliderElement()
    const afterHandler = vi.fn()

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        context.on('after', afterHandler)
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), { speed: 10 }, [
      plugin,
    ])

    slider.destroy()
  })
})

describe('PauseOnHoverPlugin', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('pauses slider on pointer enter when auto scrolling', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new CarouselSlider(), { autoScroll: true })

    slider.use(new PauseOnHoverPlugin())

    const pauseSpy = vi.spyOn(slider, 'pause')
    el.dispatchEvent(new PointerEvent('pointerenter'))

    expect(pauseSpy).toHaveBeenCalled()

    slider.destroy()
  })

  test('resumes slider on pointer leave', () => {
    const el = createSliderElement()
    const slider = new BoxSlider(el, new CarouselSlider(), { autoScroll: true })

    slider.use(new PauseOnHoverPlugin())

    el.dispatchEvent(new PointerEvent('pointerenter'))

    const playSpy = vi.spyOn(slider, 'play')
    el.dispatchEvent(new PointerEvent('pointerleave'))

    expect(playSpy).toHaveBeenCalled()

    slider.destroy()
  })
})

describe('TouchGesturePlugin', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('triggers prev on right swipe', async () => {
    const el = createSliderElement()
    const slider = new BoxSlider(
      el,
      new FadeSlider(),
      { autoScroll: false, speed: 10, startIndex: 1 },
      [new TouchGesturePlugin({ threshold: 10 })],
    )

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
    const slider = new BoxSlider(
      el,
      new FadeSlider(),
      { autoScroll: false, speed: 10 },
      [new TouchGesturePlugin({ threshold: 10 })],
    )

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
    const slider = new BoxSlider(el, new FadeSlider(), { autoScroll: false }, [
      new TouchGesturePlugin({ threshold: 100 }),
    ])

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
})

describe('Progressive Transitions', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('CarouselSlider supports progressive transitions', () => {
    const effect = new CarouselSlider()
    expect(effect.supportsProgressiveTransition).toBe(true)
  })

  test('FadeSlider does not support progressive transitions', () => {
    const effect = new FadeSlider()
    expect(effect.supportsProgressiveTransition).toBeUndefined()
  })

  test('requestProgressiveTransition returns null for non-supporting effects', () => {
    const el = createSliderElement()
    let capturedContext: PluginContext | undefined

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        capturedContext = context
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new FadeSlider(), {}, [plugin])

    const controller = capturedContext!.requestProgressiveTransition('next')
    expect(controller).toBeNull()

    slider.destroy()
  })

  test('requestProgressiveTransition returns controller for supporting effects', () => {
    const el = createSliderElement()
    let capturedContext: PluginContext | undefined

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        capturedContext = context
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])

    const controller = capturedContext!.requestProgressiveTransition('next')
    expect(controller).not.toBeNull()
    expect(controller!.nextIndex).toBe(1)

    controller!.abort()

    slider.destroy()
  })

  test('progressive transition setProgress updates position', () => {
    const el = createSliderElement()
    let capturedContext: PluginContext | undefined

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        capturedContext = context
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), {}, [plugin])

    const controller = capturedContext!.requestProgressiveTransition('next')

    controller!.setProgress(0.5)
    expect(controller!.progress).toBe(0.5)

    controller!.abort()

    slider.destroy()
  })

  test('progressive transition complete updates active index', async () => {
    const el = createSliderElement()
    let capturedContext: PluginContext | undefined

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        capturedContext = context
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), { speed: 10 }, [
      plugin,
    ])

    const controller = capturedContext!.requestProgressiveTransition('next')

    controller!.setProgress(0.9)
    await controller!.complete()

    expect(slider.activeIndex).toBe(1)

    slider.destroy()
  })

  test('progressive transition cancel keeps original index', async () => {
    const el = createSliderElement()
    let capturedContext: PluginContext | undefined

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        capturedContext = context
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(el, new CarouselSlider(), { speed: 10 }, [
      plugin,
    ])

    const controller = capturedContext!.requestProgressiveTransition('next')

    controller!.setProgress(0.2)
    await controller!.cancel()

    expect(slider.activeIndex).toBe(0)

    slider.destroy()
  })

  test('requestProgressiveTransition returns null at boundary without loop', () => {
    const el = createSliderElement()
    let capturedContext: PluginContext | undefined

    const plugin: Plugin = {
      name: 'test-plugin',
      initialize: (context) => {
        capturedContext = context
      },
      destroy: vi.fn(),
    }

    const slider = new BoxSlider(
      el,
      new CarouselSlider(),
      { loop: false, startIndex: 0 },
      [plugin],
    )

    const controller = capturedContext!.requestProgressiveTransition('prev')
    expect(controller).toBeNull()

    slider.destroy()
  })
})
