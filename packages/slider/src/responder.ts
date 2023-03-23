import type BoxSlider from './box-slider'

let boxSliders: BoxSlider[] = []
let resizeDebounceTimer: number

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeDebounceTimer)
    resizeDebounceTimer = window.setTimeout(() => boxSliders.forEach((b) => b.reset()), 200)
  })
}

export const responder = {
  add(boxSlider: BoxSlider): void {
    boxSliders.push(boxSlider)
  },
  remove(boxSlider: BoxSlider): void {
    boxSliders = boxSliders.filter((b) => b !== boxSlider)
  },
}
