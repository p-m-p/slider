import { type Effect } from './effects'

export interface BoxSliderOptions {
  effect?: Effect
  speed: number
  responsive: boolean
  timeout: number
  autoScroll: boolean
  pauseOnHover: boolean
  startIndex: number
  swipe: boolean
  swipeTolerance: number
}
