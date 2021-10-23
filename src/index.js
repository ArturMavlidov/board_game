import './styles/index.scss';
import { Header, MainSlider, Categories, Quiz } from './components';
import { registerComponent } from './helpers';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent({
    'header': Header,
    'main-slider': MainSlider,
    'categories': Categories,
    'quiz': Quiz,
  });
});
