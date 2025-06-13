import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from '@storybook/test'
import { FadeSlider } from '../packages/react/src/index'
import { slideData, createSlide, defaultSliderStyle } from './shared'

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
    const slider = canvasElement.querySelector('bs-fade-slider')
    expect(slider).toBeTruthy()

    // Test fade slider attributes
    expect(slider?.getAttribute('speed')).toBe('600')
    expect(slider?.getAttribute('timing-function')).toBe('ease-in-out')
    expect(slider?.getAttribute('swipe')).toBe('true')

    // Test slides are present
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(4)

    // Test first slide content
    const firstSlideTitle = canvasElement.querySelector('h3')
    expect(firstSlideTitle?.textContent).toBe('Beautiful Landscape')
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
    const slider = canvasElement.querySelector('bs-fade-slider')
    expect(slider).toBeTruthy()

    // Test ease-in timing function
    expect(slider?.getAttribute('timing-function')).toBe('ease-in')

    // Test pause on hover
    expect(slider?.getAttribute('pause-on-hover')).toBe('true')

    // Test all slides rendered
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(5)
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
    const slider = canvasElement.querySelector('bs-fade-slider')
    expect(slider).toBeTruthy()

    // Test linear timing function
    expect(slider?.getAttribute('timing-function')).toBe('linear')

    // Test speed setting
    expect(slider?.getAttribute('speed')).toBe('1000')

    // Test correct number of slides
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(3)
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
    const slider = canvasElement.querySelector('bs-fade-slider')
    expect(slider).toBeTruthy()

    // Test fast fade settings
    expect(slider?.getAttribute('speed')).toBe('400')
    expect(slider?.getAttribute('timeout')).toBe('3000')
    expect(slider?.getAttribute('timing-function')).toBe('ease-out')

    // Test slides rendered
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(4)
  },
}
