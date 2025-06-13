import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from '@storybook/test'
import { CarouselSlider } from '../packages/react/src/index'
import { slideData, createSlide, defaultSliderStyle } from './shared'

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

    // Test speed property
    expect(slider?.speed).toBe(500)

    // Test timeout property
    expect(slider?.timeout).toBe(5000)

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

    // Test cover property
    expect(slider?.cover).toBe(true)

    // Test pauseOnHover property
    expect(slider?.pauseOnHover).toBe(true)

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

    // Test custom timing function
    expect(slider?.timingFunction).toBe('ease-out')

    // Test custom speed
    expect(slider?.speed).toBe(1200)

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

    // Test fast speed setting
    expect(slider?.speed).toBe(250)

    // Test short timeout for fast transitions
    expect(slider?.timeout).toBe(2000)

    // Test ease-in timing function
    expect(slider?.timingFunction).toBe('ease-in')

    // Test swipe enabled
    expect(slider?.swipe).toBe(true)
  },
}
