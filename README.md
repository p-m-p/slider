jQuery 3D content slider
===

This jQuery plugin is a light-weight content slider that provides a simple
interface for creating cool 2D or 3D slide animation transitions. It comes by
default with a 3D vertical scrolling box transition and I intend to create
more cool effects as I find time.

Demos coming v.soon, promise :)

Usage
---

Create a view port for the 3D perspective and within that add the HTML to create
a box containing slides of content.

```html
<div class="slider-viewport"><!-- works as a viewport for the 3D transitions -->
  <div id="content-box"><!-- the 3d box -->
    <figure>
      <img src="img/slide-1.png">
      <figcaption>This is slide one's description</figcaption>
    </figure>
    <figure>
      <img src="img/slide-2.png">
      <figcaption>This is slide two's description</figcaption>
    </figure>
    <figure>
      <img src="img/slide-3.png">
      <figcaption>This is slide three's description</figcaption>
    </figure>
    <figure class="slide">
      <img src="img/slide-4.png">
      <figcaption>This is slide four's description</figcaption>
    </figure>
  </div>
</div>
```

Technically no CSS is required but if the outer box `div.slider-viewport` is
statically positioned the plugin will apply relative positioning to it so that
it can hold the absolutely positioned box.

Then the usual jQuery sugaryness applies...

```javascript
$('#content-box').boxSlider( /* options */ );
```

Options
---

Coming soon, see js/box-slider.jquery.js for defaults for now.
