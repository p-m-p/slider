import { BoxSlider } from '@boxslider/slider'
import Slider from './Slider'

const template = document.createElement('template')
template.innerHTML = `
  <div class="bs-slider">
    <slot name="slider"></slot>

    <div class="bs-slider-controls" part="controls">
      <slot name="prev-btn">
        <button type="button">Previous</button>
      </slot>
      <slot name="next-btn">
        <button type="button">Next</button>
      </slot>
    </div>

    <slot name="slide-index" part="index">
      <div class="bs-slide-index"></div>
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
      const sliderComponent = sliderSlot.assignedElements()[0] as Slider
      this.#slider = sliderComponent?.slider
    })

    const prevBtnSlot = tree.querySelector<HTMLSlotElement>(
      'slot[name="prev-btn"]',
    )
    prevBtnSlot?.addEventListener('slotchange', () => {
      const button = prevBtnSlot.assignedElements()[0]
      button?.addEventListener('click', () => {
        this.#slider?.prev()
      })
    })

    const nextBtnSlot = tree.querySelector<HTMLSlotElement>(
      'slot[name="next-btn"]',
    )
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
