import './styles/index.scss';
import { Header, MainSlider, Categories, Quiz, Fabricants } from './components';
import { registerComponent } from './helpers';
import fabricants from './components/fabricants';

document.addEventListener('DOMContentLoaded', () => {
  registerComponent({
    'header': Header,
    'main-slider': MainSlider,
    'categories': Categories,
    'quiz': Quiz,
    'fabricants': Fabricants
  });
});
