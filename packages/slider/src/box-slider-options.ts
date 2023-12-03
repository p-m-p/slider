export interface BoxSliderOptions {
  autoScroll: boolean
  pauseOnHover: boolean
  speed: number
  startIndex: number
  swipe: boolean
  swipeTolerance: number
  timeout: number
}

export const defaultOptions = Object.freeze({
  autoScroll: true,
  pauseOnHover: false,
  speed: 800,
  startIndex: 0,
  swipe: true,
  swipeTolerance: 30,
  timeout: 5000,
})
