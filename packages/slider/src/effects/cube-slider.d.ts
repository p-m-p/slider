import { Effect, TransitionSettings } from './effect';
import { BoxSliderOptions } from '../box-slider-options';
import { StyleStore } from '../style-store';
export interface CubeSliderOptions {
    direction?: 'horizontal' | 'vertical';
    perspective?: number;
}
export declare const defaults: CubeSliderOptions;
export declare class CubeSlider implements Effect {
    private readonly options;
    private translateZ;
    constructor(options?: CubeSliderOptions);
    initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options: BoxSliderOptions): void;
    transition(settings: TransitionSettings): Promise<void>;
    private rotation;
}
