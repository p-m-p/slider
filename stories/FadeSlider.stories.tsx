import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from '@storybook/test'
import { defaultOptions } from '../packages/slider/src/box-slider'
import { FadeSlider } from '../packages/react/src/index'
import { slideData, createSlide, defaultSliderStyle } from './shared'

// Web component default for fade timing function: 'ease-in-out'

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
    timingFunction: {
      control: { type: 'select' },
      options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'],
      description: 'CSS timing function for fade transitions',
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
    speed: 600,
    timeout: 5000,
    timingFunction: 'ease-in-out',
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function DefaultRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-fade')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(600)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.timingFunction).toBe('ease-in-out')
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
}

export const EaseInTiming: Story = {
  args: {
    speed: 800,
    timeout: 5000,
    timingFunction: 'ease-in',
    swipe: true,
    pauseOnHover: true,
    style: defaultSliderStyle,
  },
  render: function EaseInTimingRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-fade')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(800)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.timingFunction).toBe('ease-in')
    expect(slider?.swipe).toBe(true)
    expect(slider?.pauseOnHover).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(true) // Default when timeout > 0
    expect(slider?.loop).toBe(true) // Default value
    expect(slider?.startIndex).toBe(0) // Default value
    expect(slider?.swipeTolerance).toBe(30) // Default value

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
}

export const LinearFade: Story = {
  args: {
    speed: 1000,
    timeout: 5000,
    timingFunction: 'linear',
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function LinearFadeRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.slice(0, 3).map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-fade')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(1000)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.timingFunction).toBe('linear')
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
}

export const FastFade: Story = {
  args: {
    speed: 400,
    timeout: 3000,
    timingFunction: 'ease-out',
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function FastFadeRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-fade')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(400)
    expect(slider?.timeout).toBe(3000)
    expect(slider?.timingFunction).toBe('ease-out')
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
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
    style: defaultSliderStyle,
  },
  render: function CustomConfigurationRender(args) {
    return (
      <FadeSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </FadeSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-fade')
    expect(slider).toBeTruthy()

    // Test all non-default properties
    expect(slider?.speed).toBe(1200)
    expect(slider?.timeout).toBe(0)
    expect(slider?.autoScroll).toBe(false)
    expect(slider?.loop).toBe(false)
    expect(slider?.startIndex).toBe(3)
    expect(slider?.swipe).toBe(false)
    expect(slider?.swipeTolerance).toBe(75)
    expect(slider?.pauseOnHover).toBe(false)
    expect(slider?.timingFunction).toBe('ease')

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
}
