import { BoxSliderOptions } from '../box-slider-options';
import { Effect, TransitionSettings } from './effect';
import { StyleStore } from '../style-store';
export interface CarouselSliderOptions {
    timingFunction?: string;
}
export declare class CarouselSlider implements Effect {
    private readonly options;
    private slideWidth;
    private slideHeight;
    constructor(options?: CarouselSliderOptions);
    initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options: BoxSliderOptions): void;
    transition(settings: TransitionSettings): Promise<void>;
}
