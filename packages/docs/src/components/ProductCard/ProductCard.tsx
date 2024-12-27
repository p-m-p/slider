import { FadeSlider } from '@boxslider/react'
import { createRef } from 'react'
import type { BoxSlider } from '@boxslider/slider'

import styles from './styles.module.css'

export function ProductCard() {
  const sliderRef = createRef<BoxSlider>()
  const buttonBar = createRef<HTMLDivElement>()

  const handleActiveButton = (button: HTMLButtonElement) => {
    const buttons = buttonBar.current?.querySelectorAll('button')
    const index = Array.from(buttons).indexOf(button)

    buttons?.forEach((btn) => (btn.tabIndex = -1))
    button.tabIndex = 0
    sliderRef.current?.skipTo(index)
  }

  return (
    <article className={styles.card}>
      <section className={styles.details}>
        <h2>Tartan paint</h2>
        <p>
          Our tartan paint is made from the finest Scottish tartans, and is
          perfect for painting your walls, ceilings, and floors.
        </p>
      </section>
      <section className={styles.images}>
        <FadeSlider
          className={styles.slider}
          autoScroll={false}
          sliderRef={sliderRef}>
          <div className={styles.slide}>Image one</div>
          <div className={styles.slide}>Image two</div>
          <div className={styles.slide}>Image three</div>
          <div className={styles.slide}>Image four</div>
          <div className={styles.slide}>Image five</div>
        </FadeSlider>
        <div
          ref={buttonBar}
          className={styles.thumbnails}
          onClick={(ev) => {
            if (ev.target instanceof HTMLButtonElement) {
              handleActiveButton(ev.target)
            }
          }}
          onKeyDown={(ev) => {
            const current = ev.target as HTMLButtonElement
            const prev = current.previousElementSibling as HTMLButtonElement
            const next = current.nextElementSibling as HTMLButtonElement

            if (ev.code === 'ArrowRight' && next) {
              handleActiveButton(next)
              next.focus()
            }

            if (ev.code === 'ArrowLeft' && prev) {
              handleActiveButton(prev)
              prev.focus()
            }
          }}>
          <button tabIndex={0} className={styles.thumbnail}>
            Thumbnail
          </button>
          <button tabIndex={-1} className={styles.thumbnail}>
            Thumbnail
          </button>
          <button tabIndex={-1} className={styles.thumbnail}>
            Thumbnail
          </button>
          <button tabIndex={-1} className={styles.thumbnail}>
            Thumbnail
          </button>
          <button tabIndex={-1} className={styles.thumbnail}>
            Thumbnail
          </button>
        </div>
      </section>
    </article>
  )
}
