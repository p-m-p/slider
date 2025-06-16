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
