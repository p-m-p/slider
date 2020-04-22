export function applyCss(el: HTMLElement, styles: { [style: string]: string }): void {
  Object.keys(styles).forEach(key => el.style.setProperty(key, styles[key]));
}
