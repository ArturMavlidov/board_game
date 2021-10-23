import { selectRole } from "../../helpers";
import { QuizModal } from './quiz-modal';

export default function Quiz(context) {
  const btn = selectRole('test-btn', context);
  const quizModal = QuizModal(context);

  const bindEvents = () => {
    btn && btn.addEventListener('click', quizModal.show);
  };

  const unbindEvents = () => {
    btn && btn.removeEventListener('click', quizModal.hide);
  };

  const init  = () => {
    bindEvents();
  };

  const destroy = () => {
    unbindEvents();
  };

  init();

  return {
    init,
    destroy
  };
}
