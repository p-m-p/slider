import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  SliderControls,
  CarouselSlider,
  FadeSlider,
  CubeSlider,
  TileSlider,
} from '~/packages/react'
import {
  slideData,
  createSlide,
  sliderControlsContainerStyle,
  sliderInnerStyle,
  customControlsBackgroundStyle,
  customControlsWrapperStyle,
  customControlsSliderStyle,
  customButtonStyle,
  customPlayButtonStyle,
  customIndexButtonStyle,
  customIndexContainerStyle,
  customStylesConfig,
} from './shared'

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
      defaultValue: 'Next slide',
    },
    prevBtnLabel: {
      control: 'text',
      description: 'Accessible label for previous button',
      defaultValue: 'Previous slide',
    },
    playBtnLabel: {
      control: 'text',
      description: 'Accessible label for play button',
      defaultValue: 'Play slideshow',
    },
    pauseBtnLabel: {
      control: 'text',
      description: 'Accessible label for pause button',
      defaultValue: 'Pause slideshow',
    },
    indexBtnLabel: {
      control: 'text',
      description: 'Accessible label template for index buttons',
      defaultValue: 'Go to slide {index}',
    },
    indexLabel: {
      control: 'text',
      description: 'Accessible label for index container',
      defaultValue: 'Slide navigation',
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
    style: sliderControlsContainerStyle,
  },
  render: function WithCarouselRender(args) {
    return (
      <SliderControls {...args}>
        <CarouselSlider
          speed={500}
          timeout={3000}
          pauseOnHover
          swipe
          style={sliderInnerStyle}>
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
    style: sliderControlsContainerStyle,
  },
  render: function WithFadeSliderRender(args) {
    return (
      <SliderControls {...args}>
        <FadeSlider
          speed={800}
          timeout={2500}
          pauseOnHover
          swipe
          style={sliderInnerStyle}>
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
    style: sliderControlsContainerStyle,
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
            style={sliderInnerStyle}>
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
    style: sliderControlsContainerStyle,
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
          style={sliderInnerStyle}>
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
      ...customStylesConfig,
    },
  },
  render: function CustomStylesRender(args) {
    return (
      <div style={customControlsBackgroundStyle}>
        <SliderControls {...args}>
          <CarouselSlider
            speed={700}
            timeout={4000}
            pauseOnHover
            swipe
            style={sliderInnerStyle}>
            {slideData.map((slide, index) => createSlide(slide, index))}
          </CarouselSlider>
        </SliderControls>
      </div>
    )
  },
}

export const CustomButtons: Story = {
  args: {
    nextBtnLabel: 'Go forward',
    prevBtnLabel: 'Go back',
    playBtnLabel: 'Start slideshow',
    pauseBtnLabel: 'Stop slideshow',
  },
  render: function CustomButtonsRender(args) {
    return (
      <div style={customControlsWrapperStyle}>
        <SliderControls {...args}>
          <CarouselSlider
            speed={600}
            timeout={3000}
            pauseOnHover
            swipe
            style={customControlsSliderStyle}>
            {slideData.map((slide, index) => createSlide(slide, index))}
          </CarouselSlider>

          <button slot="prev-btn" style={customButtonStyle}>
            ← Previous
          </button>

          <button slot="next-btn" style={customButtonStyle}>
            Next →
          </button>

          <button slot="play-btn" style={customPlayButtonStyle}>
            ⏯
          </button>

          <div slot="index" style={customIndexContainerStyle}>
            {slideData.map((_, index) => (
              <button
                key={index}
                data-slide-index={index}
                style={customIndexButtonStyle}>
                {index + 1}
              </button>
            ))}
          </div>
        </SliderControls>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates how to use custom buttons by providing your own button elements in the available slots: `prev-btn`, `next-btn`, `play-btn`, and `index`. Each slot allows complete customization of the button appearance and behavior while maintaining accessibility and functionality.',
      },
    },
  },
}
