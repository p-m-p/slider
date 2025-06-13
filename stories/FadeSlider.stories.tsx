import type { Meta, StoryObj } from '@storybook/react-vite'
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
}
