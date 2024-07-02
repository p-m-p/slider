---
title: JavaScript
---

Install from NPM

```sh
npm install --save @boxslider/slider
```

Use from CDN

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

## Usage

Create the HTML structure for your content. Some effects require each slide to only
contain an image but others support any form of content. See the documentation for
the desired effect for detailed instructions.

```html
<section id="content-box">
  <!-- the content box -->
  <figure>
    <!-- slide one -->
    <picture>
      <source srcset="one-680.jpg" media="(min-width: 800px)" />
      <img src="one.jpg" />
    </picture>
    <figcaption>This is slide one</figcaption>
  </figure>
  <figure>
    <!-- slide two -->
    <picture>
      <source srcset="two-680.jpg" media="(min-width: 800px)" />
      <img src="two.jpg" />
    </picture>
    <figcaption>This is slide two</figcaption>
  </figure>
  <figure>
    <!-- slide three -->
    <picture>
      <source srcset="three-680.jpg" media="(min-width: 800px)" />
      <img src="three.jpg" />
    </picture>
    <figcaption>This is slide three</figcaption>
  </figure>
</section>
```

To initialize the slider from JavaScript select the box and create a new `BoxSlider` instance with
the desired settings and effect.

```javascript
import { BoxSlider, FadeSlider } from '@boxslider/slider'

const options = {
  autoScroll: true,
  timeout: 5000,
}
const box = document.querySelector('#content-box')

// Create a fading slide transition that moves to the next slide every 5 seconds (5000ms)
const slider = new BoxSlider(box, new FadeSlider(), options)

// Call API methods on the slider to manipulate it see documentation for available actions
slider.next().then(() => {
  // Promise resolves when the box has transitioned to the next slide
})
```
