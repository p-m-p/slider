import type { SliderElement } from './Slider'
import Slider from './Slider'

const template = document.createElement('template')
template.innerHTML = `
<div part="container">
  <div part="slider-container">
    <slot id="slider"></slot>
  </div>

  <div  part="play-btn-container">
    <slot name="play-btn">
      <button part="btn play-btn"></button>
    </slot>
  </div>

  <div part="controls-container">
    <slot name="prev-btn">
      <button part="prev-btn btn"></button>
    </slot>
    <slot name="next-btn">
      <button part="next-btn btn"></button>
    </slot>
  </div>

  <div part="index-container">
    <slot name="index"></slot>
  </div>
</div>
`
let incrementingId = 1

export interface SliderControlsElement extends HTMLElement {}

export default class SliderControls
  extends HTMLElement
  implements SliderControlsElement
{
  #sliderEl?: SliderElement | null
  #hasBeenInteractedWith = false

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    const sliderSlot = shadow.querySelector<HTMLSlotElement>('#slider')

    if (!this.hasAttribute('arai-roledescription')) {
      this.setAttribute('aria-roledescription', 'carousel')
    }

    sliderSlot?.addEventListener('slotchange', () => {
      const sliderSlotRoot = sliderSlot.assignedElements()[0] as HTMLElement
      this.#sliderEl =
        sliderSlotRoot instanceof Slider
          ? (sliderSlotRoot as SliderElement)
          : sliderSlotRoot.querySelector<SliderElement>(
              'bs-carousel, bs-cube, bs-fade, bs-tile',
            )

      if (this.#sliderEl?.slider) {
        let sliderId = this.#sliderEl?.id

        if (!sliderId) {
          sliderId = `bs-slider-${incrementingId++}`
          this.#sliderEl!.id = sliderId
        }

        this.#initializeControl(
          shadow.querySelector<HTMLSlotElement>('slot[name="prev-btn"]')!,
          () => this.#sliderEl?.slider?.prev(),
          { 'aria-label': this.getAttribute('prev-btn-label') ?? 'Previous' },
        )

        this.#initializeControl(
          shadow.querySelector<HTMLSlotElement>('slot[name="next-btn"]')!,
          () => this.#sliderEl?.slider?.next(),
          { 'aria-label': this.getAttribute('next-btn-label') ?? 'Next' },
        )

        this.#initializePlayButton(
          shadow.querySelector<HTMLSlotElement>('slot[name="play-btn"]')!,
        )

        shadow.querySelectorAll('[part~="btn"]').forEach((btn) => {
          btn.setAttribute('aria-controls', sliderId)
        })

        const indexSlot =
          shadow.querySelector<HTMLSlotElement>('slot[name="index"]')

        this.#sliderEl?.slider.addEventListener(
          'before',
          ({ currentIndex, nextIndex }) => {
            const container = indexSlot?.assignedElements()[0] ?? indexSlot
            const buttons = container?.querySelectorAll('button')
            const currentBtn = buttons?.item(currentIndex)
            const nextBtn = buttons?.item(nextIndex ?? -1)

            if (currentBtn) {
              currentBtn.setAttribute('aria-pressed', 'false')

              if (currentBtn.hasAttribute('part')) {
                currentBtn.setAttribute('part', 'index-btn')
              }
            }

            if (nextBtn) {
              nextBtn.setAttribute('aria-pressed', 'true')

              if (nextBtn.hasAttribute('part')) {
                nextBtn.setAttribute('part', 'index-btn active')
              }
            }
          },
        )

        if (
          this.#sliderEl?.slider.length > 1 &&
          !this.hasAttribute('disable-index')
        ) {
          const frag = document.createDocumentFragment()
          const labelTemplate =
            this.getAttribute('index-btn-label') ?? 'View slide %d'

          for (let i = 0; i < this.#sliderEl?.slider.length; i++) {
            const btn = document.createElement('button')
            const isActive = i === this.#sliderEl?.slider.activeIndex
            const label = labelTemplate.replace(/%d/g, `${i + 1}`)

            btn.setAttribute('aria-label', label)
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false')
            btn.setAttribute('aria-controls', sliderId)
            btn.setAttribute(
              'part',
              isActive ? 'index-btn active' : 'index-btn',
            )
            btn.setAttribute('type', 'button')

            frag.appendChild(btn)
          }

          indexSlot?.appendChild(frag)
        }

        indexSlot?.addEventListener('click', (ev) => {
          const container = indexSlot.assignedElements()[0] ?? indexSlot

          if (container) {
            const index = Array.from(
              container.querySelectorAll('button'),
            ).indexOf(ev.target as HTMLButtonElement)

            if (index > -1) {
              this.#sliderEl?.slider?.skipTo(index)
            }
          }
        })

        indexSlot?.addEventListener('slotchange', () => {
          const container = indexSlot.assignedElements()[0]

          if (container) {
            const buttons = container.querySelectorAll('button')

            if (buttons) {
              buttons.forEach((btn, index) => {
                btn.setAttribute(
                  'aria-pressed',
                  index === this.#sliderEl?.slider?.activeIndex
                    ? 'true'
                    : 'false',
                )
              })
            }
          }
        })
      }
    })
  }

  #initializeControl(
    slot: HTMLSlotElement,
    clickHandler: EventListener,
    attributes: Record<string, string> = {},
  ) {
    const defaultButton = slot.querySelector('button')!

    for (const [key, value] of Object.entries(attributes)) {
      defaultButton?.setAttribute(key, value)
    }

    slot.addEventListener('click', (ev) => {
      this.#hasBeenInteractedWith = true
      this.#sliderEl?.setAttribute('auto-scroll', 'false')
      clickHandler(ev)
    })
    slot.addEventListener('focusin', () => {
      if (!this.#hasBeenInteractedWith) {
        this.#sliderEl?.setAttribute('auto-scroll', 'false')
      }
    })
  }

  #initializePlayButton(slot: HTMLSlotElement) {
    const defaultButton = slot.querySelector('button')!
    const playBtnLabel =
      this.getAttribute('play-btn-label') ?? 'Start slide auto scroll'
    const pauseBtnLabel =
      this.getAttribute('pause-btn-label') ?? 'Stop slide auto scroll'

    defaultButton.setAttribute(
      'aria-label',
      this.#sliderEl?.autoScroll ? pauseBtnLabel : playBtnLabel,
    )
    defaultButton.setAttribute(
      'part',
      this.#sliderEl?.autoScroll ? 'btn play-btn pause' : 'btn play-btn',
    )

    slot.addEventListener('click', () => {
      const btn = slot.querySelector('button')

      if (btn) {
        this.#hasBeenInteractedWith = true

        if (this.#sliderEl?.autoScroll) {
          this.#sliderEl?.setAttribute('auto-scroll', 'false')
          btn.setAttribute('aria-label', playBtnLabel)

          if (btn.hasAttribute('part')) {
            btn.setAttribute('part', 'btn play-btn')
          }
        } else {
          this.#sliderEl?.setAttribute('auto-scroll', 'true')
          btn.setAttribute('aria-label', pauseBtnLabel)

          if (btn.hasAttribute('part')) {
            btn.setAttribute('part', 'btn play-btn pause')
          }
        }
      }
    })
  }
}

if (typeof customElements !== 'undefined') {
  customElements.define('bs-slider-controls', SliderControls)
}
