import type { BoxSlider } from '@boxslider/slider'
import type { SliderElement } from './Slider'

const template = document.createElement('template')
template.innerHTML = `
<div part="container">
  <div part="slider">
    <slot id="slider"></slot>
  </div>

  <div part="controls">
    <slot name="prev-btn">
      <button part="prev-btn nav-btn"></button>
    </slot>
    <slot name="next-btn">
      <button part="next-btn nav-btn"></button>
    </slot>
  </div>

  <slot name="index" part="index"></slot>
</div>
`
let incrementingId = 1

export interface SliderControlsElement extends HTMLElement {
  slider?: BoxSlider
}

export default class SliderControls
  extends HTMLElement
  implements SliderControlsElement
{
  slider?: BoxSlider
  #indexButtons: HTMLButtonElement[] = []

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content.cloneNode(true))

    const sliderSlot = shadow.querySelector<HTMLSlotElement>('#slider')

    if (!this.hasAttribute('arai-roledescription')) {
      this.setAttribute('aria-roledescription', 'carousel')
    }

    this.#initializeControl(
      shadow.querySelector<HTMLSlotElement>('slot[name="prev-btn"]')!,
      () => this.slider?.prev(),
      { 'aria-label': this.getAttribute('prev-btn-label') ?? 'Previous' },
    )

    this.#initializeControl(
      shadow.querySelector<HTMLSlotElement>('slot[name="next-btn"]')!,
      () => this.slider?.next(),
      { 'aria-label': this.getAttribute('next-btn-label') ?? 'Next' },
    )

    sliderSlot?.addEventListener('slotchange', () => {
      const sliderEl = sliderSlot.assignedElements()[0] as SliderElement

      if (!sliderEl.id) {
        sliderEl.id = `bs-slider-${incrementingId++}`
      }

      shadow.querySelectorAll('[part~="nav-btn"]').forEach((btn) => {
        btn.setAttribute('aria-controls', sliderEl.id)
      })

      this.slider = sliderEl?.slider

      if (!this.slider) {
        throw new Error('Slider component is not defined')
      }

      this.slider.addEventListener('after', ({ currentIndex }) => {
        this.#indexButtons.forEach((btn, index) => {
          const isActive = index === currentIndex

          btn.setAttribute('aria-pressed', isActive ? 'true' : 'false')

          if (btn.hasAttribute('part')) {
            btn.setAttribute(
              'part',
              isActive ? 'index-btn active' : 'index-btn',
            )
          }
        })
      })

      const indexSlot =
        shadow.querySelector<HTMLSlotElement>('slot[name="index"]')

      if (this.slider.length > 1) {
        const frag = document.createDocumentFragment()
        const labelTemplate =
          this.getAttribute('index-btn-label') ?? 'View slide %d'

        for (let i = 0; i < this.slider.length; i++) {
          const btn = document.createElement('button')
          const isActive = i === this.slider?.activeIndex
          const label = labelTemplate.replace(/%d/g, `${i + 1}`)

          btn.setAttribute('aria-label', label)
          btn.setAttribute('aria-pressed', isActive ? 'true' : 'false')
          btn.setAttribute('aria-controls', sliderEl.id)
          btn.setAttribute('part', isActive ? 'index-btn active' : 'index-btn')
          btn.setAttribute('type', 'button')
          btn.addEventListener('click', () => {
            this.slider?.skipTo(i).then()
          })

          frag.appendChild(btn)
          this.#indexButtons.push(btn)
        }

        indexSlot?.appendChild(frag)
      }

      indexSlot?.addEventListener('slotchange', () => {
        const buttons = indexSlot
          .assignedElements()[0]
          ?.querySelectorAll('button')

        if (buttons) {
          this.#indexButtons = Array.from(buttons)

          this.#indexButtons.forEach((btn, index) => {
            const isActive = index === this.slider?.activeIndex

            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false')
            btn.addEventListener('click', () => this.slider?.skipTo(index))
          })
        }
      })
    })
  }

  disconnectedCallback() {
    this.slider = undefined
  }

  #initializeControl(
    slot: HTMLSlotElement,
    clickHandler: EventListener,
    attributes: Record<string, string> = {},
  ) {
    const defaultButton = slot.querySelector('button')

    defaultButton?.addEventListener('click', clickHandler)

    for (const [key, value] of Object.entries(attributes)) {
      defaultButton?.setAttribute(key, value)
    }

    slot.addEventListener('slotchange', () => {
      const customButton = slot.assignedElements()[0]
      customButton?.addEventListener('click', clickHandler)
    })
  }
}

if (typeof customElements !== 'undefined') {
  customElements.define('bs-slider-controls', SliderControls)
}
