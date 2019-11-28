const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER': {
      let user = action.payload;
      user.isLoggedIn = true;
      return user;
    }
    default:
      return state;
  }
};

export default user;
