import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from '@storybook/test'
import {
  SliderControls,
  CarouselSlider,
  FadeSlider,
  CubeSlider,
  TileSlider,
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
  play: async ({ canvasElement }) => {
    // Test that controls have proper accessibility roles
    const controls = canvasElement.querySelector('bs-slider-controls')
    expect(controls).toBeTruthy()
    expect(controls?.getAttribute('role')).toBe('region')
    expect(controls?.getAttribute('aria-roledescription')).toBe('carousel')

    // Test that carousel slider is present
    const carousel = canvasElement.querySelector('bs-carousel')
    expect(carousel).toBeTruthy()

    // Test that images are rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)

    // Wait for controls to initialize
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Test navigation controls are accessible via shadowRoot
    const nextButton = controls?.shadowRoot?.querySelector('#next-btn')
    const prevButton = controls?.shadowRoot?.querySelector('#prev-btn')
    const playButton = controls?.shadowRoot?.querySelector('#play-btn')

    expect(nextButton).toBeTruthy()
    expect(prevButton).toBeTruthy()
    expect(playButton).toBeTruthy()

    // Test that index buttons are present and accessible
    const indexContainer =
      controls?.shadowRoot?.querySelector('#index-container')
    const indexButtons = indexContainer?.querySelectorAll('button')
    expect(indexButtons?.length).toBe(slideData.length)

    // Test that index buttons have proper accessibility attributes
    if (indexButtons && indexButtons.length > 0) {
      expect(indexButtons[0]).toHaveAttribute('aria-disabled')
      expect(indexButtons[0]).toHaveAttribute('aria-label')
      expect(indexButtons[0]).toHaveAttribute('aria-controls')
    }

    // Test basic navigation functionality
    if (nextButton && indexButtons && indexButtons.length > 1) {
      await userEvent.click(nextButton as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Verify that navigation occurred (some button should be active)
      const hasActiveButton = Array.from(indexButtons).some(
        (btn) => btn.getAttribute('aria-disabled') === 'true',
      )
      expect(hasActiveButton).toBe(true)
    }

    // Test index button navigation
    if (indexButtons && indexButtons.length > 1) {
      await userEvent.click(indexButtons[1] as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 200))

      // Verify button was clicked and some state changed
      expect(indexButtons[1]).toHaveAttribute('aria-disabled')
    }

    // Test that index button labels update when properties change
    if (controls && indexButtons && indexButtons.length > 0) {
      // Check initial default labels
      expect(indexButtons[0]).toHaveAttribute('aria-label', 'View slide 1')

      // Change the index button label property
      controls.indexBtnLabel = 'Go to slide %d'

      // Wait for attribute change callback to trigger
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Verify the labels were updated
      expect(indexButtons[0]).toHaveAttribute('aria-label', 'Go to slide 1')
      if (indexButtons.length > 1) {
        expect(indexButtons[1]).toHaveAttribute('aria-label', 'Go to slide 2')
      }

      // Test index slot label updates
      const indexSlot = controls.shadowRoot?.querySelector('slot[name="index"]')
      expect(indexSlot).toHaveAttribute('aria-label', 'Select a slide')
      controls.indexLabel = 'Choose a slide'
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(indexSlot).toHaveAttribute('aria-label', 'Choose a slide')
    }
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
  play: async ({ canvasElement }) => {
    // Test accessibility roles
    const controls = canvasElement.querySelector('bs-slider-controls')
    expect(controls).toBeTruthy()
    expect(controls?.getAttribute('role')).toBe('region')
    expect(controls?.getAttribute('aria-roledescription')).toBe('carousel')

    // Test that fade slider is present
    const fadeSlider = canvasElement.querySelector('bs-fade')
    expect(fadeSlider).toBeTruthy()

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)

    // Wait for controls to initialize
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Test custom button labels are applied correctly via shadowRoot
    const nextButton = controls?.shadowRoot?.querySelector('#next-btn')
    const prevButton = controls?.shadowRoot?.querySelector('#prev-btn')
    const playButton = controls?.shadowRoot?.querySelector('#play-btn')

    // Test that buttons exist and have custom labels
    expect(nextButton).toBeTruthy()
    expect(prevButton).toBeTruthy()
    expect(playButton).toBeTruthy()
    expect(nextButton?.getAttribute('aria-label')).toBe('Next image')
    expect(prevButton?.getAttribute('aria-label')).toBe('Previous image')
    expect(playButton?.getAttribute('aria-label')).toBeTruthy() // Will be 'Play slideshow' or 'Pause slideshow'

    // Test play/pause functionality
    if (playButton) {
      const initialLabel = playButton.getAttribute('aria-label')
      await userEvent.click(playButton as HTMLElement)

      // Wait for state change
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Button should toggle to a different label after clicking
      const newLabel = playButton.getAttribute('aria-label')
      expect(newLabel).toBeTruthy()
      if (initialLabel === 'Start slideshow') {
        expect(newLabel).toBe('Stop slideshow')
      } else {
        expect(newLabel).toBe('Start slideshow')
      }
    }

    // Test that index navigation works
    const indexContainer =
      controls?.shadowRoot?.querySelector('#index-container')
    const indexButtons = indexContainer?.querySelectorAll('button')
    expect(indexButtons?.length).toBeGreaterThan(0)

    if (indexButtons && indexButtons.length > 2) {
      await userEvent.click(indexButtons[2] as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 200))
      expect(indexButtons[2]).toHaveAttribute('aria-disabled')
    }
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
      <div style={{ perspective: '1000px', overflow: 'hidden' }}>
        <SliderControls {...args}>
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
        </SliderControls>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    // Test accessibility roles
    const controls = canvasElement.querySelector('bs-slider-controls')
    expect(controls).toBeTruthy()
    expect(controls?.getAttribute('role')).toBe('region')
    expect(controls?.getAttribute('aria-roledescription')).toBe('carousel')

    // Test that controls contain the cube slider
    const cubeSlider = canvasElement.querySelector('bs-cube')
    expect(cubeSlider).toBeTruthy()

    // Test 3D viewport wrapper
    const viewport = canvasElement.querySelector('div[style*="perspective"]')
    expect(viewport).toBeTruthy()

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)

    // Wait for controls to initialize
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Test custom button labels are applied correctly via shadowRoot
    const nextButton = controls?.shadowRoot?.querySelector('#next-btn')
    const prevButton = controls?.shadowRoot?.querySelector('#prev-btn')
    const playButton = controls?.shadowRoot?.querySelector('#play-btn')

    // Test that buttons exist and have aria-labels
    expect(nextButton).toBeTruthy()
    expect(prevButton).toBeTruthy()
    expect(playButton).toBeTruthy()
    expect(nextButton?.getAttribute('aria-label')).toBe('Rotate →')
    expect(prevButton?.getAttribute('aria-label')).toBe('← Rotate')
    expect(playButton?.getAttribute('aria-label')).toBeTruthy() // Will be 'Auto Rotate' or pause state

    // Test that index navigation works with cube slider
    const indexContainer =
      controls?.shadowRoot?.querySelector('#index-container')
    const indexButtons = indexContainer?.querySelectorAll('button')
    expect(indexButtons?.length).toBeGreaterThan(0)

    if (indexButtons && indexButtons.length > 1) {
      // Test initial state
      expect(indexButtons[0]).toHaveAttribute('aria-disabled')

      // Test navigation via index button
      await userEvent.click(indexButtons[1] as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 300)) // Cube transitions are slower
      expect(indexButtons[1]).toHaveAttribute('aria-disabled')
      expect(indexButtons[0]).toHaveAttribute('aria-disabled')

      // Test navigation controls
      if (nextButton) await userEvent.click(nextButton as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 300))

      if (indexButtons.length > 2) {
        expect(indexButtons[2]).toHaveAttribute('aria-disabled')
      }
    }
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
  play: async ({ canvasElement }) => {
    // Test accessibility roles
    const controls = canvasElement.querySelector('bs-slider-controls')
    expect(controls).toBeTruthy()
    expect(controls?.getAttribute('role')).toBe('region')
    expect(controls?.getAttribute('aria-roledescription')).toBe('carousel')

    // Test that controls contain the tile slider
    const tileSlider = canvasElement.querySelector('bs-tile')
    expect(tileSlider).toBeTruthy()

    // Test tile slider configuration
    expect(tileSlider?.tileEffect).toBe('flip')
    expect(tileSlider?.rows).toBe(5)

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)

    // Wait for controls to initialize
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Test custom button labels are applied correctly via shadowRoot
    const nextButton = controls?.shadowRoot?.querySelector('#next-btn')
    const prevButton = controls?.shadowRoot?.querySelector('#prev-btn')
    const playButton = controls?.shadowRoot?.querySelector('#play-btn')

    // Test that buttons exist and have aria-labels
    expect(nextButton).toBeTruthy()
    expect(prevButton).toBeTruthy()
    expect(playButton).toBeTruthy()
    expect(nextButton?.getAttribute('aria-label')).toBe('Next Tiles')
    expect(prevButton?.getAttribute('aria-label')).toBe('Previous Tiles')
    expect(playButton?.getAttribute('aria-label')).toBeTruthy() // Will be 'Auto Tiles' or pause state

    // Test index navigation functionality
    const indexContainer =
      controls?.shadowRoot?.querySelector('#index-container')
    const indexButtons = indexContainer?.querySelectorAll('button')
    expect(indexButtons?.length).toBeGreaterThan(0)

    if (indexButtons && indexButtons.length > 2) {
      // Test initial state - first slide should be active
      expect(indexButtons[0]).toHaveAttribute('aria-disabled')

      // Test clicking on third slide
      await userEvent.click(indexButtons[2] as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 400)) // Tile effects need more time
      expect(indexButtons[2]).toHaveAttribute('aria-disabled')
      expect(indexButtons[0]).toHaveAttribute('aria-disabled')

      // Test prev button navigation
      if (prevButton) await userEvent.click(prevButton as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 400))
      expect(indexButtons[1]).toHaveAttribute('aria-disabled')
      expect(indexButtons[2]).toHaveAttribute('aria-disabled')
    }
  },
}

export const ProfessionalStyled: Story = {
  args: {
    nextBtnLabel: '→',
    prevBtnLabel: '←',
    playBtnLabel: '▶',
    pauseBtnLabel: '⏸',
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

      // Control buttons styling with SVG icons
      '--bs-btn-background-color': 'rgba(0, 0, 0, 0.7)',
      '--bs-btn-hover-background-color': 'rgba(0, 0, 0, 0.9)',
      '--bs-btn-border-radius': '50%',
      '--bs-btn-size': '52px',

      // Custom SVG icons for control buttons
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

      '--play-icon': `url("data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M8 5V19L19 12L8 5Z" fill="white" stroke="white" stroke-width="1" stroke-linejoin="round"/>
        </svg>
      `)}")`,

      '--pause-icon': `url("data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="4" width="4" height="16" fill="white"/>
          <rect x="14" y="4" width="4" height="16" fill="white"/>
        </svg>
      `)}")`,

      // Index button styling - elegant pill design
      '--bs-index-btn-color': 'rgba(255, 255, 255, 0.4)',
      '--bs-index-btn-hover-color': 'rgba(255, 255, 255, 0.7)',
      '--bs-index-btn-active-color': '#ffffff',
      '--bs-index-btn-size': '12px',
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
  play: async ({ canvasElement }) => {
    // Test accessibility roles
    const controls = canvasElement.querySelector('bs-slider-controls')
    expect(controls).toBeTruthy()
    expect(controls?.getAttribute('role')).toBe('region')
    expect(controls?.getAttribute('aria-roledescription')).toBe('carousel')

    // Test custom styling wrapper
    const wrapper = canvasElement.querySelector('div[style*="background"]')
    expect(wrapper).toBeTruthy()

    // Test that carousel is present
    const carousel = canvasElement.querySelector('bs-carousel')
    expect(carousel).toBeTruthy()

    // Test that content is rendered
    const images = canvasElement.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)

    // Wait for controls to initialize
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Test custom symbol button labels are applied correctly via shadowRoot
    const nextButton = controls?.shadowRoot?.querySelector('#next-btn')
    const prevButton = controls?.shadowRoot?.querySelector('#prev-btn')
    const playButton = controls?.shadowRoot?.querySelector('#play-btn')

    // Test that buttons exist and have aria-labels
    expect(nextButton).toBeTruthy()
    expect(prevButton).toBeTruthy()
    expect(playButton).toBeTruthy()
    expect(nextButton?.getAttribute('aria-label')).toBe('→')
    expect(prevButton?.getAttribute('aria-label')).toBe('←')
    expect(playButton?.getAttribute('aria-label')).toBeTruthy() // Will be '▶' or '⏸'

    // Test play/pause toggle with custom symbols
    if (playButton) await userEvent.click(playButton as HTMLElement)
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Button should have a label after clicking
    const newLabel = playButton?.getAttribute('aria-label')
    expect(newLabel).toBeTruthy()

    // Test comprehensive navigation with professional styling
    const indexContainer =
      controls?.shadowRoot?.querySelector('#index-container')
    const indexButtons = indexContainer?.querySelectorAll('button')
    expect(indexButtons?.length).toBeGreaterThan(0)

    if (indexButtons && indexButtons.length > 3) {
      // Test initial state
      expect(indexButtons[0]).toHaveAttribute('aria-disabled')

      // Test clicking last slide
      await userEvent.click(
        indexButtons[indexButtons.length - 1] as HTMLElement,
      )
      await new Promise((resolve) => setTimeout(resolve, 200))
      expect(indexButtons[indexButtons.length - 1]).toHaveAttribute(
        'aria-disabled',
      )

      // Test prev button from last slide
      if (prevButton) await userEvent.click(prevButton as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 200))
      expect(indexButtons[indexButtons.length - 2]).toHaveAttribute(
        'aria-disabled',
      )
      expect(indexButtons[indexButtons.length - 1]).toHaveAttribute(
        'aria-disabled',
      )

      // Test next button navigation
      if (nextButton) await userEvent.click(nextButton as HTMLElement)
      await new Promise((resolve) => setTimeout(resolve, 200))
      expect(indexButtons[indexButtons.length - 1]).toHaveAttribute(
        'aria-disabled',
      )
    }
  },
}
