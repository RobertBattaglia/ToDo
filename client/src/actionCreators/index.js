export const createTodo = task => ({
  type: 'CREATE_TODO',
  payload: task
});

export const completeTodo = task => ({
  type: 'COMPLETE_TODO',
  payload: task
});

export const updateTodo = (task, updateTask) => ({
  type: 'UPDATE_TODO',
  payload: { task, updateTask }
});

export const deleteTodo = task => ({
  type: 'DELETE_TODO',
  payload: task
});
