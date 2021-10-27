import { Modal } from '../modal';
import { getQuizData } from './fakeData';
import { selectRole, selectRoles, addHtml } from "../../helpers";

export function QuizModal(context) {
  let activeQuestion = 0;
  let testTitle = selectRole('test-title', context);
  let testSubtitle = selectRole('test-subtitle', context);
  let testResult = selectRole('test-result', context);
  let testBtn = selectRole('test-btn', context);
  let modalInner;
  let modalNextBtn;
  let modal;
  let quizData;
  let inputs;
  let trueAnswersCounter = 0;

  const resetQuizData = () => {
    quizData = null;
  };

  const show = () => {
    modal.show();
  };

  const hide = () => {
    modal.hide();
  };

  const buildContent = () => {
    return `
      <div class="modal-close" data-role="modal-close"></div>
      <div class="modal-wrapper">
        <div class="modal-count">${quizData[activeQuestion].count}</div>
        <div class="container--modal">
          <span class="modal-title">${quizData[activeQuestion].question}</span>
          <div class="modal-subtitle">${quizData[activeQuestion].subtitle}</div>
          <div class="modal-answers">
            ${
              quizData[activeQuestion].answers.map(item => {
                return (
                    `<div class="modal-answers__item">
                        <input class="modal-input" type="radio" name="answer" id="${item.title}" value="${item.title}" data-is-true=${Boolean(item.isTrue)} data-role="quiz-modal/input">
                        <label for="${item.title}" class="modal-label modal-option" data-role="modal-label">${item.title}
                        <span class="modal-radio"></span>
                    </div>`
                );
              })
            }
          </div>
          <div class="modal-button">
            <button class="modal-next btn" data-role="modal-next">Next</button>
          </div>
        </div>
      </div>
    `;
  };

  const initModal = () => {
    modal = Modal({});
  };

  const setElements = () => {
    modalNextBtn = selectRole('modal-next');
    inputs = selectRoles('quiz-modal/input');
  }

  const setQuizData = (data) => {
    quizData = data;
  };

  const buildModalInner = () => {
    modalInner = selectRole('modal-inner');
    addHtml({ component: modalInner, place: 'afterbegin', html: buildContent() })
  }

  const reset = () => {
    modalInner.innerHTML = '';
  }

  const buildTestResult = () => {
    testTitle.textContent = 'Ваш результат:';
    if (trueAnswersCounter == 0) {
      testSubtitle.textContent = 'Могло быть и лучше';
    } else if (trueAnswersCounter == 1) {
      testSubtitle.textContent = 'Неплохо, можете попробовать снова';
    } else if (trueAnswersCounter == 2) {
      testSubtitle.textContent = 'Хорошо!';
    } else if (trueAnswersCounter == 3) {
      testSubtitle.textContent = 'Отлично!';
    }

    testResult.textContent = `${trueAnswersCounter} из ${quizData.length}`;
    testBtn.textContent = 'Пройти заново';
  }

  const bindEvents = () => {
    inputs.forEach(element => {
      element.addEventListener('change', ({ target }) => {
        if (target.dataset.isTrue == 'true') {
          target.classList.add('true');
          trueAnswersCounter++
        } else {
          target.classList.add('false');
        }

        console.log(trueAnswersCounter);
        inputs.forEach(item => {
          item.setAttribute('disabled', 'disabled');
        });

        modalNextBtn.classList.add('active');
      });
    });

    modalNextBtn.addEventListener('click', () => {
        activeQuestion++;
        if (activeQuestion >= quizData.length) {
          hide();
          buildTestResult();
        } else {
          reset();
          buildModalInner();
          setElements();
          bindEvents();
        }
    })
  };



  const fetchData = () => {
    getQuizData().then((data) => {
      setQuizData(data);
      initModal();
      buildModalInner();
      setElements();
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

