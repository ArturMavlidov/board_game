export const FabricantsItems = [
  {
    link: "https://disney.ru/ook",
    image: {
      src: "https://i.ibb.co/vvCMJw9/image-10.png",
      alt: "Производитель",
    },
  },
  {
    link: "https://disney.ru/ook",
    image: {
      src: "https://i.ibb.co/0tgnxyV/image-11.png",
      alt: "Производитель",
    },
  },
  {
    link: "https://disney.ru/ook",
    image: {
      src: "https://i.ibb.co/q7r28Dc/image-12.png",
      alt: "Производитель",
    },
  },
  {
    link: "https://disney.ru/ook",
    image: {
      src: "https://i.ibb.co/7nFtLkT/image-12-1.png",
      alt: "Производитель",
    },
  },
  {
    link: "https://disney.ru/ook",
    image: {
      src: "https://i.ibb.co/55JTVSs/image-13.png",
      alt: "Производитель",
    },
  },
];

export const getFabricantsItems = () => {
  return new Promise((then) => {
    setTimeout(() => {
      then(FabricantsItems);
    }, 500);
  });
};