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
      <button part="prev-btn nav-btn" type="button" aria-label="Previous"></button>
    </slot>
    <slot name="next-btn">
      <button part="next-btn nav-btn" type="button" aria-label="Next"></button>
    </slot>
  </div>

  <slot name="index" part="index"></slot>
</div>
`

let incrementingId = 1

export interface SliderControlsElement extends HTMLElement {}

export default class SliderControls extends HTMLElement {
  #slider?: BoxSlider

  connectedCallback() {
    this.setAttribute('aria-roledescription', 'carousel')

    const shadow = this.attachShadow({ mode: 'open' })
    const tree = template.content.cloneNode(true) as DocumentFragment

    const sliderSlot = tree.querySelector<HTMLSlotElement>('#slider')
    sliderSlot?.addEventListener('slotchange', () => {
      const sliderComponent = sliderSlot.assignedElements()[0] as SliderElement

      if (!sliderComponent.id) {
        sliderComponent.id = `bs-slider-${incrementingId++}`
      }

      this.#slider = sliderComponent?.slider
      this.#slider?.addEventListener('after', ({ currentIndex }) => {
        indexSlot?.querySelectorAll('button').forEach((b, index) => {
          const isActive = index === currentIndex
          b.setAttribute('aria-pressed', isActive ? 'true' : 'false')
          b.setAttribute('part', isActive ? 'index-btn active' : 'index-btn')
        })
      })

      const indexSlot =
        shadow.querySelector<HTMLSlotElement>('slot[name="index"]')
      const slides = Array.from(this.#slider?.el.children || []).filter(
        (el) => el instanceof HTMLElement,
      )

      if (slides.length > 1) {
        const frag = document.createDocumentFragment()

        for (let i = 0; i < slides.length; i++) {
          const btn = document.createElement('button')

          btn.setAttribute('aria-label', `View slide ${i + 1}`)
          btn.setAttribute(
            'part',
            i === this.#slider?.activeIndex ? 'index-btn active' : 'index-btn',
          )
          btn.setAttribute('type', 'button')
          btn.setAttribute('aria-controls', sliderComponent.id)
          btn.addEventListener('click', () => {
            this.#slider?.skipTo(i).then()
          })

          frag.appendChild(btn)
        }

        indexSlot?.appendChild(frag)
      }

      indexSlot?.addEventListener('slotchange', () => {
        const index = indexSlot.assignedElements()[0]

        if (index?.hasChildNodes()) {
          Array.from(index.childNodes)
            .filter((node) => node instanceof HTMLElement)
            .forEach((node, index) => {
              node.addEventListener('click', () => this.#slider?.skipTo(index))
            })
        }
      })
    })

    const prevBtnSlot = tree.querySelector<HTMLSlotElement>(
      'slot[name="prev-btn"]',
    )
    prevBtnSlot
      ?.querySelector('button')
      ?.addEventListener('click', () => this.#slider?.prev())
    prevBtnSlot?.addEventListener('slotchange', () => {
      const button = prevBtnSlot.assignedElements()[0]
      button?.addEventListener('click', () => {
        this.#slider?.prev()
      })
    })

    const nextBtnSlot = tree.querySelector<HTMLSlotElement>(
      'slot[name="next-btn"]',
    )
    nextBtnSlot
      ?.querySelector('button')
      ?.addEventListener('click', () => this.#slider?.next())
    nextBtnSlot?.addEventListener('slotchange', () => {
      const button = nextBtnSlot.assignedElements()[0]

      button?.addEventListener('click', () => {
        this.#slider?.next()
      })
    })

    shadow.appendChild(tree)
  }

  disconnectedCallback() {
    this.#slider = undefined
  }
}

if (typeof customElements !== 'undefined') {
  customElements.define('bs-slider-controls', SliderControls)
}
