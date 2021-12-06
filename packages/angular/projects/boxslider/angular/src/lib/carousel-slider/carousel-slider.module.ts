import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselSliderDirective } from './carousel-slider.directive';

@NgModule({
  declarations: [CarouselSliderDirective],
  exports: [CarouselSliderDirective],
  imports: [CommonModule]
})
export class CarouselSliderModule {}
