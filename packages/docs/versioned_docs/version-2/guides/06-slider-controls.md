---
title: Slider Controls
---

The slider controls component wraps a slider to provide navigation and slide index buttons.

```html
<bs-slider-controls>
  <bs-carousel auto-scroll="false" timeout="5000" cover>
    <div class="slide">Slide One</div>
    <div class="slide">Slide Two</div>
    <div class="slide">Slide Three</div>
    <div class="slide">Slide Four</div>
    <div class="slide">Slide Five</div>
  </bs-carousel>
</bs-slider-controls>
```

Button labels for the default controls can be set via attributes. The `index-btn-label`
attribute may include a `%d` placeholder for the slide number.

```html
<bs-slider-controls
  next-btn-label="Next slide"
  prev-btn-label="Previous slide"
  play-btn-label="Start slide show"
  pause-btn-label="Stop slide show"
  index-label="Select a slide"
  index-btn-label="Go to slide %d">
  <!-- slider content --->
</bs-slider-controls>
```

Slots for the controls are available if you want to provide your own and these will be activated
with event listeners to control the slider for you.

```html
<bs-slider-controls>
  <bs-carousel auto-scroll="false" timeout="5000" cover>
    <div class="slide">Slide One</div>
    <div class="slide">Slide Two</div>
    <div class="slide">Slide Three</div>
    <div class="slide">Slide Four</div>
    <div class="slide">Slide Five</div>
  </bs-carousel>

  <button slot="next-btn">Next</button>
  <button slot="prev-btn">Previous</button>

  <div slot="index">
    <button>View slide one</button>
    <button>View slide two</button>
    <button>View slide three</button>
    <button>View slide four</button>
    <button>View slide five</button>
  </div>
</bs-slider-controls>
```

The `bs-slider-controls` element has some basic layout and button styles that can be configured via the
custom properties as show below. The styling can be disabled completely by setting the `unstyled` attribute.

```html
<!-- Disable default styling -->
<bs-slider-controls unstyled></bs-slider-controls>
```

```css
/* Override the default styles via custom properties */
:root {
  /* The amount of space between the slides and the button controls */
  --bs-button-bar-gap: 0.5rem;

  /* The color of the index button pips */
  --bs-index-btn-color: rgb(0 0 0 / 50%);

  /* The color of the index button pip when hovered */
  --bs-index-btn-hover-color: rgb(0 0 0 / 75%);

  /* The color of the index button pip when it's slide is in view (active) */
  --bs-index-btn-active-color: black;

  /* The Size of the index button pips */
  --bs-index-btn-size: 1rem;

  /* The background color of the control buttons */
  --bs-btn-background-color: rgb(0 0 0 / 50%);

  /* The background color of the control buttons when hovered */
  --bs-btn-hover-background-color: rgb(0 0 0 / 75%);

  /* The border radius of the control buttons */
  --bs-btn-border-radius: 999px;

  /* The size of the control buttons */
  --bs-btn-size: 2rem;

  /* The background image icon for the next button */
  --bs-next-icon: url('/next.svg');

  /* The background image icon for the previous button */
  --bs-prev-icon: url('/prev.svg');

  /* The background image icon for the play button. */
  --play-icon: url('/play.svg');

  /* The background image icon for the pause button. */
  --pause-icon: url('/pause.svg');
}
```

To further customize the controls, the `part` attribute can be used to target the individual parts of the controls.
Below is the template for the slider controls showing the available parts.

```html
<div part="container">
  <div part="slider-container">
    <slot id="slider"></slot>
  </div>

  <div part="play-btn-container">
    <slot name="play-btn">
      <button part="btn play-btn"></button>
    </slot>
  </div>

  <div part="controls-container">
    <slot name="prev-btn">
      <button part="prev-btn btn"></button>
    </slot>
    <slot name="next-btn">
      <button part="next-btn btn"></button>
    </slot>
  </div>

  <div part="index-container">
    <slot name="index">
      <!-- index buttons are generated with part="index-btn" -->
    </slot>
  </div>
</div>
```

As an example, to style the control buttons create a selector to target the `btn` part.

```css
bs-slider-controls::part(btn) {
  background: red;
  color: white;
}
```

Additional parts are added to controls for the active index button and the state of the
play button.

```css
/* Active index button */
bs-slider-controls::part(index-btn active) {
  /* button style rules */
}

/* Play button for a slider in auto scrolling state has the pause part */
bs-slider-controls::part(play-btn pause) {
  /* button style rules */
}
```
