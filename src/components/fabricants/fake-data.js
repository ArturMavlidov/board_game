export const FabricantsItems = [
  {
    link: 'https://disney.ru/ook',
    image: {
      src: 'https://i.ibb.co/MhX95Tt/1.png',
      alt: 'Производитель'
    }
  },
  {
    link: 'https://disney.ru/ook',
    image: {
      src: 'https://i.ibb.co/Rj5FbrY/2.png',
      alt: 'Производитель'
    }
  },
  {
    link: 'https://disney.ru/ook',
    image: {
      src: 'https://i.ibb.co/WyPVksW/3.png',
      alt: 'Производитель'
    }
  },
  {
    link: 'https://disney.ru/ook',
    image: {
      src: 'https://i.ibb.co/ck9Q9nX/4.png',
      alt: 'Производитель'
    }
  },
  {
    link: 'https://disney.ru/ook',
    image: {
      src: 'https://i.ibb.co/Rj5FbrY/2.png',
      alt: 'Производитель'
    }
  },
];

export const getFabricantsItems = () => {
  return new Promise((then) => {
    setTimeout(() => {
      then(FabricantsItems);
    }, 2000);
  });
};