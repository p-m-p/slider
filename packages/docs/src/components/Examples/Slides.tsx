import styles from './styles.module.css'

export function Slides() {
  return (
    <>
      <picture className={styles.slide} aria-label="Slide 1 of 4" id="slide-1">
        <source
          srcSet="/slider/img/slides/hyena-square.jpg"
          media="(max-width: 480px)"
        />
        <img
          className={styles.slideImage}
          src="/slider/img/slides/hyena.jpg"
          alt="Face of a hyena in an abstract 3d Vaporwave style"
        />
      </picture>
      <picture className={styles.slide} aria-label="Slide 2 of 4" id="slide-2">
        <source
          srcSet="/slider/img/slides/elephant-square.jpg"
          media="(max-width: 480px)"
        />
        <img
          className={styles.slideImage}
          src="/slider/img/slides/elephant.jpg"
          alt="Front view of an elephant in an abstract 3d Vaporwave style"
        />
      </picture>
      <picture className={styles.slide} aria-label="Slide 3 of 4" id="slide-3">
        <source
          srcSet="/slider/img/slides/lion-square.jpg"
          media="(max-width: 480px)"
        />
        <img
          className={styles.slideImage}
          src="/slider/img/slides/lion.jpg"
          alt="Face of a lion in an abstract 3d Vaporwave style"
        />
      </picture>
      <picture className={styles.slide} aria-label="Slide 4 of 4" id="slide-4">
        <source
          srcSet="/slider/img/slides/ram-square.jpg"
          media="(max-width: 480px)"
        />
        <img
          className={styles.slideImage}
          src="/slider/img/slides/ram.jpg"
          alt="Face of a ram in an abstract 3d Vaporwave style"
        />
      </picture>
    </>
  )
}
