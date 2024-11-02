---
title: Configuration
---

## Slider options

| Option           | Type    | Default                                   | Description                                                                                                                  |
| ---------------- | ------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `autoScroll`     | boolean | true (unless user prefers reduced motion) | Set true to automatically transition through the slides                                                                      |
| `loop`           | boolean | true                                      | Set true to rotate the slider back to the first or last slide when next and prev methods are called                          |
| `pauseOnHover`   | boolean | true when a using a fine pointing device  | Pause an auto-scrolling slider when the users mouse hovers over it. For use with autoScroll or a slider in play mode         |
| `speed`          | number  | 800                                       | The time interval in milliseconds within which the slide animation will complete                                             |
| `swipe`          | boolean | true                                      | Enable swiping the box to navigate to the next or previous slide                                                             |
| `swipeTolerance` | number  | 30                                        | The number of pixels between the pointer down and pointer up events during the swipe action that will trigger the transition |
| `timeout`        | number  | 5000                                      | The time interval between slide transitions. For use with autoScroll                                                         |

## Effect Options

### Carousel

| Option           | Type    | Default       | Description                                                                   |
| ---------------- | ------- | ------------- | ----------------------------------------------------------------------------- |
| `timingFunction` | string  | `ease-in-out` | The CSS transition timing function to use when animating slides into position |
| `cover`          | boolean | false         | If true sets the slide effect to cover over the previous slide                |

### Fade

| Option           | Type   | Default   | Description                                                         |
| ---------------- | ------ | --------- | ------------------------------------------------------------------- |
| `timingFunction` | string | `ease-in` | The CSS transition timing function to use when fading slide opacity |

### Cube

| Option        | Type                     | Default      | Description                                                                |
| ------------- | ------------------------ | ------------ | -------------------------------------------------------------------------- |
| `direction`   | `horizontal \| vertical` | `horizontal` | The direction in which the cube should rotate to the next slide            |
| `perspective` | number                   | 1000         | The perspective to apply to the parent viewport element containing the box |

### Tile

| Option       | Type           | Default | Description                                                            |
| ------------ | -------------- | ------- | ---------------------------------------------------------------------- |
| `tileEffect` | `fade \| flip` | `flip`  | The transition effect for animating the tiles during slide transitions |
| `rows`       | number         | 8       | The number of tile rows into which the slide should be split           |
| `rowOffset`  | number         | 50      | The time offset for starting to animate the tiles in a row             |
