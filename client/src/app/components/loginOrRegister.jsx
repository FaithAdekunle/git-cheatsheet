import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserActions from '../actions/userActions';

export class LoginOrRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      register: false,
      errorResponse: '',
      user: { email: '', password: '' },
      errors: { email: '', password: '' },
    };
    this.selectLogin = this.selectLogin.bind(this);
    this.selectRegister = this.selectRegister.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const { target } = event;
    const { user, errors } = this.state;
    user[target.name] = target.value;
    if (!target.value) {
      errors[target.name] = `${target.name} must be provided`;
    } else {
      errors[target.name] = '';
    }
    this.setState({ user, errors });
  }

  async onSubmit(event) {
    const { user, login } = this.state;
    const { logUserIn, registerUser } = this.props;
    event.preventDefault();
    if (this.validateUser()) {
      this.setState({ errorResponse: '' });
      try {
        login ? await logUserIn(user) : await registerUser(user);
      } catch (error) {
        this.setState({ errorResponse: error.message });
      }
    }
  }

  selectLogin() {
    this.setState({ login: true, register: false, errorResponse: '' });
  }

  selectRegister() {
    this.setState({ login: false, register: true, errorResponse: '' });
  }

  validateUser() {
    const { user, errors } = this.state;
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!user.password) {
      errors.password = 'password must be provided';
    } else {
      errors.password = '';
    }
    if (!user.email) {
      errors.email = 'email must be provided';
    } else if (!validateEmail.test(user.email.toLowerCase())) {
      errors.email = 'email must be valid';
    } else {
      errors.email = '';
    }
    this.setState({ errors });
    return !(errors.email || errors.password);
  }

  render() {
    const {
      login,
      register,
      user,
      errors,
      errorResponse,
    } = this.state;
    return (
      <div className="text-center">
        <span
          className={`authenticate login${login ? ' active' : ''}`}
          onClick={this.selectLogin}
        >
          <b>Login</b>
        </span>
        {' | '}
        <span
          className={`authenticate register${register ? ' active' : ''}`}
          onClick={this.selectRegister}
        >
          <b>Register</b>
        </span>
        <div className="card text-left">
          <div className="card-body">
            {
              errorResponse ? <div className="error-response text-center">{errorResponse}</div> : ''
            }
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Email</label>
                <span className="error">{errors.email}</span>
                <input
                  className="form-control email-field"
                  name="email"
                  value={user.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <span className="error">{errors.password}</span>
                <input
                  className="form-control password-field"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="text-right">
                <input className="submit" type="submit" value={`${login ? 'Login' : 'Register'}`} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  logUserIn: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  logUserIn: credentials => dispatch(UserActions.login(credentials)),
  registerUser: credentials => dispatch(UserActions.register(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginOrRegister);
