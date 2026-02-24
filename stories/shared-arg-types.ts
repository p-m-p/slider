import type { ArgTypes } from '@storybook/react-vite'

// Shared argTypes for all slider components
export const sharedSliderArgTypes: ArgTypes = {
  // Core Options
  speed: {
    control: { type: 'number', min: 100, max: 2000, step: 100 },
    description: 'Transition speed in milliseconds',
    defaultValue: 800,
  },
  timeout: {
    control: { type: 'number', min: 0, max: 8000, step: 500 },
    description: 'Auto-scroll timeout in milliseconds (0 to disable)',
    defaultValue: 5000,
  },
  autoScroll: {
    control: { type: 'boolean' },
    description: 'Automatically scroll through the slides',
    defaultValue: true,
  },
  loop: {
    control: { type: 'boolean' },
    description: 'Rotate from first to last slides when navigation is used',
    defaultValue: true,
  },
  pauseOnHover: {
    control: { type: 'boolean' },
    description: 'Pause auto-scroll on mouse hover (uses PauseOnHoverPlugin)',
    defaultValue: true,
  },
  enableTouch: {
    control: { type: 'boolean' },
    description:
      'Enable touch/swipe navigation with progressive drag support (uses TouchGesturePlugin)',
    defaultValue: true,
  },
  startIndex: {
    control: { type: 'number', min: 0, max: 10, step: 1 },
    description: 'Slide index to start from (0-based)',
    defaultValue: 0,
  },

  // Style prop
  style: {
    table: { disable: true },
    description: 'CSS styles to apply to the slider element',
  },

  // Event Handlers
  onAfter: {
    table: { disable: true },
    action: 'after',
    description: 'Event triggered after slide transition completes',
  },
  onBefore: {
    table: { disable: true },
    action: 'before',
    description: 'Event triggered before slide transition begins',
  },
  onDestroy: {
    table: { disable: true },
    action: 'destroy',
    description: 'Event triggered when slider is destroyed',
  },
  onPause: {
    table: { disable: true },
    action: 'pause',
    description: 'Event triggered when slider auto-scrolling is stopped',
  },
  onPlay: {
    table: { disable: true },
    action: 'play',
    description: 'Event triggered when slider auto-scrolling is started',
  },
  onReset: {
    table: { disable: true },
    action: 'reset',
    description: 'Event triggered when slider is reset',
  },
}
