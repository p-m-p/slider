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

<details>
  <summary>Copy AI coding agent prompt: React install + setup</summary>

```text
Install @boxslider/react and set up a minimal React slider example in this project.
Requirements:
- Use npm and add @boxslider/react as a dependency.
- Create or update one React component that renders SliderControls with CarouselSlider and three sample slides.
- Add minimal inline styles so the slider has visible width/height.
- Return a short summary of changed files and what to run to verify.
```

</details>

## Web Components

The Web components package can also be installed via NPM or used directly from a CDN. See the
[Web Components guide](/docs/guides/web-components) for detailed instructions.

Install via NPM

```sh
npm install --save @boxslider/components
```

<details>
  <summary>Copy AI coding agent prompt: Web Components install + setup</summary>

```text
Install @boxslider/components and set up a minimal Web Components slider example in this project.
Requirements:
- Use npm and add @boxslider/components as a dependency.
- Import @boxslider/components from one entry file.
- Add bs-slider-controls with bs-carousel and three sample slides.
- Add minimal CSS so the slider has visible width/height.
- Return a short summary of changed files and how to run it.
```

</details>

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

<details>
  <summary>Copy AI coding agent prompt: JavaScript install + setup</summary>

```text
Install @boxslider/slider and set up a minimal JavaScript slider example in this project.
Requirements:
- Use npm and add @boxslider/slider as a dependency.
- Create slider markup with three slides and initialize createCarouselSlider (or createFadeSlider).
- Include basic options (for example speed) and keep code production-safe.
- Add minimal CSS so the slider has visible width/height.
- Return a short summary of changed files and local run/verify steps.
```

</details>

Use directly from a CDN

```html
<script type="module">
  import { createFadeSlider } from 'https://cdn.jsdelivr.net/npm/@boxslider/slider/+esm'

  const slider = createFadeSlider('#slider')
</script>
```
