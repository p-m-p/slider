---
title: Accessibility
---

The slider will be applied with the `aria-live="off"` attribute when it is the autoScroll state and `aria-live="polite"`
when slide transitions are being controlled externally. Each slide is given the `aria-roledescription="slide"` attribute
but you will need to add `aria-roledescription="carousel"` to the container housing the slider and it's controls. An
example implementation is shown below.

```html
<section class="carousel" aria-roledescription="carousel">
  <div class="slider-controls">
    <button id="prev-slide" aria-controls="demo-slider">Previous slide</button>
    <button id="next-slide" aria-controls="demo-slider">Next slide</button>
    <button id="play" aria-controls="demo-slider">Play</button>
  </div>

  <div class="slider" id="demo-slider">
    <figure class="slide">
      <picture>
        <source srcset="happy-face-680.jpg" media="(min-width: 800px)" />
        <img src="happy-face.jpg" alt="Young boy with a smile on his face" />
      </picture>
    </figure>
    <figure class="slide">
      <img src="sad-face.jpg" alt="Old lady with a sad look on her face" />
    </figure>
    <figure class="slide">
      <img src="shocked-face.jpg" alt="Lady with a look of shock on her face" />
    </figure>
  </div>
</section>

<script>
  const slider = new BoxSlider(
    document.getElementById('demo-slider'),
    new CarouselSlider(),
    {
      autoScroll: false,
    },
  )

  document
    .getElementById('prev-slide')
    .addEventListener('click', () => slider.prev())
  // ... other button controls
</script>
```
