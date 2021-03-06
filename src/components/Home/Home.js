import React from 'react';
import Card from '../../containers/Card/Card.js';
import './Home.css';
import PropTypes from 'prop-types';

export const Home = ({ movies, favorites }) => {
  const displayMovies = movies.map((movie, index) => { 
    let selected = '';
    favorites.forEach(favorite => {
      if (favorite.movie_id === movie.movie_id) {
        selected = 'selected';
      }
    });

    return ( <Card 
      movieInfo={movie} 
      key={index}
      selected={selected} />
    );
  });

  return (
    <div className='card-container'>
      <div className='inner-card-container'>
        {displayMovies}
      </div>
    </div>
  );
};

Home.propTypes = {
  movies: PropTypes.array,
  favorites: PropTypes.array
};