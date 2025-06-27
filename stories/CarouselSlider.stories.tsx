import type { Meta, StoryObj } from '@storybook/react-vite'
import { CarouselSlider } from '~/packages/react'
import { slideData, createSlide, defaultSliderStyle } from './shared'
import { createPlayFn } from './test-utils'

const meta: Meta<typeof CarouselSlider> = {
  title: 'BoxSlider/CarouselSlider',
  component: CarouselSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A carousel slider component that provides horizontal slide transitions with smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    speed: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: 'Transition speed in milliseconds',
    },
    timeout: {
      control: { type: 'number', min: 0, max: 8000, step: 500 },
      description: 'Auto-scroll timeout in milliseconds (0 to disable)',
    },
    swipe: {
      control: 'boolean',
      description: 'Enable touch/swipe navigation',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause auto-scroll on hover',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    speed: 500,
    timeout: 5000,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function DefaultRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    speed: 500,
    timeout: 5000,
    swipe: true,
  }),
}

export const CoverMode: Story = {
  args: {
    speed: 600,
    timeout: 5000,
    cover: true,
    swipe: true,
    pauseOnHover: true,
    style: defaultSliderStyle,
  },
  render: function CoverModeRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    speed: 600,
    timeout: 5000,
    cover: true,
    swipe: true,
    pauseOnHover: true,
  }),
}

export const CustomTiming: Story = {
  args: {
    speed: 1200,
    timeout: 5000,
    timingFunction: 'ease-out',
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function CustomTimingRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.slice(0, 3).map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    speed: 1200,
    timeout: 5000,
    timingFunction: 'ease-out',
    swipe: true,
  }),
}

export const FastTransitions: Story = {
  args: {
    speed: 250,
    timeout: 2000,
    timingFunction: 'ease-in',
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function FastTransitionsRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    speed: 250,
    timeout: 2000,
    timingFunction: 'ease-in',
    swipe: true,
  }),
}

export const CustomConfiguration: Story = {
  args: {
    speed: 1000,
    timeout: 0, // Disable auto-scroll
    autoScroll: false,
    loop: false,
    startIndex: 2,
    swipe: false,
    swipeTolerance: 50,
    pauseOnHover: false,
    cover: true,
    timingFunction: 'linear',
    style: defaultSliderStyle,
  },
  render: function CustomConfigurationRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    speed: 1000,
    timeout: 0,
    autoScroll: false,
    loop: false,
    startIndex: 2,
    swipe: false,
    swipeTolerance: 50,
    pauseOnHover: false,
    cover: true,
    timingFunction: 'linear',
  }),
}
