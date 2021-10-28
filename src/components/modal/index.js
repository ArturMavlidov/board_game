import { addHtml, selectRole } from "../../helpers";

/**
 * Assign the project to an employee.
 * @param {Object} config - объект с конфигом
 * @param {string} config.content - Контент модалки
 * @param {string} config.extraClass - доп. класс модалки
 */
export function Modal(config) {
  let modalElement;
  let modalInnerElement;
  let closeBtnElement;

  const buildModalWindow = () => {
    return `
      <div class="modal ${config.extraClass}" data-role="modal" >
        <div class="modal-inner" data-role="modal-inner">
        <div class="modal-close" data-role="modal-close"></div>
        </div>
      </div>
    `;
  };

  const buildModal= () => {
    addHtml({
      component: document.body,
      html: buildModalWindow()
    });
  };

  const setElements = () => {
    modalElement = selectRole('modal');
    modalInnerElement = selectRole('modal-inner');
    closeBtnElement = selectRole('modal-close');
  };

  function showModalInner() {
    modalInnerElement.classList.add('active');
  }

  const show = () => {
    document.body.classList.add('lock');
    modalElement.classList.add('active');
    window.requestAnimationFrame(showModalInner);
  };

  const hide = () => {
    document.body.classList.remove('lock');
    modalElement.classList.remove('active');
    modalInnerElement.classList.remove('active');
  };

  const bindEvents = () => {
    document.addEventListener('keyup', (event) => {
      if (event.code === 'Escape') {
        hide();
      }
    });
    document.addEventListener('click', (event) => {
    if (modalElement && event.target === modalElement || closeBtnElement && event.target === closeBtnElement) {
      hide();
    }
  });
  };

  const init = () => {
    buildModal();
    setElements();
    bindEvents();
  };

  init();

  return {
    show,
    hide,
    init
  };

}
