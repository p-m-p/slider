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
    const slider = canvasElement.querySelector('bs-carousel-slider')
    expect(slider).toBeTruthy()

    // Test that slides are present
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(4)

    // Test that images are loaded
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)

    // Test that slide content is present
    const firstSlideTitle = canvasElement.querySelector('h3')
    expect(firstSlideTitle?.textContent).toBe('Beautiful Landscape')
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
    const slider = canvasElement.querySelector('bs-carousel-slider')
    expect(slider).toBeTruthy()

    // Test cover mode attribute
    expect(slider?.getAttribute('cover')).toBe('true')

    // Test pause on hover attribute
    expect(slider?.getAttribute('pause-on-hover')).toBe('true')

    // Test all slides are rendered (5 slides for cover mode)
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(5)
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
    const slider = canvasElement.querySelector('bs-carousel-slider')
    expect(slider).toBeTruthy()

    // Test custom timing function
    expect(slider?.getAttribute('timing-function')).toBe('ease-out')

    // Test custom speed
    expect(slider?.getAttribute('speed')).toBe('1200')

    // Test correct number of slides
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(3)
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
    const slider = canvasElement.querySelector('bs-carousel-slider')
    expect(slider).toBeTruthy()

    // Test fast speed setting
    expect(slider?.getAttribute('speed')).toBe('250')

    // Test short timeout for fast transitions
    expect(slider?.getAttribute('timeout')).toBe('2000')

    // Test ease-in timing function
    expect(slider?.getAttribute('timing-function')).toBe('ease-in')

    // Test swipe enabled
    expect(slider?.getAttribute('swipe')).toBe('true')
  },
}
