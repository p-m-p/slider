interface StoreItem {
  el: HTMLElement;
  styles: { [style: string]: string };
  attributes: { [attribute: string]: string };
}

export class StateStore{
  #elementStore: StoreItem[];

  constructor() {
    this.#elementStore = [];
  }

  storeStyles(elements: HTMLElement[] | HTMLElement, styles: string[]): void {
    this.#applyToElements(elements, (el, elementStore) =>
      styles.forEach((p: string) => elementStore.styles[p] = el.style.getPropertyValue(p)));
  }

  storeAttributes(elements: HTMLElement[] | HTMLElement, attributes: string[]): void {
    this.#applyToElements(elements, (el, elementStore) => {
      attributes.forEach((attribute: string) => elementStore.attributes[attribute] = el.getAttribute(attribute));
    });
  }

  revert(): void {
    this.#elementStore.forEach(elementStore => {
      Object.keys(elementStore.styles).forEach(property =>
        elementStore.el.style.setProperty(property, elementStore.styles[property]));

      Object.keys(elementStore.attributes).forEach(attribute => {
        const cachedValue = elementStore.attributes[attribute];

        if (attribute === null || attribute === '') {
          elementStore.el.removeAttribute(attribute);
        } else {
          elementStore.el.setAttribute(attribute, cachedValue)
        }
      });
    });
    this.#elementStore = [];
  }

  #applyToElements(elements: HTMLElement[] | HTMLElement, fn: (element: HTMLElement, store: StoreItem) => void): void {
    (Array.isArray(elements) ? elements : [elements]).forEach(el => {
      let elementStore = this.#elementStore.find(s => s.el === el);

      if (!elementStore) {
        elementStore = { el, styles: {}, attributes: {} };
        this.#elementStore.push(elementStore);
      }

      fn(el, elementStore);
    });
  }
}
