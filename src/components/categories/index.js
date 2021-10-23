import { categoryItems } from './fake-data';
import { selectRole, addHtml } from '../../helpers';

export default function categories(context) {
  function buildContainer() {
     return `
      <div class="container--lg">
        <div data-role="categories-inner" class="categories-inner"></div>
      </div>
    `;
  }



  addHtml({ component: context, place: 'beforeend', html: buildContainer() });

  const categoriesInner = selectRole('categories-inner');

  const buildCategoryItem = item => (
    `
      <div class="categories-item">
        <div class="categories-img">
          <a href="${item.link}"><img src="${item.image.src}" alt="${item.image.alt}"></a>
        </div>
        <div class="categories-title">
          <a href="${item.link}">${item.title}</a>
        </div>
      </div>
    `
  );

  function renderCategory() {
    Array.isArray(categoryItems) && categoryItems.forEach((item) => {
      addHtml({ component: categoriesInner, place: 'afterbegin', html: buildCategoryItem(item) });
    });
  }

  function init() {
    renderCategory();
  }

  init();

  return {
    init
  };
}
