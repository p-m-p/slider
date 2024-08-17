import styles from './styles.module.css'

export function Slides() {
  return (
    <>
      <div className={styles.slide} aria-label="1 of 4">
        <picture>
          <source
            srcSet="/slider/img/slides/hyena-square.webp"
            media="(max-width: 480px)"
          />
          <img
            className={styles.slideImage}
            src="/slider/img/slides/hyena.webp"
            alt="Face of a hyena looking slightly to the left with the sun and pyramids in the background"
          />
        </picture>
      </div>
      <div className={styles.slide} aria-label="2 of 4">
        <picture>
          <source
            srcSet="/slider/img/slides/elephant-square.webp"
            media="(max-width: 480px)"
          />
          <img
            className={styles.slideImage}
            src="/slider/img/slides/elephant.webp"
            alt="Front view of an elephant with patterns on it's skin walking forwards with the suns rays and palm trees in the background"
          />
        </picture>
      </div>
      <div className={styles.slide} aria-label="3 of 4">
        <picture>
          <source
            srcSet="/slider/img/slides/lion-square.webp"
            media="(max-width: 480px)"
          />
          <img
            className={styles.slideImage}
            src="/slider/img/slides/lion.webp"
            alt="Face of a lion looking slightly to the right with a wavey pattern mane and plant leafs in the background"
          />
        </picture>
      </div>
      <div className={styles.slide} aria-label="4 of 4" role="region">
        <picture>
          <source
            srcSet="/slider/img/slides/ram-square.webp"
            media="(max-width: 480px)"
          />
          <img
            className={styles.slideImage}
            src="/slider/img/slides/ram.webp"
            alt="Face of a ram with horns and large ears with hair that creates a pattern of swirls in the background"
          />
        </picture>
      </div>
    </>
  )
}
