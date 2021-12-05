import { BoxSliderOptions } from './box-slider-options';
export declare type EventType = 'after' | 'before' | 'destroy' | 'pause' | 'play';
export declare type EventData = {
    [key: string]: any;
};
export declare class BoxSlider {
    private readonly options;
    private activeIndex;
    private autoScrollTimer;
    private el;
    private effect;
    private eventListeners;
    private isDestroyed;
    private slides;
    private styleStore;
    private transitionPromise;
    constructor(el: Element | HTMLElement, options: BoxSliderOptions);
    reset(): void;
    next(): Promise<BoxSlider>;
    prev(): Promise<BoxSlider>;
    skipTo(nextIndex: number, backwards?: boolean): Promise<BoxSlider>;
    pause(): BoxSlider;
    play(): BoxSlider;
    addEventListener(ev: EventType, callback: (payload: EventData) => void): BoxSlider;
    removeEventListener(ev: EventType, callback: Function): BoxSlider;
    destroy(): void;
    private stopAutoPlay;
    private emit;
    private setAutoScroll;
    private applyEventListeners;
    private addSwipeNavigation;
}
