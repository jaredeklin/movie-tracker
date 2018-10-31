const apiKey = process.env.REACT_APP_MOVIE_DB_KEY;

export const getNowPlaying = async () => {
  const rootUrl = 'https://api.themoviedb.org/3/movie/now_playing?page=1';
  try {
    const response = await fetch(
      `${rootUrl}&language=en-US&api_key=${apiKey}&language=en-US`);
    const nowPlayingData = await response.json();
    const cleanedMovies = cleanMovies(nowPlayingData);
    return cleanedMovies;
  } catch (error) {
    throw error;
  }
};

export const cleanMovies = (movieData) => {
  return movieData.results.map(movie => ({
    movie_id: movie.id, 
    title: movie.title, 
    poster_path: movie.poster_path, 
    release_date: movie.release_date, 
    vote_average: movie.vote_average, 
    overview: movie.overview  
  }));
};