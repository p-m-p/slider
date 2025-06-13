import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from '@storybook/test'
import { TileSlider } from '../packages/react/src/index'
import { slideData, createSlide, defaultSliderStyle } from './shared'

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
    const slider = canvasElement.querySelector('bs-tile-slider')
    expect(slider).toBeTruthy()

    // Test tile slider attributes
    expect(slider?.getAttribute('tile-effect')).toBe('fade')
    expect(slider?.getAttribute('rows')).toBe('4')
    expect(slider?.getAttribute('row-offset')).toBe('100')

    // Test slides are present
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(4)
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
    const slider = canvasElement.querySelector('bs-tile-slider')
    expect(slider).toBeTruthy()

    // Test flip effect
    expect(slider?.getAttribute('tile-effect')).toBe('flip')

    // Test 5 rows configuration
    expect(slider?.getAttribute('rows')).toBe('5')

    // Test row offset
    expect(slider?.getAttribute('row-offset')).toBe('120')
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
    const slider = canvasElement.querySelector('bs-tile-slider')
    expect(slider).toBeTruthy()

    // Test many rows (8)
    expect(slider?.getAttribute('rows')).toBe('8')

    // Test faster row offset
    expect(slider?.getAttribute('row-offset')).toBe('60')

    // Test speed setting
    expect(slider?.getAttribute('speed')).toBe('1200')
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
    const slider = canvasElement.querySelector('bs-tile-slider')
    expect(slider).toBeTruthy()

    // Test no offset (simultaneous tiles)
    expect(slider?.getAttribute('row-offset')).toBe('0')

    // Test 6 rows
    expect(slider?.getAttribute('rows')).toBe('6')

    // Test slides count
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(3)
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
    const slider = canvasElement.querySelector('bs-tile-slider')
    expect(slider).toBeTruthy()

    // Test high offset (delayed tiles)
    expect(slider?.getAttribute('row-offset')).toBe('200')

    // Test fade effect
    expect(slider?.getAttribute('tile-effect')).toBe('fade')

    // Test all slides rendered
    const slides = canvasElement.querySelectorAll('.slide')
    expect(slides).toHaveLength(5)
  },
}
