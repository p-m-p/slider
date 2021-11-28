interface StoreItem {
  el: HTMLElement;
  styles: { [style: string]: string };
}

export class StyleStore {
  private elementStyles: StoreItem[];

  constructor() {
    this.elementStyles = [];
  }

  store(elements: HTMLElement[] | HTMLElement, properties: string[]): void {
    (Array.isArray(elements) ? elements : [elements]).forEach(el => {
      let elementStyles = this.elementStyles.find(s => s.el === el);

      if (!elementStyles) {
        elementStyles = { el, styles: {} };
        this.elementStyles.push(elementStyles);
      }

      properties.forEach((p: string) => elementStyles.styles[p] = el.style.getPropertyValue(p));
    });
  }

  revert(): void {
    this.elementStyles.forEach(elementStyles => Object.keys(elementStyles.styles).forEach(property =>
      elementStyles.el.style.setProperty(property, elementStyles.styles[property])));
    this.elementStyles = [];
  }
}
