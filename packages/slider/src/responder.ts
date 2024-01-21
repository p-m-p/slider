import BoxSlider from './box-slider'

let boxSliders: BoxSlider[] = []
let resizeObserver: ResizeObserver

if (typeof ResizeObserver !== 'undefined') {
  resizeObserver = new ResizeObserver((sliderElements) => {
    sliderElements.forEach((sliderEl) =>
      boxSliders.find((bs) => bs.el === sliderEl.target)?.reset(),
    )
  })
}

export const responder = {
  add(boxSlider: BoxSlider): void {
    boxSliders.push(boxSlider)
    resizeObserver?.observe(boxSlider.el)
  },
  remove(boxSlider: BoxSlider): void {
    resizeObserver?.unobserve(boxSlider.el)
    boxSliders = boxSliders.filter((b) => b !== boxSlider)
  },
}

export default responder
