import styles from './styles.module.css'

export function Slides() {
  return (
    <>
      <picture className={styles.slide}>
        <source
          srcSet="/slider/img/slides/slide-3-square.jpg"
          media="(max-width: 480px)"
        />
        <img
          className={styles.slideImage}
          src="/slider/img/slides/slide-3.jpg"
          alt="Slide one"
        />
      </picture>
      <picture className={styles.slide}>
        <source
          srcSet="/slider/img/slides/slide-1-square.jpg"
          media="(max-width: 480px)"
        />
        <img
          className={styles.slideImage}
          src="/slider/img/slides/slide-1.jpg"
          alt="Slide one"
        />
      </picture>
      <picture className={styles.slide}>
        <source
          srcSet="/slider/img/slides/slide-2-square.jpg"
          media="(max-width: 600px)"
        />
        <img
          className={styles.slideImage}
          src="/slider/img/slides/slide-2.jpg"
          alt="Slide one"
        />
      </picture>
    </>
  )
}
