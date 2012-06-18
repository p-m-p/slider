jQuery 3D content slider
===

This jQuery plugin is a light-weight content slider that provides a simple
interface for creating cool 2D or 3D slide animation transitions. It comes, by
default, with a 3D vertical scrolling box transition and I intend to create
more cool effects as I find time.

Not officially released yet and the API is still a little volatile but all working. 
Browse index.html for demos.

Support
---

Currently, I've only added 3D support for webkit and Firefox, all other browsers
will fallback gracefully to a simple fade transition.

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
it can hold the absolutely positioned box. It should be noted that the viewport
and box should be the same width and height as the content slides so that the 
rotation does not appear off center. It is also a good idea to constrain the 
size of the viewport so that the slides don't spew down the page at load time.

```css
/* overfow will get set to visible on initialisation of the plugin */
.slider-viewport { width: 560px; height: 380px; overflow: hidden }
```

Include the `box-slider.jquery.js` (this one first) and the desired effect
scripts (these second) in your page and then on page load the usual jQuery 
sugaryness applies...

```javascript
$('#content-box').boxSlider( /* options */ );
```

Options
---

* `speed (default: 800)` The time interval in milliseconds within which the
  slide animation will complete
* `autoscroll (default: false)` Set true to automatically transition through
  the slides
* `timeout (default: 5000)` The time interval between slide transitions. For use
  with autoscroll
* `pause (default: null)` A DOM element, jQuery object or selector for an element
  that when clicked will toggle the autoscoll state of the slider. When the slider
  is in a paused state the element will be applied a class name of paused
* `pauseOnHover (default: false)` Pause an auto-scrolling slider when the users
  mouse hovers over it. For use with autoscroll
* `next (default: null)` A DOM element, jQuery object or selector for an element
  that when clicked will advance the slider to the next slide
* `prev (default: null)` A DOM element, jQuery object or selector for an element
  that when clicked will advance the slider to the previous slide
* `effect (default: 'scrollVert3d')` The slide animation effect to use when
  scrolling through content slides
* `perspective (default: 1000)` The 3D perspective at which the content slides
  are placed from the view port during transition

Methods
---

### `showSlide`

Shows a slide at the specified index starting from 0

```javascript
$('#content-box').boxSlider('showSlide', 3); // show 4th slide
```
### `playPause`

Start autoScrolling a slideshow or pause an already running slideshow

```javascript
$('#content-box').boxSlider('playPause');
```

### `option`

Get or set a specific option

```javascript
$('#content-box').boxSlider('option', 'speed'); // returns speed option value
$('#content-box').boxSlider('option', 'speed', 1200); // sets the speed option to 1200
```

Events
---

### `onbefore`

Fires before each slide transition starts. The function parameter will be bound
to the jQuerified box and will receive the current slide as it's first parameter
and the next slide as its second.

```javascript
$('#content-box').boxSlider('option', 'onbefore', function ($currentSlide, $nextSlide) {
  // 'this' is effectively $('#content-box')
});
```

### `onafter`

Fires after each slide transition is complete. The function parameter will be bound
to the jQuerified box and will receive the previous slide as it's first parameter
and the current slide as its second.

```javascript
$('#content-box').boxSlider('option', 'onafter', function ($previousSlide, $currentSlide) {
  // 'this' is effectively $('#content-box')
});
```

Effects
---

So far there is only one 3D effect which is the vertical box rotation transition which 
comes with the plugin as the default. The animation effects come as adaptors that are 
registered with the main box slider plugin using the `registerAnimator` method in one
of the following ways.

```javascript
$.fn.boxSlider('registerAnimator', 'effect name', AnimatorObject); // on $.fn
window.jqBoxSlider.registerAnimator('effect name' AnimatorObject); // on the global alias
```
Slide animators must follow the following interface and adhere to some fundamental rules.

### `configure(Boolean supports3D, String vendorPrefix)`

This method is optional and is called during the adaptor registration process. The `supports3D`
parameter identifies whether the host browser supports 3D CSS transformations and the `vendorPrefix`
parameter provides the host browser CSS vendor prefix if it exists, e.g `'-moz-'`, `'-webkit-'`.

```javascript
adaptor.configure = function (supports3D, vendorPrefix) {
  // implementation omitted
};
```

### `initialize(jQuery $box, jQuery $slides, Object settings)`

This method is required and sets up the initial state of each content slider. The first parameter
`$box` is the jQuery content sliders main box (the selected element when the plugin is initialised), the 
second parameter is the jQuery `$slides` object containing all of the individual slide elements and 
the third parameter `settings` is the settings for the current content slider.

```javascript
adaptor.initialize = function ($box, $slides, settings) {
  // implementation omitted
};
```

### `transition(Object settings)`

This method completes the transition from the current slide to the next slide. The `settings` parameter
is the plugin settings for the content slider extended with the following.

```javascript
{
    $box: // jQuery object containing the content slider box
  , $slides: // jQuery object containing all of the content slides
  , $currSlide: // jQuery object containing the current visible slide
  , $nextSlide: // jQuery object containing the next slide to show
  , reverse: // the direction in which to travel (read forwards, backwards)
  , currIndex: // the index at which $currSlide resides within $slides 
  , nextIndex: // the index at which $nextSlide resides within $slides
}
```

This method must support browsers that do not support 3D transformations by degrading gracefully to
some other method of transitioning the slides. Any settings that need to be cached against the 
content slider for the next transition should be returned as a simple object which will be mixed 
into the plugin settings.

```javascript
adaptor.transition = function (settings) {
  // move to the next previous slides
  return { mycustomsetting: 'value' };
};
```

