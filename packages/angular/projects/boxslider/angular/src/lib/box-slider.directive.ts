import {
  AfterViewInit, Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  BoxSlider,
  BoxSliderOptions,
  CarouselSliderOptions,
  CubeSliderOptions,
  Effect,
  EventData,
  FadeSliderOptions,
  TileSliderOptions
} from '@boxslider/slider';

export type EffectOptions = CarouselSliderOptions | CubeSliderOptions | FadeSliderOptions | TileSliderOptions;

@Directive({ selector: '[bxlSlider]' })
export class BoxSliderDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input() activeSlide: number;
  @Input() autoScroll: boolean;
  @Input() sliderOptions: BoxSliderOptions;
  @Input() effectOptions: EffectOptions;

  @Output() beforeSlide = new EventEmitter<EventData>();
  @Output() afterSlide = new EventEmitter<EventData>();
  @Output() played = new EventEmitter<void>();
  @Output() paused = new EventEmitter<void>();
  @Output() destroyed = new EventEmitter<void>();

  private slider: BoxSlider;

  constructor(private el: ElementRef) {}

  initializeEffect(options: EffectOptions): Effect {
    return undefined;
  }

  ngAfterViewInit() {
    this.slider = new BoxSlider(this.el.nativeElement, {
      autoScroll: this.autoScroll,
      startIndex: this.activeSlide,
      ...this.sliderOptions,
      effect: this.initializeEffect(this.effectOptions)
    });

    this.slider.addEventListener('before', ev => this.beforeSlide.emit(ev));
    this.slider.addEventListener('after', ev => this.afterSlide.emit(ev));
    this.slider.addEventListener('play', () => this.played.emit());
    this.slider.addEventListener('pause', () => this.paused.emit());
    this.slider.addEventListener('destroy', () => this.destroyed.emit());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.slider) {
      return;
    }

    if (changes.activeSlide && changes.activeSlide.currentValue >= 0) {
      this.slider.skipTo(changes.activeSlide.currentValue);
    }

    if (changes.autoScroll) {
      changes.autoScroll.currentValue ? this.slider.play() : this.slider.pause();
    }
  }

  ngOnDestroy() {
    this.slider.destroy();
  }
}
