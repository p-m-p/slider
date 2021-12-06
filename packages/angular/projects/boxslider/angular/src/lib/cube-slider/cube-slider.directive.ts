import { Directive } from '@angular/core';
import { CubeSlider, CubeSliderOptions } from '@boxslider/slider';

import { BoxSliderDirective } from '../box-slider.directive';

@Directive({
  selector: '[bxlCubeSlider]'
})
export class CubeSliderDirective extends BoxSliderDirective {

  initializeEffect(options: CubeSliderOptions): CubeSlider {
    return new CubeSlider(options);
  }
}
