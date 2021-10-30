import { selectRole, addHtml } from '../../helpers';
import { getFabricantsItems } from './fake-data';

export default function fabricants(context) {
  const fabricantsBtn = selectRole('fabricants-btn');
  const wave = selectRole('wave');
  let fabricantsItems;
  let fabricantsContainer = selectRole("fabricants-container");

  const setFabricantsItems = (FabricantsItems) => {
    fabricantsItems = FabricantsItems;
  }

  const showAnimation = () => {
    wave.classList.add('df');
    fabricantsBtn.classList.add('dn2');
  }

  const hideAnimation= () => {
    wave.classList.remove('df');
    fabricantsBtn.classList.remove('dn2');
  }

  const buildFabricantsImages = item => (
    `
      <div class="fabricants-item"><a href="${item.link}"><img src="${item.image.src}" alt="${item.image.alt}"></a></div>
    `
  )

  const buildFabricants = () => {
    Array.isArray(fabricantsItems) && fabricantsItems.forEach(item => {
      addHtml({ component: fabricantsContainer, html: buildFabricantsImages(item) });
    })
  }

  const fetchFabricantsItems = () => {
    showAnimation();

    getFabricantsItems()
      .then((FabricantsItems) => {
        setFabricantsItems(FabricantsItems);
        buildFabricants();
      })
      .finally(() => {
        hideAnimation();
      });
  };

  const bindEvents = () => {
    fabricantsBtn.addEventListener('click', fetchFabricantsItems);
  }

  const unbindEvents = () => {
    fabricantsBtn.removeEventListener('click', fetchFabricantsItems);
  }

  const init = () => {
    bindEvents();
  }

  const destroy = () => {
    unbindEvents();
  }

  init();

  return {
    init,
    destroy
  }
}