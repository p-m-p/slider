import { BoxSliderOptions } from '../box-slider-options';

export interface TransitionSettings {
  el: HTMLElement;
  slides: HTMLElement[];
  currentIndex: number;
  nextIndex: number;
  isPrevious: boolean;
  speed: number;
}

export interface Effect {

  initialize(el: HTMLElement, slides: HTMLElement[], options?: BoxSliderOptions): void;

  transition(settings: TransitionSettings): Promise<TransitionSettings>;
}
