interface StoreItem {
  el: HTMLElement
  styles: { [style: string]: string }
  attributes: { [attribute: string]: string | null }
}

export class StateStore {
  private elementStore: StoreItem[]

  constructor() {
    this.elementStore = []
  }

  storeStyles(elements: HTMLElement[] | HTMLElement, styles: string[]) {
    this.applyToElements(elements, (el, elementStore) => {
      const computedStyles = getComputedStyle(el)
      styles.forEach((p: string) => (elementStore.styles[p] = computedStyles.getPropertyValue(p)))
    })
  }

  storeAttributes(elements: HTMLElement[] | HTMLElement, attributes: string[]) {
    this.applyToElements(elements, (el, elementStore) => {
      attributes.forEach((attribute: string) => (elementStore.attributes[attribute] = el.getAttribute(attribute)))
    })
  }

  revert() {
    this.elementStore.forEach((elementStore) => {
      Object.keys(elementStore.styles).forEach((property) =>
        elementStore.el.style.setProperty(property, elementStore.styles[property]),
      )

      Object.keys(elementStore.attributes).forEach((attribute) => {
        const cachedValue = elementStore.attributes[attribute]

        if (attribute === null || attribute === '') {
          elementStore.el.removeAttribute(attribute)
        } else if (cachedValue !== null) {
          elementStore.el.setAttribute(attribute, cachedValue)
        }
      })
    })
    this.elementStore = []
  }

  private applyToElements(elements: HTMLElement[] | HTMLElement, fn: (element: HTMLElement, store: StoreItem) => void) {
    ;(Array.isArray(elements) ? elements : [elements]).forEach((el) => {
      let elementStore = this.elementStore.find((s) => s.el === el)

      if (!elementStore) {
        elementStore = { el, styles: {}, attributes: {} }
        this.elementStore.push(elementStore)
      }

      fn(el, elementStore)
    })
  }
}
