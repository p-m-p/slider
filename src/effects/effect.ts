import { BoxSliderOptions } from '../box-slider-options';

export interface TransitionSettings {
  currentIndex: number;
  nextIndex: number;
}

export interface Effect {

  initialize(settings: BoxSliderOptions): void;

  transition(settings: TransitionSettings): Promise<TransitionSettings>;
}
