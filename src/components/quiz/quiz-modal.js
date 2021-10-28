import { Modal } from '../modal';
import { getQuizData } from './fakeData';
import { selectRole, selectRoles, addHtml } from "../../helpers";
import buildContent from './build-content';

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
    addHtml({ component: modalInner, place: 'afterbegin', html: buildContent({ quizData, activeQuestion }) })
  }

  const reset = () => {
    modalInner.innerHTML = '';
  }

  const buildTestResult = () => {
    testTitle.textContent = 'Ваш результат:';
    if (trueAnswersCounter === 0) {
      testSubtitle.textContent = 'Могло быть и лучше';
    } else if (trueAnswersCounter > 0 && trueAnswersCounter < 4) {
      testSubtitle.textContent = 'Неплохо!';
    } else if (trueAnswersCounter > 3) {
      testSubtitle.textContent = 'Отлично!';
    }

    testResult.textContent = `${trueAnswersCounter} из ${quizData.length}`;
  }

  const removeMissingItems = () => {
    testBtn.remove();
  }

  const changeInput = ({ target }) => {
    if (target.dataset.isTrue === 'true') {
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
  }

  const finishQuiz = () => {
    hide();
    buildTestResult();
    removeMissingItems();
  }

  const clickModalNextBtn = () => {
    activeQuestion++;
    if (activeQuestion >= quizData.length) {
      return finishQuiz();
    }
    reset();
    buildModalInner();
    setElements();
    bindEvents();
  }

  const bindEvents = () => {
    inputs.forEach(element => {
      element.addEventListener('change', changeInput)
    });

    modalNextBtn && modalNextBtn.addEventListener('click', clickModalNextBtn);
  };

  const unbindEvents = () => {
    inputs.forEach(element => {
      element.removeEventListener('change', changeInput)
    });
    modalNextBtn.removeEventListener('click', clickModalNextBtn);
  }

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

  const destroy = () => {
    resetQuizData();
    unbindEvents();
  }

  init();

  return {
    show,
    hide,
    init,
    destroy
  };
}

