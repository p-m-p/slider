import { expect } from '@storybook/test'
import { defaultOptions } from '~/packages/slider'
import type { SliderElement } from '~/packages/components'

export function createPlayFn<T extends keyof JSX.IntrinsicElements>(
  selector: T,
  expectedProps: JSX.IntrinsicElements[T],
) {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const slider = canvasElement.querySelector<SliderElement>(selector)!
    const slides = [...slider.children].filter((s) =>
      s.classList.contains('story-slide'),
    )

    for (const [prop, expectedValue] of Object.entries({
      ...defaultOptions,
      ...expectedProps,
    })) {
      expect(slider[prop as keyof typeof slider], `slider.${prop}`).toBe(
        expectedValue,
      )
    }

    expect(slides).toHaveLength(slider.slider!.length)
  }
}
