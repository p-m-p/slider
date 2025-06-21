import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  SliderControls,
  CarouselSlider,
  FadeSlider,
  CubeSlider,
  TileSlider,
} from '~/packages/react'
import { slideData, createSlide } from './shared'

const meta: Meta<typeof SliderControls> = {
  title: 'BoxSlider/SliderControls',
  component: SliderControls,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A controls wrapper component that adds navigation buttons and indicators to any slider component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    nextBtnLabel: {
      control: 'text',
      description: 'Accessible label for next button',
    },
    prevBtnLabel: {
      control: 'text',
      description: 'Accessible label for previous button',
    },
    playBtnLabel: {
      control: 'text',
      description: 'Accessible label for play button',
    },
    pauseBtnLabel: {
      control: 'text',
      description: 'Accessible label for pause button',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithCarousel: Story = {
  args: {
    nextBtnLabel: 'Next slide',
    prevBtnLabel: 'Previous slide',
    playBtnLabel: 'Play slideshow',
    pauseBtnLabel: 'Pause slideshow',
    style: {
      display: 'block',
      width: '600px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  render: function WithCarouselRender(args) {
    return (
      <SliderControls {...args}>
        <CarouselSlider
          speed={500}
          timeout={3000}
          pauseOnHover
          swipe
          style={{ display: 'block', width: '100%', height: '300px' }}>
          {slideData.map((slide, index) => createSlide(slide, index))}
        </CarouselSlider>
      </SliderControls>
    )
  },
}

export const WithFadeSlider: Story = {
  args: {
    nextBtnLabel: 'Next image',
    prevBtnLabel: 'Previous image',
    playBtnLabel: 'Start slideshow',
    pauseBtnLabel: 'Stop slideshow',
    style: {
      display: 'block',
      width: '600px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  render: function WithFadeSliderRender(args) {
    return (
      <SliderControls {...args}>
        <FadeSlider
          speed={800}
          timeout={2500}
          pauseOnHover
          swipe
          style={{ display: 'block', width: '100%', height: '300px' }}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </FadeSlider>
      </SliderControls>
    )
  },
}

export const WithCubeSlider: Story = {
  args: {
    nextBtnLabel: 'Rotate →',
    prevBtnLabel: '← Rotate',
    playBtnLabel: 'Auto Rotate',
    pauseBtnLabel: 'Stop',
    style: {
      display: 'block',
      width: '600px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  render: function WithCubeSliderRender(args) {
    return (
      <SliderControls {...args}>
        <div
          style={{
            width: '100%',
            height: '300px',
            perspective: '1000px',
          }}>
          <CubeSlider
            speed={800}
            timeout={5000}
            direction="horizontal"
            perspective={1000}
            swipe
            style={{ display: 'block', width: '100%', height: '300px' }}>
            {slideData
              .slice(0, 4)
              .map((slide, index) => createSlide(slide, index))}
          </CubeSlider>
        </div>
      </SliderControls>
    )
  },
}

export const WithTileSlider: Story = {
  args: {
    nextBtnLabel: 'Next Tiles',
    prevBtnLabel: 'Previous Tiles',
    playBtnLabel: 'Auto Tiles',
    pauseBtnLabel: 'Pause',
    style: {
      display: 'block',
      width: '600px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  render: function WithTileSliderRender(args) {
    return (
      <SliderControls {...args}>
        <TileSlider
          speed={900}
          timeout={5000}
          tileEffect="flip"
          rows={5}
          rowOffset={100}
          swipe
          style={{ display: 'block', width: '100%', height: '300px' }}>
          {slideData
            .slice(0, 4)
            .map((slide, index) => createSlide(slide, index))}
        </TileSlider>
      </SliderControls>
    )
  },
}

export const CustomStyles: Story = {
  args: {
    nextBtnLabel: '→',
    prevBtnLabel: '←',
    playBtnLabel: '▶',
    pauseBtnLabel: '⏸',
    style: {
      display: 'block',
      width: '600px',
      border: 'none',
      overflow: 'hidden',
      position: 'relative',

      // BoxSlider control styling with supported CSS custom properties
      '--bs-button-bar-gap': '16px',

      // Control buttons styling
      '--bs-btn-background-color': 'rgba(255, 255, 255, 0.2)',
      '--bs-btn-hover-background-color': 'rgba(255, 255, 255, 0.3)',
      '--bs-btn-border-radius': '50%',
      '--bs-btn-size': '44px',

      // Custom SVG icons for control buttons with better styling
      '--bs-next-icon': `url("data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `)}")`,

      '--bs-prev-icon': `url("data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `)}")`,

      '--bs-play-icon': `url("data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M8 5V19L19 12L8 5Z" fill="white" stroke="white" stroke-width="1" stroke-linejoin="round"/>
        </svg>
      `)}")`,

      '--bs-pause-icon': `url("data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="4" width="4" height="16" fill="white"/>
          <rect x="14" y="4" width="4" height="16" fill="white"/>
        </svg>
      `)}")`,

      // Index button styling
      '--bs-index-btn-color': 'rgba(255, 255, 255, 0.3)',
      '--bs-index-btn-hover-color': 'rgba(255, 255, 255, 0.6)',
      '--bs-index-btn-active-color': '#ffffff',
      '--bs-index-btn-size': '14px',
    },
  },
  render: function CustomStylesRender(args) {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
          boxShadow:
            '0 25px 50px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.1)',
          padding: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SliderControls {...args}>
          <CarouselSlider
            speed={700}
            timeout={4000}
            pauseOnHover
            swipe
            style={{ display: 'block', width: '100%', height: '300px' }}>
            {slideData.map((slide, index) => createSlide(slide, index))}
          </CarouselSlider>
        </SliderControls>
      </div>
    )
  },
}
