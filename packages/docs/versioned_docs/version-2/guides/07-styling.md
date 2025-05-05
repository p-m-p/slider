---
title: Styling
---

The minimum styles required to get the slider working are the `width` and `height` properties.
The slider element will also need to have a block content layout with a `display` value of
`block`, `grid` or `flex`. The slides inside the slider element should have an equal width
and height that is easily achieved by setting the `width` and `height` properties to `100%`.

```html
<style>
  .slider {
    height: 400px;
    width: 800px;
  }

  .slide {
    height: 100%;
    width: 100%;
  }
</style>

<div class="slider">
  <div class="slide">Slide one</div>
  <div class="slide">Slide two</div>
  <div class="slide">Slide three</div>
</div>
```

## Responsive design

The slider will react to changes in the size of the slider element if the page size or display
orientation changes. Set the width and height of the slider element within a media or container
query to suit your design.

```css
.slider {
  height: 400px;
  width: 800px;
}

.slide {
  height: 100%;
  width: 100%;
}

@media (width < 600px) {
  .slider {
    height: 200px;
    width: 400px;
  }
}
```

## Avoiding cumulative layout shift

To avoid a cumulative layout shift (CLS) when the page is first rendered and the slider is yet to
be initialised you can style the slides so that they do not overflow the slider element.

```css
.slider {
  height: 400px;
  position: relative;
  width: 800px;
}

.slide {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
}

/* Have the first slide visible */
.slide:first-child {
  z-index: 2;
}
```
