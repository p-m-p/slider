import { BoxSlider } from './box-slider'

let boxSliders: BoxSlider[] = []
let resizeDebounceTimer: number

window.addEventListener('resize', () => {
  window.clearTimeout(resizeDebounceTimer)
  resizeDebounceTimer = window.setTimeout(() => boxSliders.forEach((b) => b.reset()), 500)
})

export const responder = {
  add(boxSlider: BoxSlider): void {
    boxSliders.push(boxSlider)
  },
  remove(boxSlider: BoxSlider): void {
    boxSliders = boxSliders.filter((b) => b !== boxSlider)
  },
}
