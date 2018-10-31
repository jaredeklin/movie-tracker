import React, { Component } from 'react';
import { addToFavorites } from '../../cleaners/addToFavorites.js';
import { removeFromFavorites } from '../../cleaners/removeFromFavorites.js';
import { addFavorite, removeFavorite } from '../../actions/';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Card.css';

export class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.userMovie = {
      ...this.props.movieInfo, 
      user_id: this.props.user.id
    };
  }

  addFavoritesToStore = async (userMovie) => {
    const { movieInfo, user, addFavorite, removeFavorite } = this.props;
    const isInFavorites = this.props.favorites
      .find(favorite => favorite.movie_id === movieInfo.movie_id);
    
    if (!isInFavorites) {
      await addToFavorites(userMovie);
      addFavorite(userMovie);
    } else {
      removeFavorite(movieInfo.movie_id);
      removeFromFavorites(user.id, movieInfo.movie_id);
    }
  };

  validateUser = () => { 
    if (!this.props.user.id) {
      this.setState({ loggedIn: !this.state.loggedIn });
    } else {
      this.addFavoritesToStore(this.userMovie);
    }
  };

  render () {
    const { poster_path, title, overview, vote_average } = this.props.movieInfo;

    return (
      <div className='card'>
        <img className='poster-img'
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt='movie poster' />
        <div className='card-details'>
          {
            !this.state.loggedIn &&
              <div>
                <h2 className='title'>{title}</h2>
                <p className='card-synopsis'>{overview}</p>
              </div>
          }
          {
            this.state.loggedIn &&
              <h2 className='card-synopsis error'>
                Login to your account to add favorites
              </h2>
          }
          <div className='average-rating'>{vote_average}</div>
          <button 
            onClick={this.validateUser}
            className={`favorites ${this.props.selected}`}>
          </button>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  favorites: state.favorites
});

export const mapDispatchToProps = (dispatch) => ({
  addFavorite: (movie) => (dispatch(addFavorite(movie))),
  removeFavorite: (movie_id) => (dispatch(removeFavorite(movie_id))) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);

Card.propTypes = {
  user: PropTypes.object,
  favorites: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  movieInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
  selected: PropTypes.string
};
