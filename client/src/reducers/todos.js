const todos = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_TODO':
      return { ...state, payload: action.payload };
    case 'COMPLETE_TODO':
      break;
    case 'UPDATE_TODO':
      break;
    case 'DELETE_TODO':
      break;
    default:
      return state;
  }
};

export default todos;
