---
title: Custom Effect
---

:::note
The examples provided here are for illustrative purposes and may not be
suitable for production use. You should consider browser compatibility,
accessibility and performance when creating custom effects.
:::

It's possible to create your own custom effects for BoxSlider with an object that
implements the slide [Effect interface](https://github.com/p-m-p/slider/blob/main/packages/slider/src/types.ts).

## Effect Interface

An effect must implement the following interface:

```typescript
interface Effect {
  // Optional: specify 'vertical' for vertical swipe gestures
  readonly swipeDirection?: 'horizontal' | 'vertical'

  // Set the initial state of slides
  initialize(
    el: HTMLElement,
    slides: HTMLElement[],
    options: BoxSliderOptions,
    stateStore: StateStore,
  ): void

  // Prepare and return a transition controller
  prepareTransition(
    settings: TransitionSettings,
  ): ProgressiveTransitionState | null

  // Optional: clean up when slider is destroyed
  destroy?(el: HTMLElement, slides: HTMLElement[]): void
}
```

## Simple Example

For a basic effect where slide visibility is controlled by CSS `display`, use the
`createProgressiveTransition` helper to create the required state controller:

```js
import { createProgressiveTransition } from '@boxslider/slider'

const effect = {
  initialize(el, slides, options) {
    slides.forEach((slide, index) =>
      slide.style.setProperty(
        'display',
        index === options.startIndex ? 'block' : 'none',
      ),
    )
  },

  prepareTransition({ slides, currentIndex, nextIndex, speed }) {
    const currentSlide = slides[currentIndex]
    const nextSlide = slides[nextIndex]

    return createProgressiveTransition({
      elements: [currentSlide, nextSlide],
      speed,
      onComplete: async () => {
        currentSlide.style.setProperty('display', 'none')
        nextSlide.style.setProperty('display', 'block')
      },
      onFinish: () => {
        currentSlide.style.setProperty('display', 'none')
        nextSlide.style.setProperty('display', 'block')
      },
      onReset: () => {
        currentSlide.style.setProperty('display', 'block')
        nextSlide.style.setProperty('display', 'none')
      },
    })
  },
}
```

The effect object is passed to the `BoxSlider` constructor as the second argument.

```js
import { BoxSlider } from '@boxslider/slider'

const slider = new BoxSlider(document.getElementById('slider'), effect)
```

## Progressive Transition Callbacks

The `createProgressiveTransition` helper accepts the following optional callbacks:

| Callback                                      | Description                                                             |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| `onProgress(progress)`                        | Called during drag with progress value (0-1). Update visual state here. |
| `onComplete(fromProgress, remainingDuration)` | Animate to completion from current progress.                            |
| `onCancel(fromProgress, remainingDuration)`   | Animate back to start position.                                         |
| `onFinish()`                                  | Set final state after transition completes.                             |
| `onReset()`                                   | Reset to initial state after cancel/abort.                              |

All callbacks are optional - only implement those needed for your effect.

## Animated Effect with Progressive Drag

For effects that animate and support progressive drag transitions, implement
`onProgress` to update the visual state as the user drags:

```js
import { createProgressiveTransition } from '@boxslider/slider'

const effect = {
  initialize(el, slides, options) {
    el.style.setProperty('position', 'relative')

    slides.forEach((slide, index) => {
      slide.style.setProperty('position', 'absolute')
      slide.style.setProperty('inset', '0')
      slide.style.setProperty(
        'opacity',
        index === options.startIndex ? '1' : '0',
      )
    })
  },

  prepareTransition({ slides, currentIndex, nextIndex, speed }) {
    const currentSlide = slides[currentIndex]
    const nextSlide = slides[nextIndex]

    // Set initial state for transition
    currentSlide.style.setProperty('opacity', '1')
    nextSlide.style.setProperty('opacity', '0')

    return createProgressiveTransition({
      elements: [currentSlide, nextSlide],
      speed,

      // Update visuals as user drags (progress: 0-1)
      onProgress: (progress) => {
        currentSlide.style.setProperty('opacity', String(1 - progress))
        currentSlide.style.setProperty(
          'transform',
          `scale(${1 - progress * 0.1})`,
        )
        nextSlide.style.setProperty('opacity', String(progress))
        nextSlide.style.setProperty(
          'transform',
          `scale(${0.9 + progress * 0.1})`,
        )
      },

      // Animate to completion when drag ends past threshold
      onComplete: async (fromProgress, remainingDuration) => {
        await Promise.all([
          currentSlide.animate(
            {
              opacity: [String(1 - fromProgress), '0'],
              transform: [`scale(${1 - fromProgress * 0.1})`, 'scale(0.9)'],
            },
            { duration: remainingDuration, fill: 'forwards' },
          ).finished,
          nextSlide.animate(
            {
              opacity: [String(fromProgress), '1'],
              transform: [`scale(${0.9 + fromProgress * 0.1})`, 'scale(1)'],
            },
            { duration: remainingDuration, fill: 'forwards' },
          ).finished,
        ])
      },

      // Animate back to start when drag is cancelled
      onCancel: async (fromProgress, remainingDuration) => {
        await Promise.all([
          currentSlide.animate(
            {
              opacity: [String(1 - fromProgress), '1'],
              transform: [`scale(${1 - fromProgress * 0.1})`, 'scale(1)'],
            },
            { duration: remainingDuration, fill: 'forwards' },
          ).finished,
          nextSlide.animate(
            {
              opacity: [String(fromProgress), '0'],
              transform: [`scale(${0.9 + fromProgress * 0.1})`, 'scale(0.9)'],
            },
            { duration: remainingDuration, fill: 'forwards' },
          ).finished,
        ])
      },

      // Set final state
      onFinish: () => {
        currentSlide.getAnimations().forEach((a) => a.cancel())
        nextSlide.getAnimations().forEach((a) => a.cancel())
        currentSlide.style.setProperty('opacity', '0')
        currentSlide.style.setProperty('transform', 'scale(0.9)')
        nextSlide.style.setProperty('opacity', '1')
        nextSlide.style.setProperty('transform', 'scale(1)')
      },

      // Reset to initial state
      onReset: () => {
        currentSlide.getAnimations().forEach((a) => a.cancel())
        nextSlide.getAnimations().forEach((a) => a.cancel())
        currentSlide.style.setProperty('opacity', '1')
        currentSlide.style.setProperty('transform', 'scale(1)')
        nextSlide.style.setProperty('opacity', '0')
        nextSlide.style.setProperty('transform', 'scale(0.9)')
      },
    })
  },

  destroy(el, slides) {
    slides.forEach((slide) => {
      slide.getAnimations().forEach((animation) => animation.cancel())
    })
  },
}
```

## Vertical Swipe Direction

For effects that should respond to vertical swipe gestures instead of horizontal,
add the `swipeDirection` property:

```js
const verticalEffect = {
  get swipeDirection() {
    return 'vertical'
  },

  initialize(el, slides, options) {
    // ...
  },

  prepareTransition(settings) {
    // ...
  },
}
```

## Custom Web Component

To use a custom effect as a web component, define an element that extends the `Slider` class and call the `init`
method with the effect object from the `connectedCallback` method.

```js
import { Slider } from '@boxslider/components'

class CustomSlider extends Slider {
  connectedCallback() {
    this.init(effect)
  }
}

customElements.define('my-slider', CustomSlider)
```

The custom slider element can now be used standalone in HTML or be combined with the
[slider controls](/docs/guides/slider-controls).

```html
<bs-slider-controls>
  <my-slider speed="300" auto-scroll="false">
    <div>Slide one</div>
    <div>Slide two</div>
    <div>Slide three</div>
  </my-slider>
</bs-slider-controls>
```

Check out the result!

import { CustomEffect } from '@site/src/components/Examples'

<CustomEffect />
