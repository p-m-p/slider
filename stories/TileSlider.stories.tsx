import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from '@storybook/test'
import { defaultOptions } from '../packages/slider/src/box-slider'
import { TileSlider } from '../packages/react/src/index'
import { slideData, createSlide, defaultSliderStyle } from './shared'

// Web component defaults for tile slider: rows=8, rowOffset=50, tileEffect='flip'

const meta: Meta<typeof TileSlider> = {
  title: 'BoxSlider/TileSlider',
  component: TileSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tile slider component that provides animated tile-based transitions between slides.',
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
    tileEffect: {
      control: { type: 'select' },
      options: ['fade', 'flip'],
      description: 'Type of tile transition effect',
    },
    rows: {
      control: { type: 'number', min: 2, max: 8 },
      description: 'Number of tile rows',
    },
    rowOffset: {
      control: { type: 'number', min: 0, max: 300, step: 25 },
      description: 'Delay offset between rows in milliseconds',
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
    tileEffect: 'fade',
    rows: 4,
    rowOffset: 100,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function DefaultRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-tile')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(800)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.tileEffect).toBe('fade')
    expect(slider?.rows).toBe(4)
    expect(slider?.rowOffset).toBe(100)
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

export const FlipEffect: Story = {
  args: {
    speed: 1000,
    timeout: 5000,
    tileEffect: 'flip',
    rows: 5,
    rowOffset: 120,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function FlipEffectRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-tile')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(1000)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.tileEffect).toBe('flip')
    expect(slider?.rows).toBe(5)
    expect(slider?.rowOffset).toBe(120)
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)
  },
}

export const ManyRows: Story = {
  args: {
    speed: 1200,
    timeout: 5000,
    tileEffect: 'fade',
    rows: 8,
    rowOffset: 60,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function ManyRowsRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.slice(0, 4).map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-tile')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(1200)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.tileEffect).toBe('fade')
    expect(slider?.rows).toBe(8)
    expect(slider?.rowOffset).toBe(60)
    expect(slider?.swipe).toBe(true)

    // Test default values for unset properties
    expect(slider?.autoScroll).toBe(defaultOptions.autoScroll)
    expect(slider?.loop).toBe(defaultOptions.loop)
    expect(slider?.startIndex).toBe(defaultOptions.startIndex)
    expect(slider?.swipeTolerance).toBe(defaultOptions.swipeTolerance)
    expect(slider?.pauseOnHover).toBe(defaultOptions.pauseOnHover)
  },
}

export const NoOffset: Story = {
  args: {
    speed: 800,
    timeout: 5000,
    tileEffect: 'flip',
    rows: 6,
    rowOffset: 0,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function NoOffsetRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.slice(0, 3).map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-tile')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(800)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.tileEffect).toBe('flip')
    expect(slider?.rows).toBe(6)
    expect(slider?.rowOffset).toBe(0)
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

export const HighOffset: Story = {
  args: {
    speed: 1000,
    timeout: 5000,
    tileEffect: 'fade',
    rows: 4,
    rowOffset: 200,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function HighOffsetRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-tile')
    expect(slider).toBeTruthy()

    // Test all explicitly set properties
    expect(slider?.speed).toBe(1000)
    expect(slider?.timeout).toBe(5000)
    expect(slider?.tileEffect).toBe('fade')
    expect(slider?.rows).toBe(4)
    expect(slider?.rowOffset).toBe(200)
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
    speed: 1500,
    timeout: 0, // Disable auto-scroll
    autoScroll: false,
    loop: false,
    startIndex: 4,
    swipe: false,
    swipeTolerance: 100,
    pauseOnHover: false,
    tileEffect: 'flip',
    rows: 6,
    rowOffset: 150,
    style: defaultSliderStyle,
  },
  render: function CustomConfigurationRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('bs-tile')
    expect(slider).toBeTruthy()

    // Test all non-default properties
    expect(slider?.speed).toBe(1500)
    expect(slider?.timeout).toBe(0)
    expect(slider?.autoScroll).toBe(false)
    expect(slider?.loop).toBe(false)
    expect(slider?.startIndex).toBe(4)
    expect(slider?.swipe).toBe(false)
    expect(slider?.swipeTolerance).toBe(100)
    expect(slider?.pauseOnHover).toBe(false)
    expect(slider?.tileEffect).toBe('flip')
    expect(slider?.rows).toBe(6)
    expect(slider?.rowOffset).toBe(150)

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
  },
}
