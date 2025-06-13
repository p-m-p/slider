import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from '@storybook/test'
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
    timeout: 5000,
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
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-cube-slider')
    expect(slider).toBeTruthy()

    // Test cube slider attributes
    expect(slider?.getAttribute('speed')).toBe('800')
    expect(slider?.getAttribute('direction')).toBe('horizontal')
    expect(slider?.getAttribute('perspective')).toBe('1000')

    // Test viewport wrapper is present
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport).toBeTruthy()
    expect(viewport?.style.perspective).toBe('1000px')

    // Test slides are present
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(4)
  },
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
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-cube-slider')
    expect(slider).toBeTruthy()

    // Test vertical direction
    expect(slider?.getAttribute('direction')).toBe('vertical')

    // Test higher perspective value
    expect(slider?.getAttribute('perspective')).toBe('1200')

    // Test viewport has correct perspective
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport?.style.perspective).toBe('1200px')
  },
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
      <div
        style={{
          width: '600px',
          height: '300px',
          perspective: '1800px',
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
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-cube-slider')
    expect(slider).toBeTruthy()

    // Test high perspective value
    expect(slider?.getAttribute('perspective')).toBe('1800')

    // Test viewport has high perspective
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport?.style.perspective).toBe('1800px')

    // Test horizontal direction
    expect(slider?.getAttribute('direction')).toBe('horizontal')
  },
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
      <div
        style={{
          width: '600px',
          height: '300px',
          perspective: '600px',
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
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-cube-slider')
    expect(slider).toBeTruthy()

    // Test low perspective value
    expect(slider?.getAttribute('perspective')).toBe('600')

    // Test viewport has low perspective
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport?.style.perspective).toBe('600px')

    // Test speed setting
    expect(slider?.getAttribute('speed')).toBe('700')
  },
}
