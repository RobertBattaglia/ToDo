export const changeLocalStorage = cb => {
  const local = Object.assign({}, JSON.parse(localStorage.getItem('todos')));
  cb(local);
  localStorage.setItem('todos', JSON.stringify(local));
};
