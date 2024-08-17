import { register, SafeBaseElement } from '../core'
import type { SliderElement } from '../Slider'
import styles from './styles'

let template: HTMLTemplateElement

if (typeof document !== 'undefined') {
  template = document.createElement('template')
  template.innerHTML = `
<div part="container" id="container">
  <div part="slider-container" id="slider-container">
    <slot id="slider"></slot>
  </div>

  <div part="play-btn-container" id="play-btn-container">
    <slot name="play-btn">
      <button part="btn play-btn" id="play-btn" class="btn"></button>
    </slot>
  </div>

  <div part="controls-container" id="controls-container">
    <slot name="prev-btn">
      <button part="prev-btn btn" id="prev-btn" class="btn"></button>
    </slot>
    <slot name="next-btn">
      <button part="next-btn btn" id="next-btn" class="btn"></button>
    </slot>
  </div>

  <div part="index-container" id="index-container" role="group">
    <slot name="index"></slot>
  </div>
</div>
`
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SliderControlsElement extends HTMLElement {}

export default class SliderControls
  extends SafeBaseElement
  implements SliderControlsElement
{
  #sliderElement!: SliderElement
  #mutationObserver: MutationObserver
  #hasBeenInteractedWith = false

  constructor() {
    super()

    this.#mutationObserver = new MutationObserver(() => {
      this.#init()
    })
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    if (
      !this.hasAttribute('unstyled') ||
      this.getAttribute('unstyled') === 'false'
    ) {
      const style = document.createElement('style')
      style.appendChild(document.createTextNode(styles))
      shadow.appendChild(style)
    }

    shadow.appendChild(template.content.cloneNode(true))

    const sliderSlot = shadow.querySelector<HTMLSlotElement>('#slider')

    if (!this.hasAttribute('aria-roledescription')) {
      this.setAttribute('aria-roledescription', 'carousel')
    }

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'region')
    }

    this.#initializeControl(
      shadow.querySelector<HTMLSlotElement>('slot[name="prev-btn"]')!,
      () => this.#sliderElement?.slider?.prev(),
      { 'aria-label': this.#prevBtnLabel() },
    )

    this.#initializeControl(
      shadow.querySelector<HTMLSlotElement>('slot[name="next-btn"]')!,
      () => this.#sliderElement?.slider?.next(),
      { 'aria-label': this.#nextBtnLabel() },
    )

    this.#initPlayBtnSlot()
    this.#initIndexSlot()

    sliderSlot?.addEventListener('slotchange', () => this.#init())
  }

  #init() {
    this.#mutationObserver.disconnect()

    const sliderSlotRoot = this.shadowRoot
      ?.querySelector<HTMLSlotElement>('#slider')
      ?.assignedElements()[0] as HTMLElement
    const isSliderElement = sliderSlotRoot.tagName
      .toLowerCase()
      .startsWith('bs-')

    if (isSliderElement) {
      this.#sliderElement = sliderSlotRoot as SliderElement
    } else {
      this.#mutationObserver.observe(sliderSlotRoot, {
        subtree: true,
        childList: true,
      })

      const sliderElement = sliderSlotRoot.querySelector<SliderElement>(
        'bs-carousel, bs-cube, bs-fade, bs-tile',
      )

      if (!sliderElement) {
        throw new Error('No bs-* slider element found in default slot')
      }

      this.#sliderElement = sliderElement
    }

    if (this.#sliderElement.slider) {
      this.shadowRoot?.querySelectorAll('[part~="btn"]').forEach((btn) => {
        btn.setAttribute('aria-controls', 'slider')
      })

      this.#setPlayBtnState()
      this.#sliderElement.addEventListener('play', () =>
        this.#setPlayBtnState(),
      )
      this.#sliderElement.addEventListener('pause', () =>
        this.#setPlayBtnState(),
      )

      this.#addIndexPips()
      this.#sliderElement.addEventListener(
        'before',
        ({ detail: { currentIndex, nextIndex } }) => {
          this.#setIndexPipState(currentIndex, nextIndex)
        },
      )
    }
  }

  #initializeControl(
    slot: HTMLSlotElement,
    clickHandler: EventListener,
    attributes: Record<string, string> = {},
  ) {
    const defaultButton = slot.querySelector('.btn')

    if (defaultButton) {
      for (const [key, value] of Object.entries(attributes)) {
        defaultButton.setAttribute(key, value)
      }
    }

    slot.addEventListener('click', (ev) => {
      this.#hasBeenInteractedWith = true
      this.#sliderElement.autoScroll = false
      clickHandler(ev)
    })
    slot.addEventListener('focusin', () => {
      if (!this.#hasBeenInteractedWith) {
        this.#sliderElement.autoScroll = false
      }
    })
  }

  #initIndexSlot() {
    const indexSlot =
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="index"]')

    if (indexSlot) {
      indexSlot.setAttribute('aria-label', this.#indexSlotLabel())
      indexSlot?.addEventListener('click', (ev) => {
        const container = indexSlot.assignedElements()[0] ?? indexSlot

        if (container) {
          const index = Array.from(
            container.querySelectorAll('button'),
          ).indexOf(ev.target as HTMLButtonElement)

          if (index > -1) {
            this.#hasBeenInteractedWith = true

            if (this.#sliderElement) {
              this.#sliderElement.autoScroll = false
              this.#sliderElement.slider?.skipTo(index)
            }
          }
        }
      })

      indexSlot?.addEventListener('slotchange', () => {
        const container = indexSlot.assignedElements()[0]

        if (container) {
          const buttons = container.querySelectorAll('button')
          const slider = this.#sliderElement?.slider

          if (slider && buttons) {
            buttons.forEach((btn, index) => {
              btn.setAttribute(
                'aria-disabled',
                index === slider.activeIndex ? 'true' : 'false',
              )
            })
          }
        }
      })
    }
  }

  #addIndexPips() {
    const indexSlot =
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="index"]')

    if (indexSlot) {
      this.#clearIndexPips()
      const slideCount = this.#sliderElement?.slider?.length ?? 0

      if (slideCount > 1 && !this.hasAttribute('disable-index')) {
        const frag = document.createDocumentFragment()
        const labelTemplate =
          this.getAttribute('index-btn-label') ?? 'View slide %d'

        for (let i = 0; i < slideCount; i++) {
          const btn = document.createElement('button')
          const isActive = i === this.#sliderElement!.slider!.activeIndex
          const label = labelTemplate.replace(/%d/g, `${i + 1}`)

          btn.setAttribute('aria-disabled', isActive ? 'true' : 'false')
          btn.setAttribute('aria-label', label)
          btn.setAttribute('aria-controls', 'slider')
          btn.setAttribute('class', 'index-btn')
          btn.setAttribute('part', isActive ? 'index-btn active' : 'index-btn')
          btn.setAttribute('type', 'button')

          frag.appendChild(btn)
        }

        indexSlot?.appendChild(frag)
      }
    }
  }

  #setIndexPipState(currentIndex: number, nextIndex?: number) {
    const indexSlot =
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="index"]')

    if (indexSlot) {
      const container = indexSlot?.assignedElements()[0] ?? indexSlot
      const buttons = container?.querySelectorAll('button')
      const currentBtn = buttons?.item(currentIndex)
      const nextBtn = buttons?.item(nextIndex ?? -1)

      if (currentBtn) {
        currentBtn.setAttribute('aria-disabled', 'false')

        if (currentBtn.hasAttribute('part')) {
          currentBtn.setAttribute('part', 'index-btn')
        }
      }

      if (nextBtn) {
        nextBtn.setAttribute('aria-disabled', 'true')

        if (nextBtn.hasAttribute('part')) {
          nextBtn.setAttribute('part', 'index-btn active')
        }
      }
    }
  }

  #clearIndexPips() {
    const indexSlot =
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="index"]')

    if (indexSlot) {
      const assignedElements = indexSlot?.assignedElements() ?? []
      indexSlot
        ?.querySelectorAll<HTMLButtonElement>('button')
        .forEach((btn) => {
          if (!assignedElements.includes(btn)) {
            indexSlot.removeChild(btn)
          }
        })
    }
  }

  #initPlayBtnSlot() {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="play-btn"]',
    )

    if (slot) {
      slot.addEventListener('slotchange', () => {
        this.#setPlayBtnState()
      })
      slot.addEventListener('click', () => {
        this.#hasBeenInteractedWith = true

        if (this.#sliderElement) {
          this.#sliderElement.autoScroll = !this.#sliderElement.autoScroll
        }
      })
    }
  }

  #setPlayBtnState() {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="play-btn"]',
    )

    if (slot) {
      const button = slot.assignedElements()[0] ?? slot.querySelector('.btn')

      button.setAttribute(
        'aria-label',
        this.#sliderElement?.autoScroll
          ? this.#pauseButtonLabel()
          : this.#playButtonLabel(),
      )
      button?.setAttribute(
        'part',
        this.#sliderElement?.autoScroll ? 'btn play-btn pause' : 'btn play-btn',
      )
    }
  }

  #indexSlotLabel() {
    return this.getAttribute('index-label') ?? 'Select a slide'
  }

  #nextBtnLabel() {
    return this.getAttribute('next-btn-label') ?? 'Next'
  }

  #prevBtnLabel() {
    return this.getAttribute('prev-btn-label') ?? 'Previous'
  }

  #playButtonLabel() {
    return this.getAttribute('play-btn-label') ?? 'Start slide auto scroll'
  }

  #pauseButtonLabel() {
    return this.getAttribute('pause-btn-label') ?? 'Stop slide auto scroll'
  }
}

register('bs-slider-controls', SliderControls)
