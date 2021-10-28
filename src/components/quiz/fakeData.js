/* global Promise */

const data = [
  {
    question: 'Сколько людей на земле?',
    subtitle: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, adipisci velit...',
    answers: [
      { title: '2 миллиарда' },
      { title: '4 миллиарда' },
      { title: '5 миллиардов' },
      { title: '7 миллиардов', isTrue: true }
    ]
  },
  {
    question: 'Какого цвета елка?',
    subtitle: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, adipisci velit...',
    answers: [
      { title: 'красного' },
      { title: 'зеленого', isTrue: true },
      { title: 'голубого' },
      { title: 'синего' }
    ]
  },
  {
    question: 'Столица России?',
    subtitle: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, adipisci velit...',
    answers: [
      { title: 'Канберра' },
      { title: 'Лондон'},
      { title: 'Москва', isTrue: true  },
      { title: 'Берлин' }
    ]
  }
];

export const getQuizData = () => {
  return new Promise((then) => {
    setTimeout(() => {
      then(data);
    }, 200);
  });
};
