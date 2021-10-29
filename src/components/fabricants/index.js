import { selectRole, addHtml } from '../../helpers';
import { getFabricantsItems } from './fake-data';

export default function fabricants(context) {
  const fabricantsBtn = selectRole('fabricants-btn');
  const wave = selectRole('wave');
  let fabricantsItems;
  let fabricantsContainer;
  let loading = false;

  const setFabricantsItems = (FabricantsItems) => {
    fabricantsItems = FabricantsItems;
  }


  const setfabricantsContainer = () => {
    fabricantsContainer = selectRole('fabricants-container');
  }

  const setLoading = (bool) => {
    loading = bool;
  }

  const showAnimation = () => {
    wave.classList.add('df');
    fabricantsBtn.classList.add('dn2');
  }

  const hideAnimation= () => {
    wave.classList.remove('df');
    fabricantsBtn.classList.remove('dn2');
  }

  const fetchFabricantsItems = () => {
    setLoading(true);
    showAnimation();

    getFabricantsItems()
    .then((FabricantsItems) => {
      setFabricantsItems(FabricantsItems);
      buildFabricants();
    })
    .finally(() => {
      setLoading(false);
      hideAnimation();
    })
  }

  const buildFabricantsContainer = () => (
    `
      <div class="fabricants-images" data-role="fabricants-container"></div>
    `
  )

  const buildFabricantsImages = item => (
    `
      <div class="fabricants-item"><a href="${item.link}"><img src="${item.image.src}" alt="${item.image.alt}"></a></div>
    `
  )

  const buildFabricants = () => {
    addHtml({ component: fabricantsBtn, place: 'beforebegin', html: buildFabricantsContainer() });
    setfabricantsContainer();
    Array.isArray(fabricantsItems) && fabricantsItems.forEach(item => {
      addHtml({ component: fabricantsContainer, place: 'afterbegin', html: buildFabricantsImages(item) });
    })
  }

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