import { register, SafeBaseElement } from '../core'
import type { SliderElement } from '../Slider'
import Slider from '../Slider'
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
  static get observedAttributes() {
    return [
      'next-btn-label',
      'prev-btn-label',
      'play-btn-label',
      'pause-btn-label',
      'index-btn-label',
      'index-label',
    ]
  }
  #sliderElement!: SliderElement
  #mutationObserver: MutationObserver
  #hasBeenInteractedWith = false
  #sliderEventListeners: Record<string, EventListener> = {}

  constructor() {
    super()

    this.#mutationObserver = new MutationObserver((mutations) => {
      const hasNewSlider = mutations.some((mutation) => {
        ;[...mutation.addedNodes].some((node) => node instanceof Slider)
      })

      if (hasNewSlider) {
        this.#init()
      }
    })
  }

  get nextBtnLabel(): string {
    return this.getAttribute('next-btn-label') ?? 'Next'
  }

  set nextBtnLabel(value: string | null) {
    if (value === null) {
      this.removeAttribute('next-btn-label')
    } else {
      this.setAttribute('next-btn-label', value)
    }
  }

  get prevBtnLabel(): string {
    return this.getAttribute('prev-btn-label') ?? 'Previous'
  }

  set prevBtnLabel(value: string | null) {
    if (value === null) {
      this.removeAttribute('prev-btn-label')
    } else {
      this.setAttribute('prev-btn-label', value)
    }
  }

  get playBtnLabel(): string {
    return this.getAttribute('play-btn-label') ?? 'Start slide auto scroll'
  }

  set playBtnLabel(value: string | null) {
    if (value === null) {
      this.removeAttribute('play-btn-label')
    } else {
      this.setAttribute('play-btn-label', value)
    }
  }

  get pauseBtnLabel(): string {
    return this.getAttribute('pause-btn-label') ?? 'Stop slide auto scroll'
  }

  set pauseBtnLabel(value: string | null) {
    if (value === null) {
      this.removeAttribute('pause-btn-label')
    } else {
      this.setAttribute('pause-btn-label', value)
    }
  }

  get indexBtnLabel(): string | null {
    return this.getAttribute('index-btn-label')
  }

  set indexBtnLabel(value: string | null) {
    if (value === null) {
      this.removeAttribute('index-btn-label')
    } else {
      this.setAttribute('index-btn-label', value)
    }
  }

  get indexLabel(): string {
    return this.getAttribute('index-label') ?? 'Select a slide'
  }

  set indexLabel(value: string | null) {
    if (value === null) {
      this.removeAttribute('index-label')
    } else {
      this.setAttribute('index-label', value)
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    if (
      !this.hasAttribute('unstyled') ||
      this.getAttribute('unstyled') === 'false'
    ) {
      const style = document.createElement('style')
      style.append(document.createTextNode(styles))
      shadow.append(style)
    }

    shadow.append(template.content.cloneNode(true))

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
      { 'aria-label': this.prevBtnLabel },
    )

    this.#initializeControl(
      shadow.querySelector<HTMLSlotElement>('slot[name="next-btn"]')!,
      () => this.#sliderElement?.slider?.next(),
      { 'aria-label': this.nextBtnLabel },
    )

    this.#initPlayBtnSlot()
    this.#initIndexSlot()

    sliderSlot?.addEventListener('slotchange', () => this.#init())
  }

  #init() {
    this.#mutationObserver.disconnect()

    const sliderSlotRoot = this.shadowRoot
      ?.querySelector<HTMLSlotElement>('#slider')
      ?.assignedElements()[0]

    if (!sliderSlotRoot) {
      return
    }

    const isSliderElement = !!(sliderSlotRoot as SliderElement).slider

    if (isSliderElement) {
      this.#sliderElement = sliderSlotRoot as SliderElement
    } else {
      this.#mutationObserver.observe(sliderSlotRoot, {
        subtree: true,
        childList: true,
      })

      let sliderElement: SliderElement | undefined

      for (const childEl of sliderSlotRoot.querySelectorAll<SliderElement>(
        '*',
      )) {
        if (childEl.slider) {
          sliderElement = childEl
          break
        }
      }

      if (!sliderElement) {
        throw new Error('No slider element found in default slot')
      }

      this.#sliderElement = sliderElement
    }

    if (this.#sliderElement.slider) {
      this.shadowRoot?.querySelectorAll('[part~="btn"]').forEach((btn) => {
        btn.setAttribute('aria-controls', 'slider')
      })

      this.#setPlayBtnState()

      if (this.#sliderEventListeners.play) {
        this.#sliderElement.removeEventListener(
          'play',
          this.#sliderEventListeners.play,
        )
      }

      if (this.#sliderEventListeners.reset) {
        this.#sliderElement.removeEventListener(
          'reset',
          this.#sliderEventListeners.reset,
        )
      }

      if (this.#sliderEventListeners.pause) {
        this.#sliderElement.removeEventListener(
          'pause',
          this.#sliderEventListeners.pause,
        )
      }

      this.#sliderEventListeners.play = () => this.#setPlayBtnState()
      this.#sliderElement.addEventListener(
        'play',
        this.#sliderEventListeners.play,
      )

      this.#sliderEventListeners.pause = () => this.#setPlayBtnState()
      this.#sliderElement.addEventListener(
        'pause',
        this.#sliderEventListeners.pause,
      )

      this.#sliderEventListeners.reset = () => this.#init()
      this.#sliderElement.addEventListener(
        'reset',
        this.#sliderEventListeners.reset,
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
      indexSlot.setAttribute('aria-label', this.indexLabel)
      indexSlot?.addEventListener('click', (ev) => {
        const container = indexSlot.assignedElements()[0] ?? indexSlot

        if (container) {
          const index = [...container.querySelectorAll('button')].indexOf(
            ev.target as HTMLButtonElement,
          )

          if (index !== -1) {
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

        for (let i = 0; i < slideCount; i++) {
          const btn = document.createElement('button')
          const isActive = i === this.#sliderElement!.slider!.activeIndex

          btn.setAttribute('aria-disabled', isActive ? 'true' : 'false')
          btn.setAttribute('aria-label', this.#getIndexButtonLabel(i))
          btn.setAttribute('aria-controls', 'slider')
          btn.setAttribute('class', 'index-btn')
          btn.setAttribute('part', isActive ? 'index-btn active' : 'index-btn')
          btn.setAttribute('type', 'button')

          frag.append(btn)
        }

        indexSlot?.append(frag)
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
            btn.remove()
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
      const isPlaying = this.#sliderElement.autoScroll

      button.setAttribute(
        'aria-label',
        isPlaying ? this.pauseBtnLabel : this.playBtnLabel,
      )
      button?.setAttribute(
        'part',
        isPlaying ? 'btn play-btn pause' : 'btn play-btn',
      )
    }
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.#updateButtonLabels()
    }
  }

  #updateButtonLabels() {
    const nextButton = this.shadowRoot?.querySelector('#next-btn')
    const prevButton = this.shadowRoot?.querySelector('#prev-btn')
    const playButton = this.shadowRoot?.querySelector('#play-btn')

    if (nextButton) {
      nextButton.setAttribute('aria-label', this.nextBtnLabel)
    }
    if (prevButton) {
      prevButton.setAttribute('aria-label', this.prevBtnLabel)
    }
    if (playButton) {
      this.#setPlayBtnState()
    }

    const indexSlot =
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="index"]')
    if (indexSlot) {
      indexSlot.setAttribute('aria-label', this.indexLabel)
    }

    this.#updateIndexButtonLabels()
  }

  #updateIndexButtonLabels() {
    const indexSlot =
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="index"]')
    if (indexSlot) {
      const container = indexSlot.assignedElements()[0] ?? indexSlot
      const buttons = container?.querySelectorAll('button')

      buttons?.forEach((btn, index) => {
        btn.setAttribute('aria-label', this.#getIndexButtonLabel(index))
      })
    }
  }

  #getIndexButtonLabel(index: number): string {
    const labelTemplate = this.indexBtnLabel ?? 'View slide %d'
    return labelTemplate.replaceAll('%d', `${index + 1}`)
  }
}

register('bs-slider-controls', SliderControls)
