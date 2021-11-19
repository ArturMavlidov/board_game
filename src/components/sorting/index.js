export default function sortItems(array, sorting) {
  if (sorting == "new") {
    array.sort((a, b) =>
      Date.parse(a.date) < Date.parse(b.date) ? 1 : -1
    );
  } else if (sorting == "old") {
    array.sort((a, b) =>
      Date.parse(a.date) > Date.parse(b.date) ? 1 : -1
    );
  } else if (sorting == "like") {
    array.sort((a, b) => (Number(a.like) < Number(b.like) ? 1 : -1));
  }
};
