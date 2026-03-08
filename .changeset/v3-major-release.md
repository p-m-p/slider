---
'@boxslider/slider': major
'@boxslider/components': major
'@boxslider/react': major
---

# BoxSlider v3

## Breaking Changes

### Effect Interface

The `transition()` method has been replaced with `prepareTransition()` which returns a `ProgressiveTransitionState` controller. This enables progressive drag-based transitions where users can drag slides and see real-time visual feedback.

**Before (v2):**

```typescript
interface Effect {
  initialize(el, slides, options, stateStore): void
  transition(settings: TransitionSettings): void | Promise<void>
  destroy?(el, slides): void
}
```

**After (v3):**

```typescript
interface Effect {
  readonly swipeDirection?: 'horizontal' | 'vertical'
  initialize(el, slides, options, stateStore): void
  prepareTransition(
    settings: TransitionSettings,
  ): ProgressiveTransitionState | null
  destroy?(el, slides): void
}
```

### ProgressiveTransitionState

Effects must now return a state controller with the following methods:

```typescript
interface ProgressiveTransitionState {
  setProgress(progress: number): void // Set transition progress (0-1)
  complete(fromProgress: number): Promise<void> // Complete the transition
  cancel(fromProgress: number): Promise<void> // Cancel and revert
  abort(): void // Immediately abort and reset
}
```

### Migration Guide for Custom Effects

**Simple effects** (no animation):

```typescript
// v2
const effect = {
  initialize(el, slides, options) {
    /* ... */
  },
  transition({ slides, currentIndex, nextIndex }) {
    slides[currentIndex].style.display = 'none'
    slides[nextIndex].style.display = 'block'
  },
}

// v3
import { createProgressiveTransition } from '@boxslider/slider'

const effect = {
  initialize(el, slides, options) {
    /* ... */
  },
  prepareTransition({ slides, currentIndex, nextIndex, speed }) {
    return createProgressiveTransition({
      elements: [slides[currentIndex], slides[nextIndex]],
      speed,
      onComplete: async () => {
        slides[currentIndex].style.display = 'none'
        slides[nextIndex].style.display = 'block'
      },
    })
  },
}
```

**Animated effects** with progressive drag support:

```typescript
// v3 with progressive transitions
const effect = {
  initialize(el, slides, options) {
    /* ... */
  },
  prepareTransition({ slides, currentIndex, nextIndex, speed }) {
    const current = slides[currentIndex]
    const next = slides[nextIndex]

    return createProgressiveTransition({
      elements: [current, next],
      speed,
      onProgress: (progress) => {
        // Update visual state based on drag progress (0-1)
        current.style.opacity = String(1 - progress)
        next.style.opacity = String(progress)
      },
      onComplete: async (fromProgress, remainingDuration) => {
        // Animate to completion from current progress
        await Promise.all([
          current.animate(
            { opacity: [String(1 - fromProgress), '0'] },
            { duration: remainingDuration },
          ).finished,
          next.animate(
            { opacity: [String(fromProgress), '1'] },
            { duration: remainingDuration },
          ).finished,
        ])
      },
      onCancel: async (fromProgress, remainingDuration) => {
        // Animate back to start
        await Promise.all([
          current.animate(
            { opacity: [String(1 - fromProgress), '1'] },
            { duration: remainingDuration },
          ).finished,
          next.animate(
            { opacity: [String(fromProgress), '0'] },
            { duration: remainingDuration },
          ).finished,
        ])
      },
      onFinish: () => {
        current.style.opacity = '0'
        next.style.opacity = '1'
      },
      onReset: () => {
        current.style.opacity = '1'
        next.style.opacity = '0'
      },
    })
  },
}
```

### Vertical Swipe Direction

Effects that require vertical swipe gestures (like CubeSlider with vertical direction) should specify `swipeDirection`:

```typescript
const effect = {
  get swipeDirection() {
    return this.options.direction // 'horizontal' | 'vertical'
  },
  // ...
}
```

## New Features

### New Events

**`progress`** - Fires during progressive drag transitions:

```typescript
slider.addEventListener('progress', (data) => {
  // data: { currentIndex, nextIndex, progress (0-100) }
})
```

**`cancel`** - Fires when a progressive transition is cancelled:

```typescript
slider.addEventListener('cancel', (data) => {
  // data: { currentIndex, nextIndex, speed }
})
```

### Progressive Drag Transitions

Carousel, Cube, and Fade effects now support progressive drag transitions. When users swipe/drag on touch devices, they see real-time visual feedback of the transition progress. Tile effect uses standard swipe triggers due to the complexity of its tile-based animation.

### Utility Function

The `createProgressiveTransition` helper is exported for creating compliant `ProgressiveTransitionState` objects:

```typescript
import { createProgressiveTransition } from '@boxslider/slider'
```
