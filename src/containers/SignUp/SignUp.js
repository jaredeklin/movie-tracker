import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './SignUp.css';
import { logInUser } from '../../actions';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';

const url = process.env.REACT_APP_DATABASE_URL;

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      signUpError: false,
      loading: false
    };
  }
 
  handleFetch = async (userInfo) => { 
    try {
      this.setState({ loading: true });
      const response = await fetch(`${url}/api/v1/users`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
          'content-type': 'application/json'
        }
      });
      this.setState({ loading: false });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const newAccount = await response.json();
      const { id, name } = newAccount;

      this.props.logInUser(id, name);
      this.props.history.push('/');
      
    } catch (error) {
      this.setState({ signUpError: true });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const info = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.handleFetch(info);
    this.setState({
      name: '',
      email: '',
      password: ''
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            name='name'
            id='name'
            value={this.state.name}
            placeholder='Name'
            onChange={this.handleChange}
          />
          <input 
            type='email'
            name='email'
            id='email'
            value={this.state.email}
            placeholder='Email'
            onChange={this.handleChange}
          />
          <input 
            type='password'
            name='password'
            id='password'
            value={this.state.password}
            placeholder='Password'
            onChange={this.handleChange}
          />
          <button className='submit'>Submit</button>
        </form>
        { this.state.loading && <Loading /> }
        { this.state.signUpError &&
            <section>
              <p>This email has already been used</p>
              <NavLink to="/login">Already a member?</NavLink>
            </section>
        }
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (id, name) => (dispatch(logInUser(id, name)))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(SignUp));

SignUp.propTypes = {
  logInUser: PropTypes.func,
  history: PropTypes.object
};