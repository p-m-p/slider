import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  SliderControls,
  CarouselSlider,
  FadeSlider,
} from '../packages/react/src/index'
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

export const NoAutoplay: Story = {
  args: {
    nextBtnLabel: 'Next',
    prevBtnLabel: 'Previous',
    style: {
      display: 'block',
      width: '600px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
  },
  render: function NoAutoplayRender(args) {
    return (
      <SliderControls {...args}>
        <CarouselSlider
          speed={500}
          timeout={0}
          swipe
          style={{ display: 'block', width: '100%', height: '300px' }}>
          {slideData
            .slice(0, 3)
            .map((slide, index) => createSlide(slide, index))}
        </CarouselSlider>
      </SliderControls>
    )
  },
}

export const ProfessionalStyled: Story = {
  args: {
    nextBtnLabel: 'NEXT',
    prevBtnLabel: 'PREV',
    playBtnLabel: 'PLAY',
    pauseBtnLabel: 'PAUSE',
    style: {
      display: 'block',
      width: '600px',
      border: 'none',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',

      // BoxSlider control styling with correct CSS custom properties
      '--bs-button-bar-gap': '20px',

      // Control buttons styling
      '--bs-btn-background-color': 'rgba(255, 255, 255, 0.95)',
      '--bs-btn-hover-background-color': '#ffffff',
      '--bs-btn-border-radius': '12px',
      '--bs-btn-size': '48px',

      // Index button styling
      '--bs-index-btn-color': 'rgba(255, 255, 255, 0.5)',
      '--bs-index-btn-hover-color': 'rgba(255, 255, 255, 0.8)',
      '--bs-index-btn-active-color': '#ffffff',
      '--bs-index-btn-size': '14px',
    },
  },
  render: function ProfessionalStyledRender(args) {
    return (
      <div
        style={{
          background: '#f8f9fa',
          padding: '40px',
          borderRadius: '12px',
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
