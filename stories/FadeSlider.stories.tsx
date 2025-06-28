import type { Meta, StoryObj } from '@storybook/react-vite'
import { FadeSlider } from '~/packages/react'
import { defaultOptions } from '~/packages/slider'
import { slideData, createSlide, defaultSliderStyle } from './shared'
import { createPlayFn } from './test-utils'
import { sharedSliderArgTypes } from './shared-arg-types'

const defaultStoryArgs = {
  ...defaultOptions,
  timingFunction: 'ease-in-out' as const,
}

const meta: Meta<typeof FadeSlider> = {
  title: 'BoxSlider/FadeSlider',
  component: FadeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fade slider component that provides smooth fade in/out transitions between slides.',
      },
    },
  },
  args: {
    ...defaultStoryArgs,
    style: defaultSliderStyle,
  },
  tags: ['autodocs'],
  argTypes: {
    ...sharedSliderArgTypes,
    timingFunction: {
      control: { type: 'select' },
      options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'],
      description: 'CSS timing function for fade transitions',
      defaultValue: 'ease-in-out',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    speed: 600,
  },
  render: function DefaultRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: createPlayFn('bs-fade', {
    ...defaultStoryArgs,
    speed: 600,
  }),
}

export const EaseInTiming: Story = {
  args: {
    speed: 800,
    timingFunction: 'ease-in',
  },
  render: function EaseInTimingRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: createPlayFn('bs-fade', {
    ...defaultStoryArgs,
    speed: 800,
    timingFunction: 'ease-in',
  }),
}

export const LinearFade: Story = {
  args: {
    speed: 1000,
    timingFunction: 'linear',
  },
  render: function LinearFadeRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.slice(0, 3).map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: createPlayFn('bs-fade', {
    ...defaultStoryArgs,
    speed: 1000,
    timingFunction: 'linear',
  }),
}

export const FastFade: Story = {
  args: {
    speed: 400,
    timeout: 3000,
    timingFunction: 'ease-out',
  },
  render: function FastFadeRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: createPlayFn('bs-fade', {
    ...defaultStoryArgs,
    speed: 400,
    timeout: 3000,
    timingFunction: 'ease-out',
  }),
}

export const CustomConfiguration: Story = {
  args: {
    speed: 1200,
    timeout: 0, // Disable auto-scroll
    autoScroll: false,
    loop: false,
    startIndex: 3,
    swipe: false,
    swipeTolerance: 75,
    pauseOnHover: false,
    timingFunction: 'ease',
  },
  render: function CustomConfigurationRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: createPlayFn('bs-fade', {
    ...defaultStoryArgs,
    speed: 1200,
    timeout: 0,
    autoScroll: false,
    loop: false,
    startIndex: 3,
    swipe: false,
    swipeTolerance: 75,
    pauseOnHover: false,
    timingFunction: 'ease',
  }),
}
