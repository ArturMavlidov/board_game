import { Modal } from '../modal';
import { getQuizData } from './fakeData';
import { selectRoles } from "../../helpers";

export function QuizModal(context) {
  let activeQuestion = 0;
  let modalNext;
  let modal;
  let quizData;

  const resetQuizData = () => {
    quizData = null;
  };

  const show = () => {
    modal.show();
  };

  const hide = () => {
    resetQuizData();
    modal.hide();
  };

  const buildContent = () => {
    return `
      <div class="modal-wrapper">
        <div class="modal-count">1/3</div>
        <div class="container--modal">
          <span class="modal-title">${quizData[activeQuestion].question}</span>
          <div class="modal-answers">
            ${
              quizData[activeQuestion].answers.map(item => {
                return (
                  `
                    <div class="modal-answers__item">
                      <input class="modal-input" type="radio" name="answer" value="${item.title}" id="${item.title}" data-is-true=${Boolean(item.isTrue)} data-role="quiz-modal/input">
                      <label for="${item.title}" class="modal-label">${item.title}
                    </div>
                  `
                );
              })
            }
          </div>
        </div>
      </div>
    `;
  };

  const initModal = () => {
    modal = Modal({
      content: buildContent(),
    });
  };

  const setQuizData = (data) => {
    quizData = data;
  };

  const bindEvents = () => {
    const inputs = selectRoles('quiz-modal/input');
    inputs.forEach(element => {
      element.addEventListener('change', ({ target }) => {
        console.log(target.dataset.isTrue);
      });
    });
  };

  const fetchData = () => {
    getQuizData().then((data) => {
      setQuizData(data);
      initModal();
      bindEvents();
    });
  };

  const init = () => {
    fetchData();
  };

  init();

  return {
    show,
    hide,
    init
  };
}

