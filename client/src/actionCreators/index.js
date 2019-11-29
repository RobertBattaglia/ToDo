// Todo
export const createTodo = task => ({
  type: 'CREATE_TODO',
  payload: task
});

export const completeTodo = task => ({
  type: 'COMPLETE_TODO',
  payload: task
});

export const deleteTodo = task => ({
  type: 'DELETE_TODO',
  payload: task
});

export const clearTodos = () => ({
  type: 'CLEAR_TODOS'
});

// USER
export const loginUser = user => ({
  type: 'LOGIN_USER',
  payload: user
});
