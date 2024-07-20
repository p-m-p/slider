export class StateStore {
  private elementStore: Map<HTMLElement, Record<string, null | string>>

  constructor() {
    this.elementStore = new Map()
  }

  storeAttributes(elements: HTMLElement[] | HTMLElement, attributes: string[]) {
    const elems = Array.isArray(elements) ? elements : [elements]

    elems.forEach((el) => {
      const store = this.elementStore.get(el) ?? {}

      attributes.forEach(
        (attr: string) => (store[attr] = el.getAttribute(attr)),
      )

      this.elementStore.set(el, store)
    })
  }

  revert() {
    for (const [el, attributes] of this.elementStore.entries()) {
      Object.keys(attributes).forEach((attribute) => {
        const cachedValue = attributes[attribute]

        if (cachedValue === null || cachedValue === '') {
          el.removeAttribute(attribute)
        } else if (cachedValue !== null) {
          el.setAttribute(attribute, cachedValue)
        }
      })
    }

    this.elementStore.clear()
  }
}
