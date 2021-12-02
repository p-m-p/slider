import { createPage, setUpNavigation } from './story-helpers';
import { BoxSlider } from '../src/box-slider';
import { CubeSlider } from '../src/effects/cube-slider';

function createCubeStory(direction: 'horizontal' | 'vertical'): () => HTMLElement {
  return (): HTMLElement => {
    const box = document.createElement('div');
    box.classList.add('viewport');

    box.innerHTML = `
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
  `;

    const page = createPage(box);

    setTimeout(() => {
      const slider = new BoxSlider(box.querySelector('.slider') as HTMLElement, {
        effect: new CubeSlider({ direction }),
        timeout: 5000,
        speed: 1000,
        autoScroll: false
      });

      setUpNavigation(page, slider);
    }, 500);

    return page;
  }
}

export const HorizontalCube = createCubeStory('horizontal');
export const VerticalCube = createCubeStory('vertical');
