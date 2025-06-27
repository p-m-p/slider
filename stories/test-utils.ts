import { expect } from '@storybook/test'
import { defaultOptions } from '~/packages/slider'
import type {
  CarouselSliderElement,
  CubeSliderElement,
  FadeSliderElement,
  SliderElement,
  TileSliderElement,
} from '~/packages/components'
import type {
  CarouselSliderProps,
  FadeSliderProps,
  TileSliderProps,
  CubeSliderProps,
} from '~/packages/react'

export type SliderType = 'bs-carousel' | 'bs-fade' | 'bs-tile' | 'bs-cube'

/**
 * Test slider element selection and basic validation
 */
export function getSliderElement<T extends SliderElement>(
  canvasElement: HTMLElement,
  sliderType: SliderType,
): T {
  return canvasElement.querySelector<T>(sliderType)!
}

/**
 * Test explicitly set properties on slider element
 */
export function testSliderProperties<T, V extends object>(
  slider: T,
  expectedProps: V,
) {
  for (const [prop, expectedValue] of Object.entries({
    ...defaultOptions,
    ...expectedProps,
  })) {
    if (expectedValue !== undefined) {
      expect(slider[prop as keyof T]).toBe(expectedValue)
    }
  }
}

/**
 * Test that slide content is rendered in DOM
 */
export function testSlideContent(canvasElement: HTMLElement) {
  const slides = canvasElement.querySelectorAll('.story-slide')
  expect(slides.length).toBeGreaterThan(0)
}

/**
 * Test cube slider viewport wrapper (cube-specific validation)
 */
export function testCubeViewport(canvasElement: HTMLElement) {
  const viewport = canvasElement.querySelector('div[style*="perspective"]')
  expect(viewport).toBeTruthy()
}

/**
 * Create a complete slider test function for carousel slider
 */
export function createCarouselTest(
  expectedProps: Partial<CarouselSliderProps>,
) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const slider = getSliderElement<CarouselSliderElement>(
      canvasElement,
      'bs-carousel',
    )

    // Test explicitly set properties
    testSliderProperties(slider, expectedProps)

    // Test slide content rendering
    testSlideContent(canvasElement)
  }
}

/**
 * Create a complete slider test function for fade slider
 */
export function createFadeTest(expectedProps: Partial<FadeSliderProps>) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const slider = getSliderElement<FadeSliderElement>(canvasElement, 'bs-fade')

    // Test explicitly set properties
    testSliderProperties(slider, expectedProps)

    // Test slide content rendering
    testSlideContent(canvasElement)
  }
}

/**
 * Create a complete slider test function for tile slider
 */
export function createTileTest(expectedProps: Partial<TileSliderProps>) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const slider = getSliderElement<TileSliderElement>(canvasElement, 'bs-tile')

    // Test explicitly set properties
    testSliderProperties(slider, expectedProps)

    // Test slide content rendering
    testSlideContent(canvasElement)
  }
}

/**
 * Create a complete slider test function for cube slider
 */
export function createCubeTest(expectedProps: Partial<CubeSliderProps>) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const slider = getSliderElement<CubeSliderElement>(canvasElement, 'bs-cube')

    // Test explicitly set properties
    testSliderProperties(slider, expectedProps)

    // Test cube-specific viewport wrapper
    testCubeViewport(canvasElement)

    // Test slide content rendering
    testSlideContent(canvasElement)
  }
}
