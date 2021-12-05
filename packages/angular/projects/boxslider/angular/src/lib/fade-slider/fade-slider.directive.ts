import { Directive } from '@angular/core';
import { FadeSlider, FadeSliderOptions } from '@boxslider/slider';

import { BoxSliderDirective } from '../box-slider.directive';

@Directive({
  selector: '[bxlFadeSlider]',
})
export class FadeSliderDirective extends BoxSliderDirective {

  initializeEffect(options: FadeSliderOptions): FadeSlider {
    return new FadeSlider(options);
  }
}
