import type { Meta, StoryObj } from '@storybook/react-vite'
import { TileSlider } from '~/packages/react'
import { defaultOptions } from '~/packages/slider'
import { slideData, createSlide, defaultSliderStyle } from './shared'
import { createPlayFn } from './test-utils'
import { sharedSliderArgTypes } from './shared-arg-types'

const defaultStoryArgs = {
  ...defaultOptions,
  tileEffect: 'fade' as const,
  rows: 8,
  rowOffset: 50,
}

const meta: Meta<typeof TileSlider> = {
  title: 'BoxSlider/TileSlider',
  component: TileSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tile slider component that provides animated tile-based transitions between slides.',
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
    tileEffect: {
      control: { type: 'select' },
      options: ['fade', 'flip'],
      description: 'Type of tile transition effect',
      defaultValue: 'fade',
    },
    rows: {
      control: { type: 'number', min: 2, max: 8, step: 1 },
      description: 'Number of tile rows',
      defaultValue: 8,
    },
    rowOffset: {
      control: { type: 'number', min: 0, max: 300, step: 25 },
      description: 'Delay offset between rows in milliseconds',
      defaultValue: 50,
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  // Uses all default values from meta
  render: function DefaultRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: createPlayFn('bs-tile', defaultStoryArgs),
}

export const FlipEffect: Story = {
  args: {
    speed: 1000,
    tileEffect: 'flip',
    rows: 5,
    rowOffset: 120,
  },
  render: function FlipEffectRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: createPlayFn('bs-tile', {
    ...defaultStoryArgs,
    speed: 1000,
    tileEffect: 'flip',
    rows: 5,
    rowOffset: 120,
  }),
}

export const ManyRows: Story = {
  args: {
    speed: 1200,
    rows: 8,
    rowOffset: 60,
  },
  render: function ManyRowsRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: createPlayFn('bs-tile', {
    ...defaultStoryArgs,
    speed: 1200,
    rowOffset: 60,
  }),
}

export const NoOffset: Story = {
  args: {
    tileEffect: 'flip',
    rows: 6,
    rowOffset: 0,
  },
  render: function NoOffsetRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.slice(0, 3).map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: createPlayFn('bs-tile', {
    ...defaultStoryArgs,
    tileEffect: 'flip',
    rows: 6,
    rowOffset: 0,
  }),
}

export const HighOffset: Story = {
  args: {
    speed: 1000,
    rowOffset: 200,
  },
  render: function HighOffsetRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: createPlayFn('bs-tile', {
    ...defaultStoryArgs,
    speed: 1000,
    rowOffset: 200,
  }),
}

export const CustomConfiguration: Story = {
  args: {
    speed: 1500,
    timeout: 0, // Disable auto-scroll
    autoScroll: false,
    loop: false,
    startIndex: 4,
    swipe: false,
    swipeTolerance: 100,
    pauseOnHover: false,
    tileEffect: 'flip',
    rows: 6,
    rowOffset: 150,
  },
  render: function CustomConfigurationRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: createPlayFn('bs-tile', {
    ...defaultStoryArgs,
    speed: 1500,
    timeout: 0,
    autoScroll: false,
    loop: false,
    startIndex: 4,
    swipe: false,
    swipeTolerance: 100,
    pauseOnHover: false,
    tileEffect: 'flip',
    rows: 6,
    rowOffset: 150,
  }),
}
