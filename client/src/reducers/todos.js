const todos = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_TODO':
      return {
        ...state,
        [action.payload.hash]: { task: action.payload.task, complete: false }
      };
    case 'COMPLETE_TODO': {
      const todo = Object.assign({}, state[action.payload]);
      todo.complete = !todo.complete;
      return { ...state, [action.payload]: todo };
    }

    case 'DELETE_TODO': {
      let newState = { ...state };
      delete newState[[action.payload]];
      return newState;
    }
    default:
      return state;
  }
};

export default todos;
