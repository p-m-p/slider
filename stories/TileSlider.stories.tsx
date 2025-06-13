import type { Meta, StoryObj } from '@storybook/react-vite'
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
    timeout: 0,
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
}

export const FlipEffect: Story = {
  args: {
    speed: 1000,
    timeout: 0,
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
}

export const AutoTiles: Story = {
  args: {
    speed: 900,
    timeout: 3000,
    tileEffect: 'flip',
    rows: 6,
    rowOffset: 80,
    pauseOnHover: true,
    swipe: true,
    style: defaultSliderStyle,
  },
  render: function AutoTilesRender(args) {
    return (
      <TileSlider {...args}>
        {slideData.map((slide, index) => createSlide(slide, index))}
      </TileSlider>
    )
  },
}
