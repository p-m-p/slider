import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CubeSliderDirective } from './cube-slider.directive';

@NgModule({
  declarations: [CubeSliderDirective],
  exports: [CubeSliderDirective],
  imports: [CommonModule]
})
export class CubeSliderModule { }
