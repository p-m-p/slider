import { Effect, TransitionSettings } from './effect';
import { BoxSliderOptions } from '../box-slider-options';
import { StyleStore } from '../style-store';
export interface FadeSliderOptions {
    timingFunction?: string;
}
export declare class FadeSlider implements Effect {
    private readonly options;
    constructor(options?: FadeSliderOptions);
    initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options: BoxSliderOptions): void;
    transition(settings: TransitionSettings): Promise<void>;
}
