import { Effect } from './effects';

export interface BoxSliderOptions {
  effect: Effect;
  speed: number;
  responsive: boolean;
  timeout: number;
  autoScroll: boolean;
  pauseOnHover: boolean;
  startIndex: number;
  swipe: boolean;
  swipeTolerance: number;
}

export const defaults: Partial<BoxSliderOptions> = {
  speed: 800,
  responsive: true,
  timeout: 5000,
  autoScroll: false,
  pauseOnHover: false,
  startIndex: 0,
  swipe: true,
  swipeTolerance: 30
};
