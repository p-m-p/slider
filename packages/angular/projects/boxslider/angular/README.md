BoxSlider Angular
=== 

Angular directives for the [BoxSlider](https://github.com/boxslider/slider) content 
slider.

Installation
---
```
npm install --save @boxslider/slider @boxslider/angular
```

Usage
---

Import the module for the slider you wish to use into your application module.

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FadeSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Add the directive to your slider HTML in the template.

```html
<div class="viewport">
  <div class="slider" bxlFadeSlider 
       [activeSlide]="activeSlide" 
       [autoScroll]="autoScroll"
       (beforeSlide)="handleBeforeSlide($event)"
       (afterSlide)="handleAfterSlide($event)">
    <div class="slide">One</div>
    <div class="slide">Two</div>
    <div class="slide">Three</div>
    <div class="slide">Four</div>
    <div class="slide">Five</div>
    <div class="slide">Six</div>
    <div class="slide">Seven</div>
    <div class="slide">Eight</div>
  </div>
</div>
```

Inputs
---

* `sliderOptions: BoxSliderOptions` See the BoxSlider [documentation](https://github.com/boxslider/slider#options)
  for the available options but note that there is no need to provide the `effect` option.
* `effectOptions: EffectOptions` The options for the effect in use. See the effect option 
  [documentation](https://github.com/boxslider/slider#effect-options) for detailed information.
* `activeSlide: number` use this input to control the visible slide at a zero based
  index. For instance setting this to 2 will show slide number 3. 
* `autoScroll: boolean` use this input to control if the slider is playing or paused.

Outputs
---

* `beforeSlide: EventData` Emits on the BoxSlider `before` event.
* `afterSlide: EventData` Emits on the BoxSlider `after` event.
* `played: void` Emits on the BoxSlider `play` event.
* `paused: void` Emits on the BoxSlider `paused` event.
* `destroyed: void` Emits on the BoxSlider `destroy` event when the component is
  destroyed during its lifecycle.
