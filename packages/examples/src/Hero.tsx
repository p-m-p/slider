import HeroSlider from './HeroSlider'
import useImgLoader from './useImgLoader'
import './Hero.css'

const slides = [
  '/slider/hero-slides/ropes-large.webp',
  '/slider/hero-slides/squat-large.webp',
  '/slider/hero-slides/deadlift-large.webp',
  '/slider/hero-slides/squat-bw-large.webp',
]

export default function Hero() {
  const isLoaded = useImgLoader(slides)
  const heroSlides = (
    <>
      <div className="HeroSlider-slide">
        <figure>
          <img src="/slider/hero-slides/ropes-large.webp" />
          <figcaption>
            To make the slider responsive we use a placeholder with the first slide image to initially render the page.
            This also helps with SSR and preventing any flash of unstyled content
          </figcaption>
        </figure>
      </div>
      <div className="HeroSlider-slide">
        <figure>
          <img src="/slider/hero-slides/squat-large.webp" />
          <figcaption>
            To make the slider responsive we use a placeholder with the first slide image to initially render the page.
            This also helps with SSR and preventing any flash of unstyled content
          </figcaption>
        </figure>
      </div>
      <div className="HeroSlider-slide">
        <figure>
          <img src="/slider/hero-slides/deadlift-large.webp" />
          <figcaption>
            To make the slider responsive we use a placeholder with the first slide image to initially render the page.
            This also helps with SSR and preventing any flash of unstyled content
          </figcaption>
        </figure>
      </div>
      <div className="HeroSlider-slide">
        <figure>
          <img src="/slider/hero-slides/squat-bw-large.webp" />
          <figcaption>
            To make the slider responsive we use a placeholder with the first slide image to initially render the page.
            This also helps with SSR and preventing any flash of unstyled content
          </figcaption>
        </figure>
      </div>
    </>
  )

  return (
    <div className="Page">
      <header>
        <div className="AppBar">
          <h1 className="AppBar-title">Responsive Hero Slider</h1>
          <nav className="AppBar-nav">
            <a href="#">Setup</a>
            <a href="#">Source code</a>
          </nav>
        </div>

        <div className="Hero">
          <div className="HeroSlider">{isLoaded ? <HeroSlider>{heroSlides}</HeroSlider> : <>{heroSlides}</>}</div>
        </div>
      </header>
    </div>
  )
}
