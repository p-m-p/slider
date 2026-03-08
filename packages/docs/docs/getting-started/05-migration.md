---
title: Migration Guide
---

# Migrating from v2 to v3

BoxSlider v3 introduces progressive drag transitions, allowing users to see real-time
visual feedback as they drag slides. This guide covers the breaking changes and how
to update your code.

## What's New in v3

- **Progressive drag transitions** - Users see slides move as they drag, not just after releasing
- **New events** - `progress` and `cancel` events for tracking drag state
- **Simplified architecture** - Touch handling and pause-on-hover built into core

## Breaking Changes

### Custom Effects

If you have custom effects, the `transition()` method has been replaced with `prepareTransition()`.

**Before (v2):**

```javascript
const effect = {
  initialize(el, slides, options) {
    // Setup code
  },

  transition({ slides, currentIndex, nextIndex, speed }) {
    // Transition logic
    slides[currentIndex].style.opacity = '0'
    slides[nextIndex].style.opacity = '1'
  },
}
```

**After (v3):**

```javascript
import { createProgressiveTransition } from '@boxslider/slider'

const effect = {
  initialize(el, slides, options) {
    // Setup code (unchanged)
  },

  prepareTransition({ slides, currentIndex, nextIndex, speed }) {
    const currentSlide = slides[currentIndex]
    const nextSlide = slides[nextIndex]

    return createProgressiveTransition({
      elements: [currentSlide, nextSlide],
      speed,
      onProgress: () => {},
      onComplete: async () => {
        currentSlide.style.opacity = '0'
        nextSlide.style.opacity = '1'
      },
      onCancel: async () => {},
      onFinish: () => {
        currentSlide.style.opacity = '0'
        nextSlide.style.opacity = '1'
      },
      onReset: () => {
        currentSlide.style.opacity = '1'
        nextSlide.style.opacity = '0'
      },
    })
  },
}
```

### Progressive Transition Callbacks

The `createProgressiveTransition` helper requires these callbacks:

| Callback                                      | Purpose                                    |
| --------------------------------------------- | ------------------------------------------ |
| `onProgress(progress)`                        | Update visuals during drag (progress: 0-1) |
| `onComplete(fromProgress, remainingDuration)` | Animate to end state                       |
| `onCancel(fromProgress, remainingDuration)`   | Animate back to start                      |
| `onFinish()`                                  | Set final CSS state                        |
| `onReset()`                                   | Reset to initial CSS state                 |

### Adding Progressive Drag Support

To support progressive drag (optional but recommended), implement `onProgress`:

```javascript
onProgress: (progress) => {
  currentSlide.style.opacity = String(1 - progress)
  nextSlide.style.opacity = String(progress)
},
```

### Vertical Swipe Direction

Effects that need vertical swipe gestures should add the `swipeDirection` property:

```javascript
const effect = {
  get swipeDirection() {
    return 'vertical' // or 'horizontal' (default)
  },
  // ...
}
```

## What's Unchanged

These APIs remain the same in v3:

- **BoxSlider options** - All options (`autoScroll`, `speed`, `timeout`, etc.)
- **BoxSlider methods** - `next()`, `prev()`, `skipTo()`, `play()`, `pause()`, `destroy()`, `reset()`
- **Existing events** - `before`, `after`, `play`, `pause`, `reset`, `destroy`
- **Effect `initialize()` method** - Same signature
- **Effect `destroy()` method** - Same signature
- **Web component attributes** - All attributes unchanged
- **React component props** - All props unchanged

## New Events

v3 adds two new events for tracking progressive transitions:

```javascript
// Fires during drag with progress percentage
slider.addEventListener('progress', ({ currentIndex, nextIndex, progress }) => {
  console.log(`Dragging to slide ${nextIndex}: ${progress}%`)
})

// Fires when drag is cancelled
slider.addEventListener('cancel', ({ currentIndex, nextIndex }) => {
  console.log(`Cancelled transition to slide ${nextIndex}`)
})
```

## Quick Migration Checklist

1. **Using built-in effects only?** No changes needed.
2. **Have custom effects?** Update `transition()` to `prepareTransition()` using `createProgressiveTransition`.
3. **Need vertical swipe?** Add `swipeDirection: 'vertical'` to your effect.
4. **Want drag feedback?** Implement `onProgress` callback in your effect.
