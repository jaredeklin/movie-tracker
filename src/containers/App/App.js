import React, { Component } from 'react';
import './App.css';
import { Route, Switch, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from '../../components/Home/Home';
import Login from '../Login/Login';
import { loadMovies, 
  logOutUser, 
  clearFavoritesLogOut 
} from '../../actions';
import SignUp from '../../containers/SignUp/SignUp.js';
import { getNowPlaying } from '../../cleaners/getNowPlaying';
import PropTypes from 'prop-types';

export class App extends Component {
  
  async componentDidMount() {
    const nowPlaying = await getNowPlaying();

    this.props.loadMovies(nowPlaying);
  }

  displayLogIn = () => {
    return (
      <div id='login-logout'>
        <NavLink to='/login'>Log In / </NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
      </div>
    );
  };

  displayLogOut = () => {
    const { pathname } = this.props.location;

    return (
      <div className='nav-menu'>
        <div>
          <NavLink
            to='/' 
            id='login-logout'
            onClick={this.handleLogOut}>
            Log Out
          </NavLink>
        </div>
        <div>
          <h3 className='welcome'>
            {`Hello ${this.props.user.name}. We are tracking you....`}
          </h3>
        </div>
        <div className="display-right-corner">
          {pathname === '/' ? this.showFavorites() : this.showHome()}
        </div>      
      </div>
    );
  };

  showFavorites = () => {
    return ( 
      <NavLink 
        to='/favorites' 
        id='show-favorites'>
        Show Favorites
      </NavLink>  
    );
  }

  showHome = () => {
    return (
      <NavLink id='home' to='/'>Home</NavLink>
    );
  }

  handleLogOut = () => {
    this.props.logOutUser();
    this.props.clearFavoritesLogOut();
  }

  render() {
    const { user, movies, favorites } = this.props;

    return (
      <div className="App">
        <header>
          { !user.id ? this.displayLogIn() : this.displayLogOut()}
          <h1>Movie Tracker</h1>
        </header>
        <Switch>
          <Route 
            exact path='/' 
            render={() => <Home movies={movies} favorites={favorites} />} 
          />
          <Route 
            exact path='/login'
            component={Login} 
          />
          <Route 
            exact path='/signup'
            component={SignUp}
          />
          <Route 
            exact path='/favorites'
            render={() => <Home movies={favorites} favorites={favorites} />}
          />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
    favorites: state.favorites
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    loadMovies: (movies) => (dispatch(loadMovies(movies))),
    logOutUser: () => (dispatch(logOutUser())),
    clearFavoritesLogOut: () => (dispatch(clearFavoritesLogOut()))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  loadMovies: PropTypes.func,
  location: PropTypes.object,
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  logOutUser: PropTypes.func,
  clearFavoritesLogOut: PropTypes.func,
  movies: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  favorites: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
};

