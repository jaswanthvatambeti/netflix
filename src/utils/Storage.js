export const addToList = (movie) => {
  let list = JSON.parse(localStorage.getItem("myList")) || [];
  const exists = list.find((m) => m.id === movie.id);

  if (!exists) {
    list.push(movie);
    localStorage.setItem("myList", JSON.stringify(list));
  }
};

export const getList = () => {
  return JSON.parse(localStorage.getItem("myList")) || [];
};

export const removeFromList = (id) => {
  let list = JSON.parse(localStorage.getItem("myList")) || [];
  list = list.filter((movie) => movie.id !== id);
  localStorage.setItem("myList", JSON.stringify(list));
};
