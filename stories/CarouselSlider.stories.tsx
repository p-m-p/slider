import type { Meta, StoryObj } from '@storybook/react-vite'
import { CarouselSlider } from '~/packages/react'
import { defaultOptions } from '~/packages/slider'
import { slideData, createSlide, defaultSliderStyle } from './shared'
import { createPlayFn } from './test-utils'
import { sharedSliderArgTypes } from './shared-arg-types'

const defaultStoryArgs = {
  ...defaultOptions,
  enableTouch: true,
  pauseOnHover: true,
  timingFunction: 'ease' as const,
  cover: false,
}

const meta: Meta<typeof CarouselSlider> = {
  title: 'BoxSlider/CarouselSlider',
  component: CarouselSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A carousel slider component that provides horizontal slide transitions with smooth animations. Supports progressive drag gestures for touch interaction.',
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
      description: 'CSS timing function for carousel transitions',
      defaultValue: 'ease',
    },
    cover: {
      control: { type: 'boolean' },
      description: 'Enable cover mode for carousel transitions',
      defaultValue: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    speed: 500,
  },
  render: function DefaultRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    ...defaultStoryArgs,
    speed: 500,
  }),
}

export const CoverMode: Story = {
  args: {
    speed: 600,
    cover: true,
  },
  render: function CoverModeRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    ...defaultStoryArgs,
    speed: 600,
    cover: true,
  }),
}

export const CustomTiming: Story = {
  args: {
    speed: 1200,
    timingFunction: 'ease-out',
  },
  render: function CustomTimingRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.slice(0, 3).map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    ...defaultStoryArgs,
    speed: 1200,
    timingFunction: 'ease-out',
  }),
}

export const FastTransitions: Story = {
  args: {
    speed: 250,
    timeout: 2000,
    timingFunction: 'ease-in',
  },
  render: function FastTransitionsRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    ...defaultStoryArgs,
    speed: 250,
    timeout: 2000,
    timingFunction: 'ease-in',
  }),
}

export const CustomConfiguration: Story = {
  args: {
    speed: 1000,
    timeout: 0,
    autoScroll: false,
    loop: false,
    startIndex: 2,
    enableTouch: false,
    pauseOnHover: false,
    cover: true,
    timingFunction: 'linear',
  },
  render: function CustomConfigurationRender(args) {
    return (
      <CarouselSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </CarouselSlider>
    )
  },
  play: createPlayFn('bs-carousel', {
    ...defaultStoryArgs,
    speed: 1000,
    timeout: 0,
    autoScroll: false,
    loop: false,
    startIndex: 2,
    enableTouch: false,
    pauseOnHover: false,
    cover: true,
    timingFunction: 'linear',
  }),
}
