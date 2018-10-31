const url = process.env.REACT_APP_DATABASE_URL;

export const removeFromFavorites = async (user_id, movie_id) => {
  const removeInfo = JSON.stringify({ user_id, movie_id });
  
  try {
    const response = await fetch(`${url}/api/v1/favorites/${removeInfo}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    });
    const removedData = await response.json();
    
    return removedData;
  } catch (error) {
    throw error;
  }
};