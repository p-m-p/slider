import { expect } from '@storybook/test'
import { defaultOptions } from '~/packages/slider'
import type { SliderElement } from '~/packages/components'

export type SliderElementName =
  | 'bs-carousel'
  | 'bs-fade'
  | 'bs-tile'
  | 'bs-cube'

export function testSliderProperties<T, V extends object>(
  slider: T,
  expectedProps: V,
) {
  for (const [prop, expectedValue] of Object.entries({
    ...defaultOptions,
    ...expectedProps,
  })) {
    expect(slider[prop as keyof T]).toBe(expectedValue)
  }
}

export function testSlideContent(canvasElement: HTMLElement) {
  const slides = canvasElement.querySelectorAll('.story-slide')
  expect(slides.length).toBeGreaterThan(0)
}

export function createPlayFn<T extends SliderElementName, V extends object>(
  selector: T,
  expectedProps: V,
) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const slider = canvasElement.querySelector<SliderElement>(selector)!

    testSliderProperties(slider, expectedProps)
    testSlideContent(canvasElement)
  }
}
