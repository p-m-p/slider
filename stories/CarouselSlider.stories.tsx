import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from '@storybook/test'
import { defaultOptions } from '../packages/slider/src/box-slider'
import { CarouselSlider } from '../packages/react/src/index'
import { slideData, createSlide, defaultSliderStyle } from './shared'

// Web component default for carousel timing function
const carouselDefaults = {
  timingFunction: 'ease-out', // From web component default
  cover: false, // From web component default
}

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
  play: async ({ canvasElement }) => {
    // Test that the slider is rendered
    const slider = canvasElement.querySelector('bs-carousel')
    expect(slider).toBeTruthy()

    // Test all core properties
    expect(slider?.speed).toBe(500)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.swipe).toBe(true)
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)

    // Test carousel-specific properties with defaults
    expect(slider?.cover).toBe(carouselDefaults.cover)
    expect(slider?.timingFunction).toBe(carouselDefaults.timingFunction)

    // Test that images are rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
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
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-carousel')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(600)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.cover).toBe(true)
    expect(slider?.swipe).toBe(true)
    expect(slider?.pauseOnHover).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(true) // Default when timeout > 0
    expect(slider?.loop).toBe(true) // Default value
    expect(slider?.startIndex).toBe(0) // Default value
    expect(slider?.swipeTolerance).toBe(30) // Default value
    expect(slider?.timingFunction).toBe('ease-out') // Default value

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
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
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-carousel')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(1200)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.timingFunction).toBe('ease-out')
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)
    expect(slider?.cover).toBe(carouselDefaults.cover)

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
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
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-carousel')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(250)
    expect(slider?.timeout).toBe(2000)
    expect(slider?.timingFunction).toBe('ease-in')
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)
    expect(slider?.cover).toBe(carouselDefaults.cover)
  },
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
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-carousel')
    expect(slider).toBeTruthy()

    // Test all non-default properties
    expect(slider?.speed).toBe(1000)
    expect(slider?.timeout).toBe(0)
    expect(slider?.autoScroll).toBe(false)
    expect(slider?.loop).toBe(false)
    expect(slider?.startIndex).toBe(2)
    expect(slider?.swipe).toBe(false)
    expect(slider?.swipeTolerance).toBe(50)
    expect(slider?.pauseOnHover).toBe(false)
    expect(slider?.cover).toBe(true)
    expect(slider?.timingFunction).toBe('linear')

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
}
