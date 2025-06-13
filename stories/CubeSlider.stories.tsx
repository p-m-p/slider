import type { Meta, StoryObj } from '@storybook/react-vite'
import { CubeSlider } from '../packages/react/src/index'
import { slideData, createSlide, defaultSliderStyle } from './shared'

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
    timeout: 0,
    direction: 'horizontal',
    perspective: 1000,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function DefaultRender(args) {
    return (
      <div
        style={{
          width: '600px',
          height: '300px',
          perspective: '1000px',
          overflow: 'hidden',
        }}>
        <CubeSlider {...args}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
}

export const VerticalRotation: Story = {
  args: {
    speed: 900,
    timeout: 0,
    direction: 'vertical',
    perspective: 1200,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function VerticalRotationRender(args) {
    return (
      <div
        style={{
          width: '600px',
          height: '300px',
          perspective: '1200px',
          overflow: 'hidden',
        }}>
        <CubeSlider {...args}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
}

export const AutoRotate: Story = {
  args: {
    speed: 1000,
    timeout: 3500,
    direction: 'horizontal',
    perspective: 1000,
    pauseOnHover: true,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function AutoRotateRender(args) {
    return (
      <div
        style={{
          width: '600px',
          height: '300px',
          perspective: '1000px',
          overflow: 'hidden',
        }}>
        <CubeSlider {...args}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
}
