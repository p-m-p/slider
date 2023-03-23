import type { Effect } from './effects/effect'

export interface BoxSliderOptions {
  effect?: Effect
  speed: number
  timeout: number
  autoScroll: boolean
  pauseOnHover: boolean
  startIndex: number
  swipe: boolean
  swipeTolerance: number
}
