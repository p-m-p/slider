import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from '@storybook/test'
import { defaultOptions } from '~/packages/slider'
import { CubeSlider } from '~/packages/react'
import { slideData, createSlide, defaultSliderStyle } from './shared'

// Web component defaults for cube slider: direction='horizontal', perspective=1000

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
    const slider = canvasElement.querySelector('bs-cube')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(800)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.direction).toBe('horizontal')
    expect(slider?.perspective).toBe(1000)
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)

    // Test viewport wrapper is present
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport).toBeTruthy()

    // Test that slide content is rendered
    const slides = canvasElement.querySelectorAll('.story-slide')
    expect(slides.length).toBeGreaterThan(0)
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
    const slider = canvasElement.querySelector('bs-cube')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(900)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.direction).toBe('vertical')
    expect(slider?.perspective).toBe(1200)
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)

    // Test viewport wrapper is present
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport).toBeTruthy()
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
    const slider = canvasElement.querySelector('bs-cube')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(800)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.direction).toBe('horizontal')
    expect(slider?.perspective).toBe(1800)
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)

    // Test viewport wrapper is present
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport).toBeTruthy()
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
    const slider = canvasElement.querySelector('bs-cube')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(700)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.direction).toBe('horizontal')
    expect(slider?.perspective).toBe(600)
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)

    // Test viewport wrapper is present
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport).toBeTruthy()
  },
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
      <div
        style={{
          width: '600px',
          height: '300px',
          perspective: '1500px',
          overflow: 'hidden',
        }}>
        <CubeSlider {...args}>
          {slideData.map((slide, index) => createSlide(slide, index))}
        </CubeSlider>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-cube')
    expect(slider).toBeTruthy()

    // Test all non-default properties
    expect(slider?.speed).toBe(1200)
    expect(slider?.timeout).toBe(0)
    expect(slider?.autoScroll).toBe(false)
    expect(slider?.loop).toBe(false)
    expect(slider?.startIndex).toBe(1)
    expect(slider?.swipe).toBe(false)
    expect(slider?.swipeTolerance).toBe(60)
    expect(slider?.pauseOnHover).toBe(false)
    expect(slider?.direction).toBe('vertical')
    expect(slider?.perspective).toBe(1500)

    // Test viewport wrapper is present
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport).toBeTruthy()

    // Test that slide content is rendered
    const slides = canvasElement.querySelectorAll('.story-slide')
    expect(slides.length).toBeGreaterThan(0)
  },
}
