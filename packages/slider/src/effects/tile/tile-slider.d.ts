import { Effect, TransitionSettings } from '../effect';
import { StyleStore } from '../../style-store';
import { BoxSliderOptions } from '../../box-slider-options';
export interface TileSliderOptions {
    tileEffect?: 'flip' | 'fade';
    rows?: number;
    rowOffset?: number;
}
export declare class TileSlider implements Effect {
    private tileTransition;
    private options;
    private grid;
    private tileWrapper;
    private activeFace;
    constructor(options?: TileSliderOptions);
    initialize(el: HTMLElement, slides: HTMLElement[], styleStore: StyleStore, options?: BoxSliderOptions): void;
    transition(settings: TransitionSettings): Promise<void>;
    destroy(el: HTMLElement): void;
    private calculateGrid;
}
