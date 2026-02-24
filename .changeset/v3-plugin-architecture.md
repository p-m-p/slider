---
'@boxslider/slider': major
'@boxslider/components': major
'@boxslider/react': major
---

## Breaking Changes

- Removed `swipe`, `swipeTolerance`, and `pauseOnHover` options from core BoxSliderOptions
- These features are now provided via plugins

## New Features

### Plugin Architecture

BoxSlider now supports a plugin system for extensible features:

```typescript
import { BoxSlider, CarouselSlider } from '@boxslider/slider'
import {
  TouchGesturePlugin,
  PauseOnHoverPlugin,
} from '@boxslider/slider/plugins'

const slider = new BoxSlider(el, new CarouselSlider(), {}, [
  new TouchGesturePlugin(),
  new PauseOnHoverPlugin(),
])
```

### Progressive Touch Gestures

The new `TouchGesturePlugin` supports progressive drag-based transitions:

- Drag to move through the animation in real-time
- Release above 50% progress to complete, below to cancel
- Quick flick detection for responsive navigation
- Supports both horizontal and vertical directions

### Web Components

New convenience attributes (enabled by default):

- `enable-touch` - Enable touch gesture navigation
- `pause-on-hover` - Pause auto-scroll on hover

### React Components

New convenience props (enabled by default):

- `enableTouch` - Enable touch gesture navigation
- `pauseOnHover` - Pause auto-scroll on hover

## Migration

| v2                   | v3                                          |
| -------------------- | ------------------------------------------- |
| `swipe: true`        | `enableTouch` prop or `TouchGesturePlugin`  |
| `swipeTolerance: 30` | `new TouchGesturePlugin({ threshold: 30 })` |
| `pauseOnHover: true` | `pauseOnHover` prop or `PauseOnHoverPlugin` |
