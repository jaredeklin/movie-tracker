import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Login.css';
import { logInUser, addAllFavorites } from '../../actions';
import { loadAllFavorites } from '../../cleaners/loadAllFavorites.js';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';

const url = process.env.REACT_APP_DATABASE_URL;

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: false,
      loading: false
    };
  }

  submitEmail = (event) => {
    event.preventDefault();
    const userInfo = { email: this.state.email, password: this.state.password };
    this.logIn(userInfo);
  }

  logIn = async (userInfo) => {
    const user = JSON.stringify(userInfo);

    try {
      this.setState({ loading: true });
      const response = await fetch(`${url}/api/v1/users/${user}`);
      this.setState({ loading: false });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const logInData = await response.json();
      this.redirectUser(logInData.id, logInData.name);
      this.showFavorites(logInData.id);
    } catch (error) {
      this.setState({error: true});
    }
  }

  showFavorites = async (userId) => {
    const allFavorites = await loadAllFavorites(userId);

    this.props.addAllFavorites(allFavorites);
  }

  redirectUser = (id, name) => {
    this.props.logInUser(id, name);
    const path = "/";
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitEmail}>
          <input 
            type='text' 
            id='email' 
            value={this.state.email} 
            placeholder='Email'
            onChange={(event) => this.setState({ 
              email: event.target.value })}
          />
          <input 
            type='password' 
            id='password' 
            value={this.state.password} 
            placeholder='Password'
            onChange={(event) => this.setState({ 
              password: event.target.value })}
          />
          <button className='submit'>Submit</button>
        </form>
        { this.state.loading && <Loading /> }
        { this.state.error &&
            <section>
              <p>Email and password do not match, please try again.</p>
              <NavLink to="/signup">Sign Up</NavLink>
            </section>
        }
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (id, name) => (dispatch(logInUser(id, name))),
    addAllFavorites: (movies) => (dispatch(addAllFavorites(movies)))
  };
};  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

Login.propTypes = {
  history: PropTypes.object,
  logInUser: PropTypes.func,
  addAllFavorites: PropTypes.func
};