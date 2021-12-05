import { NgModule } from '@angular/core';

import { CarouselSliderModule } from './carousel-slider/carousel-slider.module';
import { CubeSliderModule } from './cube-slider/cube-slider.module';
import { FadeSliderModule } from './fade-slider/fade-slider.module';
import { TileSliderModule } from './tile-slider/tile-slider.module';
import { BoxSliderDirective } from './box-slider.directive';

@NgModule({
  imports: [
    CarouselSliderModule,
    CubeSliderModule,
    FadeSliderModule,
    TileSliderModule
  ],
  declarations: [BoxSliderDirective]
})
export class BoxSliderModule {}
