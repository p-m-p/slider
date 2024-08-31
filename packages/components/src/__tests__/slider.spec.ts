import {
  FadeSlider,
  TileSlider,
  type CarouselSlider,
  type CubeSlider,
} from '@boxslider/slider'
import { getByText, waitFor } from '@testing-library/dom'
import type { MockInstance } from 'vitest'
import type { SliderElement } from '../Slider'
import type {
  CarouselSliderElement,
  CubeSliderElement,
  FadeSliderElement,
  TileSliderElement,
} from '..'

import '..'

export function createSliderElement<T extends SliderElement>(
  tagName: string,
  attributes: Record<string, string>,
): T {
  const el = document.createElement(tagName)
  const viewport = document.createElement('div')

  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value)
  })

  el.innerHTML = `
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
    <div>Slide four</div>
  `

  viewport.appendChild(el)
  document.body.appendChild(viewport)

  return el as T
}

function testEffectProps<T extends SliderElement>(
  tag: 'bs-carousel' | 'bs-cube' | 'bs-fade' | 'bs-tile',
  propAssertions: (spy: MockInstance, el: T) => void,
) {
  const autoScroll = false
  const pauseOnHover = false
  const speed = 500
  const startIndex = 1
  const swipe = false
  const swipeTolerance = 100
  const timeout = 5000

  const el = createSliderElement<T>(tag, {
    'auto-scroll': `${autoScroll}`,
    'pause-on-hover': `${pauseOnHover}`,
    'start-index': `${startIndex}`,
    speed: `${speed}`,
    swipe: `${swipe}`,
    'swipe-tolerance': `${swipeTolerance}`,
    timeout: `${timeout}`,
  })

  expect(el.autoScroll).toBeFalsy()
  expect(el.pauseOnHover).toBeFalsy()
  expect(el.speed).toBe(speed)
  expect(el.startIndex).toBe(startIndex)
  expect(el.swipe).toBeFalsy()
  expect(el.swipeTolerance).toBe(swipeTolerance)
  expect(el.timeout).toBe(timeout)

  const slider = el.slider!

  vi.spyOn(slider, 'play')
  el.setAttribute('auto-scroll', '')
  expect(el.autoScroll).toBe(true)
  expect(slider.play).toHaveBeenCalled()

  vi.spyOn(slider, 'pause')
  el.autoScroll = false
  expect(el.autoScroll).toBe(false)
  expect(slider.pause).toHaveBeenCalled()

  const resetSpy = vi.spyOn(slider, 'reset')

  el.setAttribute('pause-on-hover', 'true')
  expect(resetSpy.mock.calls[0][0]).toEqual({ pauseOnHover: true })
  el.pauseOnHover = false
  expect(resetSpy.mock.calls[1][0]).toEqual({ pauseOnHover: false })

  resetSpy.mockClear()

  el.setAttribute('speed', '2000')
  expect(resetSpy.mock.calls[0][0]).toEqual({ speed: 2000 })
  el.speed = 3000
  expect(resetSpy.mock.calls[1][0]).toEqual({ speed: 3000 })

  resetSpy.mockClear()

  el.setAttribute('start-index', '2')
  expect(resetSpy.mock.calls[0][0]).toEqual({ startIndex: 2 })
  el.startIndex = 1
  expect(resetSpy.mock.calls[1][0]).toEqual({ startIndex: 1 })

  resetSpy.mockClear()

  el.setAttribute('swipe', '')
  expect(resetSpy.mock.calls[0][0]).toEqual({ swipe: true })
  el.swipe = false
  expect(resetSpy.mock.calls[1][0]).toEqual({ swipe: false })

  resetSpy.mockClear()

  el.setAttribute('swipe-tolerance', '50')
  expect(resetSpy.mock.calls[0][0]).toEqual({ swipeTolerance: 50 })
  el.swipeTolerance = 100
  expect(resetSpy.mock.calls[1][0]).toEqual({ swipeTolerance: 100 })

  resetSpy.mockClear()

  el.setAttribute('timeout', '850')
  expect(resetSpy.mock.calls[0][0]).toEqual({ timeout: 850 })
  el.timeout = 300
  expect(resetSpy.mock.calls[1][0]).toEqual({ timeout: 300 })

  resetSpy.mockClear()

  propAssertions(resetSpy, el)
}

test('carousel attributes and props', () => {
  testEffectProps<CarouselSliderElement>('bs-carousel', (resetSpy, el) => {
    expect(el.timingFunction).toBe('ease-out')
    expect(el.cover).toBeFalsy()

    el.setAttribute('cover', 'false')
    expect((resetSpy.mock.calls[0][1] as CarouselSlider).options).toEqual({
      cover: false,
      timingFunction: 'ease-out',
    })
    el.cover = true
    expect((resetSpy.mock.calls[1][1] as CarouselSlider).options).toEqual({
      cover: true,
      timingFunction: 'ease-out',
    })

    el.setAttribute('timing-function', 'ease-in')
    expect((resetSpy.mock.calls[2][1] as CarouselSlider).options).toEqual({
      cover: true,
      timingFunction: 'ease-in',
    })
    el.timingFunction = 'ease-in-out'
    expect((resetSpy.mock.calls[3][1] as CarouselSlider).options).toEqual({
      cover: true,
      timingFunction: 'ease-in-out',
    })
  })
})

test('cube attributes and props', () => {
  testEffectProps<CubeSliderElement>('bs-cube', (resetSpy, el) => {
    expect(el.direction).toBe('horizontal')
    expect(el.perspective).toBe(1000)

    el.setAttribute('direction', 'vertical')
    expect((resetSpy.mock.calls[0][1] as CubeSlider).options).toEqual({
      direction: 'vertical',
      perspective: 1000,
    })
    el.direction = 'horizontal'
    expect((resetSpy.mock.calls[1][1] as CubeSlider).options).toEqual({
      direction: 'horizontal',
      perspective: 1000,
    })

    el.setAttribute('perspective', '2000')
    expect((resetSpy.mock.calls[2][1] as CubeSlider).options).toEqual({
      direction: 'horizontal',
      perspective: 2000,
    })
    el.perspective = 900
    expect((resetSpy.mock.calls[3][1] as CubeSlider).options).toEqual({
      direction: 'horizontal',
      perspective: 900,
    })
  })
})

test('fade attributes and props', () => {
  testEffectProps<FadeSliderElement>('bs-fade', (resetSpy, el) => {
    expect(el.timingFunction).toBe('ease-in-out')

    el.setAttribute('timing-function', 'ease-in')
    expect((resetSpy.mock.calls[0][1] as FadeSlider).options).toEqual({
      timingFunction: 'ease-in',
    })
    el.timingFunction = 'ease-out'
    expect((resetSpy.mock.calls[1][1] as FadeSlider).options).toEqual({
      timingFunction: 'ease-out',
    })
  })
})

test('tile attributes and props', () => {
  testEffectProps<TileSliderElement>('bs-tile', (resetSpy, el) => {
    expect(el.rowOffset).toBe(50)
    expect(el.rows).toBe(8)
    expect(el.tileEffect).toBe('flip')

    el.setAttribute('rows', '4')
    expect((resetSpy.mock.calls[0][1] as TileSlider).options).toEqual({
      rowOffset: 50,
      rows: 4,
      tileEffect: 'flip',
    })
    el.rows = 10
    expect((resetSpy.mock.calls[1][1] as TileSlider).options).toEqual({
      rowOffset: 50,
      rows: 10,
      tileEffect: 'flip',
    })

    el.setAttribute('row-offset', '100')
    expect((resetSpy.mock.calls[2][1] as TileSlider).options).toEqual({
      rowOffset: 100,
      rows: 10,
      tileEffect: 'flip',
    })
    el.rowOffset = 20
    expect((resetSpy.mock.calls[3][1] as TileSlider).options).toEqual({
      rowOffset: 20,
      rows: 10,
      tileEffect: 'flip',
    })

    el.setAttribute('tile-effect', 'fade')
    expect((resetSpy.mock.calls[4][1] as TileSlider).options).toEqual({
      rowOffset: 20,
      rows: 10,
      tileEffect: 'fade',
    })
    el.tileEffect = 'flip'
    expect((resetSpy.mock.calls[5][1] as TileSlider).options).toEqual({
      rowOffset: 20,
      rows: 10,
      tileEffect: 'flip',
    })
  })
})

test('slide transition', async () => {
  const nextIndex = 2
  const speed = 10
  const el = createSliderElement('bs-carousel', {
    'auto-scroll': 'false',
    speed: `${speed}`,
  })

  expect(getByText(el, 'Slide one')).toHaveAttribute('aria-hidden', 'false')
  expect(getByText(el, 'Slide two')).toHaveAttribute('aria-hidden', 'true')
  expect(getByText(el, 'Slide three')).toHaveAttribute('aria-hidden', 'true')
  expect(getByText(el, 'Slide four')).toHaveAttribute('aria-hidden', 'true')

  const beforeHandler = vi.fn()
  const afterHandler = vi.fn()
  el.addEventListener('before', beforeHandler)
  el.addEventListener('after', afterHandler)

  el.slider?.skipTo(nextIndex)

  await waitFor(() => {
    expect(beforeHandler).toHaveBeenCalledWith(
      new CustomEvent('before', {
        detail: {
          currentIndex: 0,
          nextIndex,
          speed,
        },
      }),
    )
    expect(getByText(el, 'Slide one')).toHaveAttribute('aria-hidden', 'true')
    expect(getByText(el, 'Slide two')).toHaveAttribute('aria-hidden', 'true')
    expect(getByText(el, 'Slide three')).toHaveAttribute('aria-hidden', 'false')
    expect(getByText(el, 'Slide four')).toHaveAttribute('aria-hidden', 'true')
    expect(afterHandler).toHaveBeenCalledWith(
      new CustomEvent('after', {
        detail: {
          currentIndex: nextIndex,
          nextIndex: 3,
          speed,
        },
      }),
    )
  })
})
