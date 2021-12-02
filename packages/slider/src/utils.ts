export function applyCss(el: HTMLElement, styles: { [style: string]: string }): void {
  Object.keys(styles).forEach(key => el.style.setProperty(key, styles[key]));
}

export function locateSlideImageSrc(slide: HTMLElement): string | null {
  if (slide.getAttribute('src')) {
    return slide.getAttribute('src');
  }

  const img = slide.querySelector('img');

  return img ? img.currentSrc || img.getAttribute('src') : null;
}
