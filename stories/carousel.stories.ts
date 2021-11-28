import { createPage, setUpNavigation } from './story-helpers';
import { BoxSlider } from '../packages/slider/src/box-slider';
import { CarouselSlider } from '../packages/slider/src/effects/carousel-slider';
import { FadeSlider } from '../packages/slider/src/effects/fade-slider';

export const Carousel = (): HTMLElement => {
  const box = document.createElement('div');
  box.classList.add('viewport');

  box.innerHTML = `
    <div class="carousel">
      <div class="slider">
        <figure class="slide">
          <span>ONE</span>
        </figure>
        <figure class="slide">
          <span>TWO</span>
        </figure>
        <figure class="slide">
          <span>THREE</span>
        </figure>
        <figure class="slide">
          <span>FOUR</span>
        </figure>
        <figure class="slide">
          <span>FIVE</span>
        </figure>
      </div>
      
      <div class="text-captions">
        <div class="text active">This is slide one</div>
        <div class="text">This is slide two</div>
        <div class="text">This is slide three</div>
        <div class="text">This is slide four</div>
        <div class="text">This is slide five</div>
      </div>
    </div>
  `;

  const page = createPage(box);

  setTimeout(() => {
    const slider = new BoxSlider(box.querySelector('.slider'), {
      effect: new CarouselSlider(),
      timeout: 5000,
      speed: 1000,
      autoScroll: false
    });

    setUpNavigation(page, slider);

    const textCaptionsSlider = new BoxSlider(page.querySelector('.text-captions'), {
      effect: new FadeSlider(),
      speed: 1000,
    });

    slider.addEventListener('before', settings => textCaptionsSlider.skipTo(settings.nextIndex));
    slider.addEventListener('destroy', () => textCaptionsSlider.destroy());
  }, 500);

  return page;
};
