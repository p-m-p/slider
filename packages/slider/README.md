BoxSlider
===

BoxSlider is a light-weight, responsive content slider that provides a
simple interface for developers to easily integrate a range of cool content
transitions like 3D cubes and tiles or more traditional scrolling carousels.

Installation
---

```javascript
npm install @boxslider/slider
```

Usage
---

Create the HTML structure for your content. Some effects require each slide to only 
contain an image but others support any form of content. See the documentation for
the desired effect for detailed instructions.

```html
<section id="content-box"><!-- the content box -->
    <figure><!-- slide one -->
        <picture>
            <source srcset="one-680.jpg" media="(min-width: 800px)">
            <img src="one.jpg">
        </picture>
        <figcaption>This is slide one</figcaption>
    </figure>
    <figure><!-- slide two -->
        <picture>
            <source srcset="two-680.jpg" media="(min-width: 800px)">
            <img src="two.jpg">
        </picture>
        <figcaption>This is slide two</figcaption>
    </figure>
    <figure><!-- slide three -->
        <picture>
            <source srcset="three-680.jpg" media="(min-width: 800px)">
            <img src="three.jpg">
        </picture>
        <figcaption>This is slide three</figcaption>
    </figure>
</section>
```
To initialize the slider from JavaScript select the box and create a new `BoxSlider` with
the desired settings and effect.

```javascript
import { BoxSlider, FadeSlider } from '@boxslider/slider'; 

const options = { 
  effect: new FadeSlider(), 
  autoScroll: true,
  timeout: 5000
};
const box = document.querySelector('#content-box');

// Create a fading slide transition that moves to the next slide every 5 seconds (5000ms)
const slider = new BoxSlider(box, options);

// Call API methods on the slider to manipulate it see documentation for available actions
slider.next().then(() => {
  // Promise resolves when the box has transitioned to the next slide
});
``` 

Options
---

* `effect: Effect` **Required** option for the slide effect.
* `speed: number (default: 800)` The time interval in milliseconds within which the
  slide animation will complete
* `autoScroll: boolean (default: false)` Set true to automatically transition through
  the slides
* `timeout: number (default: 5000)` The time interval between slide transitions. For use
  with autoScroll
* `pauseOnHover: boolean (default: false)` Pause an auto-scrolling slider when the users
  mouse hovers over it. For use with autoScroll or a slider in play mode.
* `swipe: boolean (default: true)` Enable swiping the box to navigate to the next or 
  previous slide.
* `swipeTolerance: number (default 30)` The number of pixels between the pointer down
  and pointer up events during the swipe action that will trigger the transition.

Effect Options
---
  
### CubeSlider
* `direction: 'horizontal' | 'vertical' (default: horizontal)` The direction in which the
  cube should rotate to the next slide.
* `perspective: number (default: 1000)` The perspective to apply to the parent viewport 
  element containing the box. 

### FadeSlider 
* `timingFunction: string (default: ease-in)` The CSS transition timing function to use
  when fading slide opacity.

### TileSlider 
* `tileEffect: 'fade' | 'flip' (default: flip)` The transition effect for animating the tiles during
  slide transitions. 
* `rows: number (default: 8)` The number of tile rows into which the slide should
  be split
* `rowOffset: number (default: 100)` The time offset for starting to animate the tiles
  in a row

### CarouselSlider
* `timingFunction: string (default: ease-in-out)` The CSS transition timing function to use
  when animating slides into position.

Methods
---

### `skipTo`
Shows a slide at the specified index starting from 0. Returns a promise that resolves 
when the transition is complete.

```javascript
slider.skipTo(3).then(() => {  // show 4th slide
  // transition complete
});
```

### `play`
Start `autoScroll`'ing a slider

```javascript
slider.play()
```

### `pause`
Pause an already `autoScroll`'ing a slider

```javascript
slider.pause();
```

### `destroy`
Destroys the slider and returns the HTML elements to their original state.

```javascript
slider.destroy();
```

### `next`
Moves the slider to the next slide. Returns a promise that resolves when the transition
is complete.

```javascript
slider.next().then(() => {
  // transition complete
});
```

### `prev`
Moves the slider to the previous slide. Returns a promise that resolves when the 
transition is complete.

```javascript
slider.prev().then(() => {
  // transition complete
});
```

### `addEventListener`
Adds a listener for the specified event. See the event documentation for the available
events.

```javascript
const afterTransitionListener = () => {
  // Take some action when the event occurs
};

slider.addEventListener('after', afterTransitionListener);
```

### `removeEventListener`
Removes the listener for the specified event.

```javascript
slider.removeEventListener('after', afterTransitionListener);
```

Events
---

### `before`
Fires before each slide transition starts. The current and next indexes are supplied in the 
event data as well as the transition speed.

```javascript
slider.addEventListener('before', data => {
  // data === {
  //   currentIndex: number,
  //   nextIndex: number,
  //   speed: number 
  // }
});
```

### `after`
Fires after each slide transition is complete. The active index is supplied in the event
data

```javascript
slider.addEventListener('after', data => {
  // data === {
  //   activeIndex: number
  // }
});
```

### `play`
Fires when the slider is put into play mode.

```javascript
slider.addEventListener('play', () => { /* no event data */ });
```

### `pause`
Fires when an `autoScroll`'ing slider is paused.

```javascript
slider.addEventListener('pause', () => { /* no event data */ });
```

### `destroy`
Fires when a slider is destroyed.

```javascript
slider.addEventListener('destroy', () => { /* no event data */ });
```
