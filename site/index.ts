import './main.scss';
import { BoxSlider, CarouselSlider } from '../src';

const usageLanguage = document.querySelector('.usage-languages');
const usageLanguageSlider = new BoxSlider(usageLanguage, { effect: new CarouselSlider() });

usageLanguageSlider.next();
