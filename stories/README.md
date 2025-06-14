# Storybook Testing Documentation

This document outlines the comprehensive test suite implemented for all BoxSlider React component stories.

## Testing Setup

- **Framework**: Storybook 9.0.9 with @storybook/test
- **Test Runner**: @storybook/test-runner for automated testing
- **Test Pattern**: Play functions with canvasElement queries
- **Coverage**: All component props, attributes, and functionality

## Test Coverage by Component

### CarouselSlider Stories

**Default Story**

- ✅ Component rendering validation
- ✅ Slide count verification (4 slides)
- ✅ Image loading validation
- ✅ Content verification (titles, subtitles)
- ✅ Speed and timeout attribute testing

**CoverMode Story**

- ✅ Cover mode attribute validation
- ✅ Pause on hover functionality
- ✅ All slides rendering (5 slides)

**CustomTiming Story**

- ✅ Custom timing function validation (`ease-out`)
- ✅ Speed configuration testing (1200ms)
- ✅ Slide count verification (3 slides)

**FastTransitions Story**

- ✅ Fast speed settings (250ms)
- ✅ Short timeout validation (2000ms)
- ✅ Ease-in timing function
- ✅ Swipe functionality enabled

### FadeSlider Stories

**Default Story**

- ✅ Fade slider rendering
- ✅ Timing function validation (`ease-in-out`)
- ✅ Speed and swipe attributes
- ✅ Slide content verification

**EaseInTiming Story**

- ✅ Ease-in timing function validation
- ✅ Pause on hover functionality
- ✅ All slides rendering (5 slides)

**LinearFade Story**

- ✅ Linear timing function validation
- ✅ Speed configuration (1000ms)
- ✅ Slide count verification (3 slides)

**FastFade Story**

- ✅ Fast fade settings (400ms speed, 3000ms timeout)
- ✅ Ease-out timing validation
- ✅ Slide rendering verification

### CubeSlider Stories

**Default Story**

- ✅ 3D cube slider rendering
- ✅ Horizontal direction validation
- ✅ Perspective value testing (1000px)
- ✅ Viewport wrapper validation
- ✅ 3D CSS perspective verification

**VerticalRotation Story**

- ✅ Vertical rotation direction
- ✅ Higher perspective value (1200px)
- ✅ Viewport perspective synchronization

**HighPerspective Story**

- ✅ High perspective validation (1800px)
- ✅ Viewport-slider perspective matching
- ✅ Horizontal direction maintenance

**LowPerspective Story**

- ✅ Low perspective validation (600px)
- ✅ Speed configuration testing
- ✅ 3D viewport validation

### TileSlider Stories

**Default Story**

- ✅ Tile effect validation (`fade`)
- ✅ Row configuration (4 rows)
- ✅ Row offset timing (100ms)
- ✅ Slide count verification

**FlipEffect Story**

- ✅ Flip effect validation
- ✅ Multiple rows configuration (5 rows)
- ✅ Row offset customization (120ms)

**ManyRows Story**

- ✅ High row count testing (8 rows)
- ✅ Fast row offset (60ms)
- ✅ Speed configuration validation

**NoOffset Story**

- ✅ Zero offset validation (simultaneous tiles)
- ✅ Row count verification (6 rows)
- ✅ Slide count validation (3 slides)

**HighOffset Story**

- ✅ High offset validation (200ms delay)
- ✅ Fade effect with high offset
- ✅ All slides rendering (5 slides)

### SliderControls Stories

**WithCarousel Story**

- ✅ Controls wrapper validation
- ✅ Carousel slider integration
- ✅ Control button presence validation
- ✅ Accessibility label testing
- ✅ Slide count verification

**WithFadeSlider Story**

- ✅ Fade slider integration
- ✅ Custom button labels (`Next image`, `Previous image`)
- ✅ Control presence validation
- ✅ Slide count verification (4 slides)

**WithCubeSlider Story**

- ✅ Cube slider integration with controls
- ✅ 3D viewport wrapper validation
- ✅ Custom rotation labels (`Rotate →`, `← Rotate`)
- ✅ Perspective validation

**WithTileSlider Story**

- ✅ Tile slider integration
- ✅ Tile configuration validation (flip effect, 5 rows)
- ✅ Tile-specific button labels
- ✅ Control functionality

**ProfessionalStyled Story**

- ✅ Custom styling wrapper validation
- ✅ CSS custom properties testing
- ✅ Professional styling labels
- ✅ Gradient background validation
- ✅ Carousel integration with styling

## Test Execution

### Running Tests

```bash
# Start Storybook (required for test runner)
pnpm run storybook

# Run all story tests
pnpm run test-storybook

# Run with coverage
pnpm run test-storybook --coverage

# Run in watch mode
pnpm run test-storybook --watch
```

### Test Patterns

Each story includes play functions that:

1. **Query DOM elements** using `canvasElement.querySelector()`
2. **Validate component presence** with `expect().toBeTruthy()`
3. **Test attribute values** with `getAttribute()` and `toBe()`
4. **Count elements** with `querySelectorAll()` and `toHaveLength()`
5. **Verify content** with `textContent` and string matching
6. **Test styling** with `toHaveStyle()` and CSS validation

### Assertion Examples

```typescript
// Component presence
const slider = canvasElement.querySelector('bs-carousel-slider')
expect(slider).toBeTruthy()

// Attribute validation
expect(slider?.getAttribute('speed')).toBe('500')

// Element counting
const slides = canvasElement.querySelectorAll('.slide')
expect(slides).toHaveLength(4)

// Content verification
const title = canvasElement.querySelector('h3')
expect(title?.textContent).toBe('Beautiful Landscape')

// Button accessibility
const nextBtn = canvasElement.querySelector('button[aria-label="Next slide"]')
expect(nextBtn).toBeTruthy()
```

## Benefits

- **Comprehensive Coverage**: Tests all component props and configurations
- **Automated Validation**: Runs in CI/CD pipelines
- **Visual Feedback**: Storybook UI shows test results
- **Regression Prevention**: Catches breaking changes early
- **Documentation**: Stories serve as living documentation
- **Accessibility Testing**: Validates ARIA labels and button accessibility
- **Cross-Component Testing**: Validates complex component interactions

## Maintenance

- Tests are co-located with stories for easy maintenance
- Play functions update automatically with story changes
- ESLint ensures code quality and catches unused imports
- Prettier maintains consistent formatting
- TypeScript provides type safety for test assertions
