import { getByText, waitFor } from '@testing-library/dom'
import type { SliderElement } from '../Slider'
import '..'

export function createSliderElement(
  tagName: string,
  attributes: Record<string, string>,
) {
  const el = document.createElement(tagName) as SliderElement
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

  return el
}

test('attribute values and props', () => {
  const autoScroll = false
  const pauseOnHover = false
  const speed = 500
  const startIndex = 1
  const swipe = false
  const swipeTolerance = 100
  const timeout = 5000

  const el = createSliderElement('bs-carousel', {
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
  const resetSpy = vi.spyOn(slider, 'reset')

  el.setAttribute('auto-scroll', '')
  expect(resetSpy.mock.calls[0][0]).toEqual({ autoScroll: true })

  el.setAttribute('pause-on-hover', 'true')
  expect(resetSpy.mock.calls[1][0]).toEqual({ pauseOnHover: true })

  el.setAttribute('speed', '2000')
  expect(resetSpy.mock.calls[2][0]).toEqual({ speed: 2000 })

  el.setAttribute('start-index', '2')
  expect(resetSpy.mock.calls[3][0]).toEqual({ startIndex: 2 })

  el.setAttribute('swipe', '')
  expect(resetSpy.mock.calls[4][0]).toEqual({ swipe: true })

  el.setAttribute('swipe-tolerance', '50')
  expect(resetSpy.mock.calls[5][0]).toEqual({ swipeTolerance: 50 })

  el.setAttribute('timeout', '850')
  expect(resetSpy.mock.calls[6][0]).toEqual({ timeout: 850 })
})

test('slide transition', async () => {
  const nextIndex = 2
  const speed = 10
  const el = createSliderElement('bs-carousel', {
    'auto-scroll': 'false',
    speed: `${speed}`,
  })

  expect(getByText(el, 'Slide one')).toBeVisible()
  expect(getByText(el, 'Slide two')).not.toBeVisible()
  expect(getByText(el, 'Slide three')).not.toBeVisible()
  expect(getByText(el, 'Slide four')).not.toBeVisible()

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
    expect(getByText(el, 'Slide three')).toBeVisible()
    expect(getByText(el, 'Slide one')).not.toBeVisible()
    expect(getByText(el, 'Slide two')).not.toBeVisible()
    expect(getByText(el, 'Slide four')).not.toBeVisible()
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
