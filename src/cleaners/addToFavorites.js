const url = process.env.REACT_APP_DATABASE_URL;

export const addToFavorites = async (movie) => {
  try {
    const response = await fetch(`${url}/api/v1/favorites`, {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'content-type': 'application/json'
      }
    });
    const favoriteData = await response.json();
   
    return favoriteData;
  } catch (error) {
    throw error;
  }
};