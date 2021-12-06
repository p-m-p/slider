import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TileSliderDirective } from './tile-slider.directive';

@NgModule({
  declarations: [TileSliderDirective],
  exports: [TileSliderDirective],
  imports: [CommonModule]
})
export class TileSliderModule { }
