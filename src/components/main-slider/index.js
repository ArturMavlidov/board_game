import { mainSliderItems } from '../../fake-data';
import { selectRole, selectRoles } from '../../helpers';

export default function mainSlider(context) {
  context.insertAdjacentHTML('afterbegin', '<div class="slider-line" data-role="slider-line"></div>');
  const sliderLine = selectRole('slider-line', context);
  const wrapper = selectRole('wrapper');
  let sliderItem;
  let width;
  let count = 0;
  let arrowLeft;
  let arrowRight;
  let container = selectRole('container--sm');
  let points;
  let sliderNum;

  const buildWrapper = () => {
    wrapper.insertAdjacentHTML(
      "afterbegin",
      `<img  class="arrow-left dn2" src="assets/img/icons/arrow-right.svg" alt="" data-role="arrow-left">`
    );

    wrapper.insertAdjacentHTML(
      "beforeend",
      `<img class="arrow-right" src="assets/img/icons/arrow-right.svg" alt="" data-role="arrow-right">`
    );
  }


  const buildSliderItem = item => (
    `
      <div class="slider-item" data-role="slider-item">
        <div class="slider-left">
          <div class="slider-title">
            ${item.title}
          </div>
          <div class="slider-subtitle">
            ${item.subtitle}
          </div>
          <div class="slider-btn btn">
            <a class="link" href="${item.link}">Читать далее</a>
          </div>
        </div>
        <div class="slider-right">
          <img class="slider-img" src="${item.image.src}" alt="${item.image.alt}">
        </div>
      </div>
    `
  );

  function renderSlider() {
    Array.isArray(mainSliderItems) && mainSliderItems.forEach((item) => {
      sliderLine.insertAdjacentHTML('afterbegin', buildSliderItem(item));
    });
  }

  function setData() {
    sliderItem = document.querySelectorAll('[data-role="slider-item"]');
    points = selectRoles('slider-point', container);
    arrowLeft = document.querySelector('[data-role="arrow-left"]');
    arrowRight = document.querySelector('[data-role="arrow-right"]');
    sliderNum = selectRole('slider-num', container);
  }

  function init() {
    buildWrapper();
    renderSlider();
    rollSlider();
    buildContainer();
    setData();
    sliderNumListener();

    width = context.offsetWidth;
    sliderLine.style.width = sliderItem * sliderItem.length;
    sliderItem.forEach(item => {
      item.style.width = width + 'px';
      item.style.height = 'auto';
    });
  }

  init();

  function clickArrowLeft() {
    count--;

    if (count < 0) {
      count = sliderItem.length;
    } else if (count === 0) {
      arrowLeft.classList.add('dn2');
    }
    arrowRight.classList.remove('dn2');

    activatePoint(1);
    rollSlider();
  }

  function clickArrowRight() {
    count++;
    arrowLeft.classList.remove('dn2');

    if (count >= sliderItem.length) {
      count = 0;
      arrowLeft.classList.add('dn2');
      arrowRight.classList.remove('dn2');
    } else if (count === sliderItem.length - 1) {
      arrowRight.classList.add('dn2');
    }

    activatePoint(-1);
    rollSlider();
  }

  arrowLeft.addEventListener('click', clickArrowLeft);

  arrowRight.addEventListener('click', clickArrowRight);

  function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
  }

  function buildContainer() {
    container && container.insertAdjacentHTML('beforeend',
    `
    <div class="slider-num" data-role="slider-num">
      <div class="slider-num-item active" data-role="slider-point" data-number="0"></div>
      <div class="slider-num-item" data-role="slider-point" data-number="1"></div>
      <div class="slider-num-item" data-role="slider-point" data-number="2"></div>
      <div class="slider-num-item" data-role="slider-point" data-number="3"></div>
      <div class="slider-num-item" data-role="slider-point" data-number="4"></div>
      <div class="slider-num-item" data-role="slider-point" data-number="5"></div>
    </div>
    `
  );
  }

  function clickPoint({ target }) {
    if (target.closest('[data-role="slider-point"]')) {
      count = target.dataset.number;
      rollSlider();
      points.forEach(item => {
        item.classList.remove('active');
      });
      points[count].classList.add('active');
      count > 0 ? arrowLeft.classList.remove('dn2') : arrowLeft.classList.add('dn2');
      count === points.length - 1 ?  arrowRight.classList.add('dn2') : arrowRight.classList.remove('dn2');
    }
  }

  function sliderNumListener() {
   sliderNum.addEventListener('click', clickPoint);
  }

  function activatePoint(value) {
    points[count].classList.add('active');
    points[count + value].classList.remove('active');
  }

  function destroy() {
    arrowLeft.removeEventListener('click', clickArrowLeft);
    arrowRight.removeEventListener('click', clickArrowRight);
    sliderNum.removeEventListener('click', clickPoint);
  }

  return {
    init,
    destroy
  };
}
