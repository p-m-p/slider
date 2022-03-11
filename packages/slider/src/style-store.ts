interface StoreItem {
  el: HTMLElement;
  styles: { [style: string]: string };
  attributes: { [attribute: string]: string };
}

export class StyleStore {
  private elementStore: StoreItem[];

  constructor() {
    this.elementStore = [];
  }

  store(elements: HTMLElement[] | HTMLElement, styles: string[]): void {
    (Array.isArray(elements) ? elements : [elements]).forEach(el => {
      let elementStore = this.elementStore.find(s => s.el === el);

      if (!elementStore) {
        elementStore = { el, styles: {}, attributes: {} };
        this.elementStore.push(elementStore);
      }

      styles.forEach((property: string) => elementStore.styles[property] = el.style.getPropertyValue(property));
    });
  }

  storeAttributes(elements: HTMLElement[] | HTMLElement, attributes: string[]): void {
    (Array.isArray(elements) ? elements : [elements]).forEach(el => {
      let elementStore = this.elementStore.find(s => s.el === el);

      if (!elementStore) {
        elementStore = { el, styles: {}, attributes: {} };
        this.elementStore.push(elementStore);
      }

      attributes.forEach((attribute: string) => elementStore.attributes[attribute] = el.getAttribute(attribute));
    });
  }

  revert(): void {
    this.elementStore.forEach(elementStore => {
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
    this.elementStore = [];
  }
}
