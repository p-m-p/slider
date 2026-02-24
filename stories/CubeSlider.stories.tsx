import type { Meta, StoryObj } from '@storybook/react-vite'
import { CubeSlider } from '~/packages/react'
import { defaultOptions } from '~/packages/slider'
import {
  slideData,
  createSlide,
  defaultSliderStyle,
  cubeViewportStyle,
  createCubeViewportStyle,
} from './shared'
import { createPlayFn } from './test-utils'
import { sharedSliderArgTypes } from './shared-arg-types'

const defaultStoryArgs = {
  ...defaultOptions,
  enableTouch: true,
  pauseOnHover: true,
  direction: 'horizontal' as const,
  perspective: 1000,
}

const meta: Meta<typeof CubeSlider> = {
  title: 'BoxSlider/CubeSlider',
  component: CubeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A 3D cube slider component that provides cube rotation transitions between slides. Supports progressive drag gestures for touch interaction.',
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
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Cube rotation direction',
      defaultValue: 'horizontal',
    },
    perspective: {
      control: { type: 'number', min: 500, max: 2000, step: 100 },
      description: '3D perspective value in pixels',
      defaultValue: 1000,
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: function DefaultRender(args) {
    return (
      <div style={cubeViewportStyle}>
        <CubeSlider {...args}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
  play: createPlayFn('bs-cube', defaultStoryArgs),
}

export const VerticalRotation: Story = {
  args: {
    speed: 900,
    direction: 'vertical',
    perspective: 1200,
  },
  render: function VerticalRotationRender(args) {
    return (
      <div style={createCubeViewportStyle(1200)}>
        <CubeSlider {...args}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
  play: createPlayFn('bs-cube', {
    ...defaultStoryArgs,
    speed: 900,
    direction: 'vertical',
    perspective: 1200,
  }),
}

export const HighPerspective: Story = {
  args: {
    perspective: 1800,
  },
  render: function HighPerspectiveRender(args) {
    return (
      <div style={createCubeViewportStyle(1800)}>
        <CubeSlider {...args}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
  play: createPlayFn('bs-cube', {
    ...defaultStoryArgs,
    perspective: 1800,
  }),
}

export const LowPerspective: Story = {
  args: {
    speed: 700,
    perspective: 600,
  },
  render: function LowPerspectiveRender(args) {
    return (
      <div style={createCubeViewportStyle(600)}>
        <CubeSlider {...args}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
  play: createPlayFn('bs-cube', {
    ...defaultStoryArgs,
    speed: 700,
    perspective: 600,
  }),
}

export const CustomConfiguration: Story = {
  args: {
    speed: 1200,
    timeout: 0,
    autoScroll: false,
    loop: false,
    startIndex: 1,
    enableTouch: false,
    pauseOnHover: false,
    direction: 'vertical',
    perspective: 1500,
  },
  render: function CustomConfigurationRender(args) {
    return (
      <div style={createCubeViewportStyle(1500)}>
        <CubeSlider {...args}>
          {slideData.map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
  play: createPlayFn('bs-cube', {
    ...defaultStoryArgs,
    speed: 1200,
    timeout: 0,
    autoScroll: false,
    loop: false,
    startIndex: 1,
    enableTouch: false,
    pauseOnHover: false,
    direction: 'vertical',
    perspective: 1500,
  }),
}
