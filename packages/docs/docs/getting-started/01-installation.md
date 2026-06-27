---
title: Installation
---

import { CopyPrompt } from '@site/src/components/CopyPrompt'

The BoxSlider library is available as React components, Web Components and
as a core JavaScript/TypeScript library.

## React

The React components package can be installed via NPM. See the [React guide](/docs/guides/react)
for detailed instructions.

```sh
npm install --save @boxslider/react
```

<CopyPrompt
prompt={`Help me install and set up @boxslider/react in my project.

Install command: npm install --save @boxslider/react

Please provide a quick start example showing:

- A basic carousel slider using the CarouselSlider component
- Navigation controls using SliderControls
- The minimum required CSS to make the slider display correctly`}
  />

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

<CopyPrompt
prompt={`Help me install and set up @boxslider/components (BoxSlider Web Components) in my project.

Install command: npm install --save @boxslider/components
Or use from CDN: <script type="module" src="https://cdn.jsdelivr.net/npm/@boxslider/components/+esm"></script>

Please provide a quick start example showing:

- A basic carousel slider using the bs-carousel web component
- Navigation controls using bs-slider-controls
- The minimum required CSS to make the slider display correctly`}
  />

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
  import { createFadeSlider } from 'https://cdn.jsdelivr.net/npm/@boxslider/slider/+esm'

  const slider = createFadeSlider('#slider')
</script>
```

<CopyPrompt
prompt={`Help me install and set up @boxslider/slider (BoxSlider JavaScript library) in my project.

Install command: npm install --save @boxslider/slider
Or import from CDN: import { createFadeSlider } from 'https://cdn.jsdelivr.net/npm/@boxslider/slider/+esm'

Please provide a quick start example showing:

- The required HTML structure for a carousel slider
- Creating the slider using createCarouselSlider
- The minimum required CSS to make the slider display correctly`}
  />
