import { register, SafeBaseElement } from './core'
import type { SliderElement } from './Slider'

let incrementingId = 1
let template: HTMLTemplateElement

if (typeof document !== 'undefined') {
  template = document.createElement('template')
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

  <div part="index-container" role="group">
    <slot name="index"></slot>
  </div>
</div>
`
}

export default class SliderControls extends SafeBaseElement {
  #sliderElement: SliderElement | null = null
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
      this.#sliderElement = sliderSlotRoot.querySelector<SliderElement>(
        'bs-carousel, bs-cube, bs-fade, bs-tile',
      )
    }

    if (this.#sliderElement?.slider) {
      let sliderId = this.#sliderElement?.id

      if (!sliderId) {
        sliderId = `bs-slider-${incrementingId++}`
        this.#sliderElement!.id = sliderId
      }

      this.shadowRoot?.querySelectorAll('[part~="btn"]').forEach((btn) => {
        btn.setAttribute('aria-controls', sliderId)
      })

      this.#setPlayBtnState()
      this.#sliderElement?.slider.addEventListener('play', () =>
        this.#setPlayBtnState(),
      )
      this.#sliderElement?.slider.addEventListener('pause', () =>
        this.#setPlayBtnState(),
      )

      this.#addIndexPips()
      this.#sliderElement?.slider.addEventListener(
        'before',
        ({ currentIndex, nextIndex }) => {
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
    const defaultButton = slot.querySelector('[part~="btn"]')

    if (defaultButton) {
      for (const [key, value] of Object.entries(attributes)) {
        defaultButton.setAttribute(key, value)
      }
    }

    slot.addEventListener('click', (ev) => {
      this.#hasBeenInteractedWith = true
      this.#sliderElement?.slider?.pause()
      clickHandler(ev)
    })
    slot.addEventListener('focusin', () => {
      if (!this.#hasBeenInteractedWith) {
        this.#sliderElement?.slider?.pause()
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
            this.#sliderElement?.slider?.pause()
            this.#sliderElement?.slider?.skipTo(index)
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

          btn.setAttribute('aria-label', label)
          btn.setAttribute('aria-disabled', isActive ? 'true' : 'false')
          btn.setAttribute('aria-controls', this.#sliderElement!.id)
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

        if (this.#sliderElement?.slider?.getOption('autoScroll')) {
          this.#sliderElement?.slider?.pause()
        } else {
          this.#sliderElement?.slider?.play()
        }
      })
    }
  }

  #setPlayBtnState() {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="play-btn"]',
    )

    if (slot) {
      const button =
        slot.assignedElements()[0] ?? slot.querySelector('[part~="btn"]')

      button.setAttribute(
        'aria-label',
        this.#sliderElement?.slider?.getOption('autoScroll')
          ? this.#pauseButtonLabel()
          : this.#playButtonLabel(),
      )
      button?.setAttribute(
        'part',
        this.#sliderElement?.slider?.getOption('autoScroll')
          ? 'btn play-btn pause'
          : 'btn play-btn',
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
