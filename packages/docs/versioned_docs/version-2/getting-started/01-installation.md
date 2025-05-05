---
title: Installation
---

The BoxSlider library is available as React components, Web Components and
as a core JavaScript/TypeScript library.

## React

The React components package can be installed via NPM. See the [React guide](/docs/guides/react)
for detailed instructions.

```sh
npm install --save @boxslider/react
```

## Web Components

The Web components package can also be installed via NPM or used directly from a CDN. See the
[Web Components guide](/docs/guides/web-components) for detailed instructions.

Install via NPM

```sh
npm install --save @boxslider/components
```

Use from CDN

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>

<bs-slider-controls>
  <bs-carousel speed="300">
    <div class="slide">Slide one</div>
    <div class="slide">Slide tow</div>
    <div class="slide">Slide three</div>
  </bs-carousel>
</bs-slider-controls>
```

## JavaScript

The core slider package can be installed via NPM or used directly from a CDN. See the
[JavaScript guide](/docs/guides/javascript) for detailed instructions.

Install from NPM

```sh
npm install --save @boxslider/slider
```

Use directly from a CDN

```html
<script type="module">
  import {
    BoxSlider,
    FadeSlider,
  } from 'https://cdn.jsdelivr.net/npm/@boxslider/slider/+esm'

  const slider = new BoxSlider(
    document.getElementById('slider'),
    new FadeSlider(),
  )
</script>
```
