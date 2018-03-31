export const logInUser = (id, name) => ({
  type: 'LOGIN_USER',
  id,
  name
});

export const logOutUser = () => ({
  type: 'LOGOUT_USER'
});

export const loadMovies = (movies) => ({
  type: 'LOAD_MOVIES',
  movies
});

export const addFavorite = (id) => ({
  type: 'ADD_FAVORITE',
  id
});

export const removeFavorite = (id) => ({
  type: 'REMOVE_FAVORITE',
  id
});

export const showAllFavorites = () => ({
  type: 'SHOW_ALL_FAVORITES'
});