export const slideImages = [
  'https://picsum.photos/600/300?random=1',
  'https://picsum.photos/600/300?random=2',
  'https://picsum.photos/600/300?random=3',
  'https://picsum.photos/600/300?random=4',
  'https://picsum.photos/600/300?random=5',
]

export const slideData = [
  {
    title: 'Beautiful Landscape',
    subtitle: "Explore nature's wonders",
    image: slideImages[0],
  },
  {
    title: 'Urban Architecture',
    subtitle: 'Modern city designs',
    image: slideImages[1],
  },
  {
    title: 'Peaceful Waters',
    subtitle: 'Find your tranquility',
    image: slideImages[2],
  },
  {
    title: 'Mountain Views',
    subtitle: 'Breathtaking heights',
    image: slideImages[3],
  },
  {
    title: 'Sunset Horizons',
    subtitle: 'End the day in beauty',
    image: slideImages[4],
  },
]

export const createSlide = (slide: (typeof slideData)[0], index: number) => (
  <div
    key={index}
    style={{
      position: 'relative',
      width: '100%',
      height: '300px',
      overflow: 'hidden',
    }}>
    <img
      src={slide.image}
      alt={slide.title}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        padding: '40px 20px 20px',
        color: 'white',
      }}>
      <h3
        style={{
          margin: '0 0 8px 0',
          fontSize: '24px',
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        }}>
        {slide.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: '16px',
          opacity: 0.9,
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
        }}>
        {slide.subtitle}
      </p>
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
