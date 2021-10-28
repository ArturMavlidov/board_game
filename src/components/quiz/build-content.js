  export default ({ quizData, activeQuestion }) => {

    const buildItem = (item) => {
      return (
        `<div class="modal-answers__item">
          <input class="modal-input" type="radio" name="answer" id="${item.title}" value="${item.title}" data-is-true=${Boolean(item.isTrue)} data-role="quiz-modal/input">
          <label for="${item.title}" class="modal-label modal-option" data-role="modal-label">${item.title}
          <span class="modal-radio"></span>
        </div>`
      )
    }

    return `
      <div class="modal-close" data-role="modal-close"></div>
      <div class="modal-wrapper">
        <div class="modal-count">${activeQuestion + 1}/${quizData.length}</div>
        <div class="container--modal">
          <span class="modal-title">${quizData[activeQuestion].question}</span>
          <div class="modal-subtitle">${quizData[activeQuestion].subtitle}</div>
          <div class="modal-answers">${quizData[activeQuestion].answers.map(buildItem).join('')}</div>
          <div class="modal-button">
            <button class="modal-next btn" data-role="modal-next">Next</button>
          </div>
        </div>
      </div>
    `;
  };