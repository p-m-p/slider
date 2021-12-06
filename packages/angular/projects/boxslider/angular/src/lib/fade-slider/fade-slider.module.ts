import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadeSliderDirective } from './fade-slider.directive';

@NgModule({
  declarations: [FadeSliderDirective],
  exports: [FadeSliderDirective],
  imports: [CommonModule]
})
export class FadeSliderModule { }
