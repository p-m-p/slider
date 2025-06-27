import type { Meta, StoryObj } from '@storybook/react-vite'
import { CubeSlider } from '~/packages/react'
import {
  slideData,
  createSlide,
  defaultSliderStyle,
  cubeViewportStyle,
  createCubeViewportStyle,
} from './shared'
import { createPlayFn } from './test-utils'

const meta: Meta<typeof CubeSlider> = {
  title: 'BoxSlider/CubeSlider',
  component: CubeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A 3D cube slider component that provides cube rotation transitions between slides.',
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
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Cube rotation direction',
    },
    perspective: {
      control: { type: 'number', min: 500, max: 2000, step: 100 },
      description: '3D perspective value in pixels',
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
    speed: 800,
    timeout: 5000,
    direction: 'horizontal',
    perspective: 1000,
    swipe: true,
    style: defaultSliderStyle,
  },
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
  play: createPlayFn('bs-cube', {
    speed: 800,
    timeout: 5000,
    direction: 'horizontal',
    perspective: 1000,
    swipe: true,
  }),
}

export const VerticalRotation: Story = {
  args: {
    speed: 900,
    timeout: 5000,
    direction: 'vertical',
    perspective: 1200,
    swipe: true,
    style: defaultSliderStyle,
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
    speed: 900,
    timeout: 5000,
    direction: 'vertical',
    perspective: 1200,
    swipe: true,
  }),
}

export const HighPerspective: Story = {
  args: {
    speed: 800,
    timeout: 5000,
    direction: 'horizontal',
    perspective: 1800,
    swipe: true,
    style: defaultSliderStyle,
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
    speed: 800,
    timeout: 5000,
    direction: 'horizontal',
    perspective: 1800,
    swipe: true,
  }),
}

export const LowPerspective: Story = {
  args: {
    speed: 700,
    timeout: 5000,
    direction: 'horizontal',
    perspective: 600,
    swipe: true,
    style: defaultSliderStyle,
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
    speed: 700,
    timeout: 5000,
    direction: 'horizontal',
    perspective: 600,
    swipe: true,
  }),
}

export const CustomConfiguration: Story = {
  args: {
    speed: 1200,
    timeout: 0, // Disable auto-scroll
    autoScroll: false,
    loop: false,
    startIndex: 1,
    swipe: false,
    swipeTolerance: 60,
    pauseOnHover: false,
    direction: 'vertical',
    perspective: 1500,
    style: defaultSliderStyle,
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
    speed: 1200,
    timeout: 0,
    autoScroll: false,
    loop: false,
    startIndex: 1,
    swipe: false,
    swipeTolerance: 60,
    pauseOnHover: false,
    direction: 'vertical',
    perspective: 1500,
  }),
}
