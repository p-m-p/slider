import { Effect } from './effects/effect';

export interface BoxSliderOptions {
  effect: Effect;
  speed?: number;
  responsive?: boolean;
  timeout?: number;
  autoScroll?: boolean;
  pauseOnHover?: boolean;
  perspective?: number;
  startIndex?: number;
  swipe?: boolean;
  swipeTolerance?: number;
}

export const defaults: BoxSliderOptions = {
  effect: null,
  speed: 800,
  responsive: true,
  timeout: 5000,
  autoScroll: false,
  pauseOnHover: false,
  perspective: 1000,
  startIndex: 0,
  swipe: true,
  swipeTolerance: 30
};
