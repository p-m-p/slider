---
title: Custom Effect
---

:::note
The examples provided here are for illustrative purposes and may not be
suitable for production use. You should consider browser compatibility,
accessibility and performance when creating custom effects.
:::

It's possible to create your own custom effects for BoxSlider with an object that
implements the slide [Effect interface](https://github.com/p-m-p/slider/blob/main/packages/slider/src/types.ts#L128).

Considering an example where the slide visibility is controlled by the CSS `display` property,
the `initialize` method sets the initial display value of all slides and the `transition` method
updates the display setting of the current and next slide so that the next slide is made visible.

```js
const effect = {
  initialize(el, slides, options) {
    slides.forEach((slide, index) =>
      slide.style.setProperty(
        'display',
        index === options.startIndex ? 'block' : 'none',
      ),
    )
  },

  transition({ currentIndex, nextIndex }) {
    this.slides[currentIndex].style.setProperty('display', 'none')
    this.slides[nextIndex].style.setProperty('display', 'block')
  },
}
```

The effect object is passed to the `BoxSlider` constructor as the second argument.

```js
import { BoxSlider } from '@boxslider/slider'

const slider = new BoxSlider(document.getElementById('slider'), effect)
```

## Animation

An effect that animates the slide transition should return a promise that resolves when the animation
is finished. The animation speed is determined from the `speed` option set in the slider options that
is provided in the transition settings passed to the `transition` method.

```js
const effect = {
  initialize(el, slides, options) {
    el.style.setProperty('position', 'relative')

    slides.forEach((slide, index) => {
      slide.style.setProperty('position', 'absolute')
      slide.style.setProperty(
        'opacity',
        index === options.startIndex ? '1' : '0',
      )
    })
  },

  async transition({ slides, speed, currentIndex, nextIndex }) {
    const animateOut = slides[currentIndex].animate(
      { opacity: [1, 0], transform: ['scale(1)', 'scale(0.9)'] },
      { duration: speed, fill: 'forwards' },
    )
    const animateIn = slides[nextIndex].animate(
      { opacity: [0, 1], transform: ['scale(0.9)', 'scale(1)'] },
      { duration: speed, fill: 'forwards' },
    )

    await Promise.all([animateIn.finished, animateOut.finished])
  },
}
```

## Destroying the effect

When a slider is destroyed via the `destroy` method any style properties applied by the effect to the slider
and slide elements will be either reset to their original values or removed by the `BoxSlider` object.
If the effect has any clean up to perform then a `destroy` method can be added to the effect object.

In the animation example the animations will persist on the slide elements after the slider is destroyed due
to the `fill` setting of 'forwards'. These animations can be cancelled in the `destroy` method.

```js
destroy(el, slides) {
  slides.forEach((slide) => {
    slide.getAnimations().forEach((animation) => animation.cancel())
  })
}
```

## Custom web component

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
