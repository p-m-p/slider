---
title: API
---

## Methods

### `skipTo`

Shows a slide at the specified index starting from 0. Returns a promise that resolves
when the transition is complete.

```javascript
slider.skipTo(3).then(() => {
  // show 4th slide
  // transition complete
})
```

### `play`

Start auto scrolling the slides

```javascript
slider.play()
```

### `pause`

Pause an already auto scrolling slider

```javascript
slider.pause()
```

### `destroy`

Destroys the slider and returns the HTML elements to their original state.

```javascript
slider.destroy()
```

### `next`

Moves the slider to the next slide. Returns a promise that resolves when the transition
is complete.

```javascript
slider.next().then(() => {
  // transition complete
})
```

### `prev`

Moves the slider to the previous slide. Returns a promise that resolves when the
transition is complete.

```javascript
slider.prev().then(() => {
  // transition complete
})
```

### `reset`

Re-initialises the slider with updated options. An updated effect may also be
passed as the second parameter.

```javascript
slider.reset(options, effect)
```

### `addEventListener`

Adds a listener for the specified event. See the event documentation for the available
events.

```javascript
const afterTransitionListener = () => {
  // Take some action when the event occurs
}

slider.addEventListener('after', afterTransitionListener)
```

### `removeEventListener`

Removes the listener for the specified event.

```javascript
slider.removeEventListener('after', afterTransitionListener)
```

### `getOption`

Returns the value of the specified option.

```javascript
slider.getOption('autoScroll')
```

## Events

### `init`

Fires when a slider is initialised.

```javascript
slider.addEventListener('init', () => {
  // No event data
})
```

### `before`

Fires before each slide transition starts. The current and next indexes are supplied in the
event data as well as the transition speed.

```javascript
slider.addEventListener('before', (data) => {
  // data: {
  //   currentIndex: number
  //   nextIndex: number
  //   speed: number
  // }
})
```

### `after`

Fires after each slide transition is complete. The active index is supplied in the event
data

```javascript
slider.addEventListener('after', (data) => {
  // data: {
  //   currentIndex: number
  //   speed: number
  // }
})
```

### `play`

Fires when the slider is put into play mode.

```javascript
slider.addEventListener('play', (data) => {
  // data: {
  //   currentIndex: number
  //   speed: number
  // }
})
```

### `pause`

Fires when an `autoScroll`'ing slider is paused.

```javascript
slider.addEventListener('pause', (data) => {
  // data: {
  //   currentIndex: number
  //   speed: number
  // }
})
```

### `reset`

Fires when a slider is reset. This can happen when the `reset` method is called or
when the slider element is resized.

```javascript
slider.addEventListener('reset', () => {
  // No event data
})
```

### `destroy`

Fires when a slider is destroyed.

```javascript
slider.addEventListener('destroy', () => {
  // No event data
})
```
