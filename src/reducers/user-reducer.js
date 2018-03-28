const userReducer = (state = [], action) => {
  console.log('userReducer', action)
  switch(action.type) {
  case 'ADD_NEW_USER':
    return [...state, { username: action.username, password: action.password }];

  default:
    return state;
  }
}

export default userReducer;