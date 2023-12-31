import { BoxSlider } from '@boxslider/slider'
import type { SliderElement } from './Slider'

const template = document.createElement('template')
template.innerHTML = `
  <div part="slider">
    <slot name="slider"></slot>
  </div>

  <div part="controls">
    <slot name="prev-btn">
      <button part="next-btn" type="button">Previous</button>
    </slot>
    <slot name="slide-index" part="index"></slot>
    <slot name="next-btn">
      <button part="prev-btn" type="button">Next</button>
    </slot>
  </div>
`

export interface BoxSliderElement {
  readonly slider?: BoxSlider
}

export default class BoxSliderComponent extends HTMLElement {
  #slider?: BoxSlider

  get slider() {
    return this.#slider
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    const tree = template.content.cloneNode(true) as DocumentFragment

    const sliderSlot = tree.querySelector<HTMLSlotElement>(
      'slot[name="slider"]',
    )
    sliderSlot?.addEventListener('slotchange', () => {
      const sliderComponent = sliderSlot.assignedElements()[0] as SliderElement
      this.#slider = sliderComponent?.slider

      const indexSlot = shadow.querySelector<HTMLSlotElement>(
        'slot[name="slide-index"]',
      )
      const slides = Array.from(this.slider?.el.children || []).filter(
        (el) => el instanceof HTMLElement,
      )

      if (slides.length > 1) {
        const frag = document.createDocumentFragment()

        for (let i = 0; i < slides.length; i++) {
          const btn = document.createElement('button')
          btn.textContent = `${i + 1}`
          btn.setAttribute('part', 'index-btn')
          btn.setAttribute('type', 'button')
          btn.addEventListener('click', () => this.slider?.skipTo(i))
          frag.appendChild(btn)
        }

        indexSlot?.appendChild(frag)
      }

      indexSlot?.addEventListener('slotchange', () => {
        const index = indexSlot.assignedElements()[0]

        if (index.hasChildNodes()) {
          index.childNodes.forEach((node, index) => {
            node.addEventListener('click', () => this.slider?.skipTo(index))
          })
        }
      })
    })

    const prevBtnSlot = tree.querySelector<HTMLSlotElement>(
      'slot[name="prev-btn"]',
    )
    prevBtnSlot?.addEventListener('slotchange', () => {
      const button = prevBtnSlot.assignedElements()[0]
      button?.addEventListener('click', () => {
        this.slider?.prev()
      })
    })

    const nextBtnSlot = tree.querySelector<HTMLSlotElement>(
      'slot[name="next-btn"]',
    )
    nextBtnSlot?.addEventListener('slotchange', () => {
      const button = nextBtnSlot.assignedElements()[0]
      button?.addEventListener('click', () => {
        this.slider?.next()
      })
    })

    shadow.appendChild(tree)
  }

  disconnectedCallback() {
    this.#slider = undefined
  }
}
