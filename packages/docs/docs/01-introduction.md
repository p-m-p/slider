---
title: Introduction
---

BoxSlider is a small library with no third party dependencies that provides a light-weight, responsive content carousel (slider) with
various slide transition effects for modern browsers. The core JavaScript library can be used standalone and there are React component
implementations for each slide effect. Web components are also available for each slide effect meaning the library can be used with
most front-end frameworks including Angular, Svelte and Vue.js.

import { Carousel } from '@site/src/components/Examples'

<Carousel />

## Slide effects

The following slide effects are available:

- [Carousel](/docs/effects/carousel) - A traditional slide effect that animates slides horizontally.
- [Cube](/docs/effects/cube) - A 3D cube effect that rotates slides horizontally or vertically.
- [Fade](/docs/effects/fade) - A fade effect that fades slides in and out of view.
- [Tile](/docs/effects/tile) - A tile effect that flips in 3d or fades slides in a grid pattern.

## Key features

- **Performance**: BoxSlider is a small library with no third party dependencies that will help keep bundle sizes small.
- **Accessibility**: BoxSlider is accessible and follows the WAI-ARIA [carousel pattern guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/).
- **Customizable**: BoxSlider is configurable through a simple set of options and can be styled to your needs.
- **Responsive**: BoxSlider adapts to changes in screen size and orientation.
- **Modern**: BoxSlider utilises modern web technologies with CSS animations for smooth performance.

## Should I use BoxSlider?

The carousel pattern gets a bit of a bad rap for being overused and often misused. Carousels still have a place in modern web design
when used correctly and BoxSlider can be a good choice for projects that need a simple solution that can be applied with
[best practices](https://webflow.com/blog/carousel-slider-design-best-practices).
