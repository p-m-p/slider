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

      // Professional control styling with CSS variables
      '--bx-controls-position': 'absolute',
      '--bx-controls-bottom': '0',
      '--bx-controls-left': '0',
      '--bx-controls-right': '0',
      '--bx-controls-background':
        'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 100%)',
      '--bx-controls-padding': '30px 40px 25px',
      '--bx-controls-display': 'flex',
      '--bx-controls-justify-content': 'space-between',
      '--bx-controls-align-items': 'center',

      // Navigation buttons - sleek rectangular design
      '--bx-btn-background': 'rgba(255, 255, 255, 0.95)',
      '--bx-btn-color': '#2c3e50',
      '--bx-btn-border': 'none',
      '--bx-btn-border-radius': '8px',
      '--bx-btn-padding': '12px 20px',
      '--bx-btn-font-size': '13px',
      '--bx-btn-font-weight': '600',
      '--bx-btn-letter-spacing': '0.5px',
      '--bx-btn-text-transform': 'uppercase',
      '--bx-btn-box-shadow': '0 4px 12px rgba(0,0,0,0.15)',
      '--bx-btn-transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

      // Button hover effects
      '--bx-btn-hover-background': '#ffffff',
      '--bx-btn-hover-color': '#1a252f',
      '--bx-btn-hover-transform': 'translateY(-2px)',
      '--bx-btn-hover-box-shadow': '0 8px 20px rgba(0,0,0,0.25)',

      // Play/Pause button special styling
      '--bx-play-pause-background': '#3498db',
      '--bx-play-pause-color': 'white',
      '--bx-play-pause-hover-background': '#2980b9',
      '--bx-play-pause-border-radius': '50px',
      '--bx-play-pause-padding': '14px 24px',
      '--bx-play-pause-font-weight': '700',

      // Index buttons - modern pill design
      '--bx-pager-position': 'absolute',
      '--bx-pager-top': '20px',
      '--bx-pager-right': '25px',
      '--bx-pager-display': 'flex',
      '--bx-pager-gap': '6px',
      '--bx-pager-btn-width': '32px',
      '--bx-pager-btn-height': '6px',
      '--bx-pager-btn-border-radius': '3px',
      '--bx-pager-btn-background': 'rgba(255, 255, 255, 0.4)',
      '--bx-pager-btn-border': 'none',
      '--bx-pager-btn-transition': 'all 0.4s ease',

      // Index button states
      '--bx-pager-btn-hover-background': 'rgba(255, 255, 255, 0.7)',
      '--bx-pager-btn-hover-transform': 'scaleY(1.5)',
      '--bx-pager-btn-active-background': '#ffffff',
      '--bx-pager-btn-active-transform': 'scaleY(2)',
      '--bx-pager-btn-active-box-shadow': '0 0 8px rgba(255,255,255,0.6)',
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
