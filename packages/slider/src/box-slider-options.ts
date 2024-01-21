export interface BoxSliderOptions {
  /**
   * Automatically scroll through the slides
   */
  autoScroll: boolean

  /**
   * Pause auto scrolling on mouse over
   */
  pauseOnHover: boolean

  /**
   * Speed of slide transition in milliseconds
   */
  speed: number

  /**
   * Slide index to start from
   */
  startIndex: number

  /**
   * Enable swiping to show next or previous slide
   */
  swipe: boolean

  /**
   * Minimum distance in pixels for a swipe transition
   */
  swipeTolerance: number

  /**
   * Number of milliseconds between each slide transition
   * when auto scrolling slides
   */
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
