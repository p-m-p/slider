export const slideData = [
  {
    title: 'First Slide',
    subtitle: 'This is the first slide content',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
  },
  {
    title: 'Second Slide',
    subtitle: 'This is the second slide content',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#ffffff',
  },
  {
    title: 'Third Slide',
    subtitle: 'This is the third slide content',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#ffffff',
  },
  {
    title: 'Fourth Slide',
    subtitle: 'This is the fourth slide content',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: '#ffffff',
  },
  {
    title: 'Fifth Slide',
    subtitle: 'This is the fifth slide content',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: '#ffffff',
  },
]

export const createSlide = (slide: (typeof slideData)[0], index: number) => (
  <div
    key={index}
    className="story-slide"
    style={{
      position: 'relative',
      width: '100%',
      height: '300px',
      background: slide.background,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '40px 20px',
      boxSizing: 'border-box',
    }}>
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '12px',
        padding: '24px 32px',
        backdropFilter: 'blur(10px)',
      }}>
      <h3
        style={{
          margin: '0 0 12px 0',
          fontSize: '28px',
          fontWeight: 'bold',
          color: slide.color,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}>
        {slide.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: '18px',
          color: slide.color,
          opacity: 0.95,
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        }}>
        {slide.subtitle}
      </p>
    </div>
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: slide.color,
        fontSize: '18px',
        fontWeight: 'bold',
        backdropFilter: 'blur(10px)',
      }}>
      {index + 1}
    </div>
  </div>
)

export const defaultSliderStyle = {
  display: 'block',
  width: '600px',
  height: '300px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}

export const cubeViewportStyle = {
  width: '600px',
  height: '300px',
  perspective: '1000px',
  overflow: 'hidden',
}

export const createCubeViewportStyle = (perspective: number) => ({
  width: '600px',
  height: '300px',
  perspective: `${perspective}px`,
  overflow: 'hidden',
})

export const sliderControlsContainerStyle = {
  display: 'block',
  width: '600px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}

export const sliderInnerStyle = {
  display: 'block',
  width: '100%',
  height: '300px',
}

export const customControlsBackgroundStyle = {
  background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
  boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.1)',
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const customControlsWrapperStyle = {
  background: '#f8f9fa',
  padding: '2rem',
  borderRadius: '8px',
  width: '700px',
}

export const customControlsSliderStyle = {
  display: 'block',
  width: '100%',
  height: '300px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}

export const customButtonStyle = {
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer',
}

export const customPlayButtonStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer',
  width: '40px',
  height: '40px',
}

export const customIndexButtonStyle = {
  padding: '6px 10px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  background: 'white',
  cursor: 'pointer',
  minWidth: '32px',
}

export const customIndexContainerStyle = {
  display: 'flex',
  gap: '4px',
  justifyContent: 'flex-start',
}

export const customStylesConfig = {
  '--bs-button-bar-gap': '16px',
  '--bs-btn-background-color': 'rgba(255, 255, 255, 0.2)',
  '--bs-btn-hover-background-color': 'rgba(255, 255, 255, 0.3)',
  '--bs-btn-border-radius': '50%',
  '--bs-btn-size': '44px',
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
  '--bs-index-btn-color': 'rgba(255, 255, 255, 0.3)',
  '--bs-index-btn-hover-color': 'rgba(255, 255, 255, 0.6)',
  '--bs-index-btn-active-color': '#ffffff',
  '--bs-index-btn-size': '14px',
}
