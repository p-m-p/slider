---
title: Accessibility
---

The easiest way to make the slider accessible is to use the [Slider Controls](/docs/guides/slider-controls)
component with the default controls. The controls implement the
[WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) for carousels.

If you are using the core JavaScript library directly or building your own control you will need to add
some appropriate attributes to the slider and slide elements.

The slider element will automatically be given a `role` of `region` if no other value is set, applied with the
`aria-live="off"` attribute when in the autoScroll state and `aria-live="polite"` when slide
transitions are being controlled externally. Each slide is given the `aria-roledescription="slide"`
attribute and the `role` of `group` if these area not already set. You will need to add
`aria-roledescription="carousel"` to the container housing the slider and it's controls. An example
implementation is shown below.

```html
<section class="carousel" aria-roledescription="carousel">
  <div class="slider-controls">
    <button id="prev-slide" aria-controls="demo-slider">Previous slide</button>
    <button id="next-slide" aria-controls="demo-slider">Next slide</button>
    <button id="play" aria-controls="demo-slider">Play</button>
  </div>

  <div class="slider" id="demo-slider" role="region">
    <figure class="slide" role="group">
      <img src="happy-face.jpg" alt="A young boy with a smile on his face" />
      <figcaption>Happy</figcaption>
    </figure>
    <figure class="slide" role="group">
      <img
        src="sad-face.jpg"
        alt="An elderly lady with a sad look on her face" />
      <figcaption>Sad</figcaption>
    </figure>
    <figure class="slide" role="group">
      <img
        src="shocked-face.jpg"
        alt="A man with a look of shock on his face" />
      <figcaption>Shocked</figcaption>
    </figure>
  </div>
</section>

<script type="module">
  import { createFadeSlider } from 'https://cdn.jsdelivr.net/npm/@boxslider/slider/+esm'

  const slider = createFadeSlider('#demo-slider', { autoScroll: false })

  document
    .getElementById('prev-slide')
    .addEventListener('click', () => slider.prev())
  // ... other button controls
</script>
```

## Reduced motion

If the user has requested reduced motion in their operating system or browser settings then the `autoScroll` option should be set to `false`
on page load to prevent the slider from automatically scrolling. The default configuration value for `autoScroll` is determined from the
`prefers-reduced-motion` media query. You may also want to set the `speed` option to `0` to prevent slide transitions from animating.

```js
const hasReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches

const slider = createFadeSlider('#demo-slider', {
  autoScroll: !hasReducedMotion,
  speed: hasReducedMotion ? 0 : 300,
})
```
