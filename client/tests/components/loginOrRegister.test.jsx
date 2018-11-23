import React from 'react';
import { shallow } from 'enzyme';
import { LoginOrRegister, mapStateToProps, mapDispatchToProps } from '../../src/app/components/loginOrRegister';
import mockState from '../mockState';

let wrapper;

const mockEvent = (value, name) => ({
  target: { value, name },
  preventDefault: jest.fn(),
});

const props = {
  logUserIn: jest.fn(),
  registerUser: jest.fn(),
};

describe('<LodinOrRegister />', () => {
  beforeEach(() => {
    props.logUserIn.mockClear();
    props.registerUser.mockClear();
    wrapper = shallow(<LoginOrRegister {...props} />);
  });

  test('should set clicked link to active', () => {
    let active;
    active = wrapper.find('.active');
    expect(active.text()).toBe('Login');
    const register = wrapper.find('.register');
    register.simulate('click');
    wrapper.update();
    active = wrapper.find('.active');
    expect(active.text()).toBe('Register');
    const login = wrapper.find('.login');
    login.simulate('click');
    active = wrapper.find('.active');
    expect(active.text()).toBe('Login');
  });

  test('should set email property of user state', () => {
    const email = 'test@email.com';
    const emailField = wrapper.find('.email-field');
    emailField.simulate('change', mockEvent(email, 'email'));
    wrapper.update();
    expect(wrapper.state('user').email).toBe(email);
  });

  test('should set email property of errors state', () => {
    const emailField = wrapper.find('.email-field');
    emailField.simulate('change', mockEvent('', 'email'));
    wrapper.update();
    expect(wrapper.state('errors').email).toBe('email must be provided');
  });

  test('should set email and password properties of errors state', () => {
    const form = wrapper.find('form');
    form.simulate('submit', mockEvent());
    const errors = { email: 'email must be provided', password: 'password must be provided' };
    expect(wrapper.state('errors')).toEqual(errors);
    const emailField = wrapper.find('.email-field');
    emailField.simulate('change', mockEvent('email', 'email'));
    errors.email = 'email must be valid';
    form.simulate('submit', mockEvent());
    expect(wrapper.state('errors')).toEqual(errors);
  });

  test('should call logUserIn prop method', () => {
    const form = wrapper.find('form');
    const emailField = wrapper.find('.email-field');
    const passwordField = wrapper.find('.password-field');
    emailField.simulate('change', mockEvent('test@email.com', 'email'));
    passwordField.simulate('change', mockEvent('test-password', 'password'));
    form.simulate('submit', mockEvent());
    expect(props.logUserIn).toHaveBeenCalled();
  });

  test('should call registerUser prop method', () => {
    const register = wrapper.find('.register');
    const form = wrapper.find('form');
    const emailField = wrapper.find('.email-field');
    const passwordField = wrapper.find('.password-field');
    register.simulate('click');
    emailField.simulate('change', mockEvent('test@email.com', 'email'));
    passwordField.simulate('change', mockEvent('test-password', 'password'));
    form.simulate('submit', mockEvent());
    expect(props.registerUser).toHaveBeenCalled();
  });

  test('should set errorResponse state property', () => {
    const error = 'test error response';
    const logUserIn = jest.fn(() => {
      throw new Error(error);
    });
    const registerUser = jest.fn();
    wrapper = shallow(<LoginOrRegister logUserIn={logUserIn} registerUser={registerUser} />);
    const form = wrapper.find('form');
    const emailField = wrapper.find('.email-field');
    const passwordField = wrapper.find('.password-field');
    emailField.simulate('change', mockEvent('test@email.com', 'email'));
    passwordField.simulate('change', mockEvent('test-password', 'password'));
    form.simulate('submit', mockEvent());
    expect(wrapper.state('errorResponse')).toBe(error);
  });

  test('should return required state properties', () => {
    expect(mapStateToProps(mockState)).toEqual({});
  });

  test('should return required actions', () => {
    const dispatch = jest.fn();
    const actions = mapDispatchToProps(dispatch);
    actions.registerUser();
    actions.logUserIn();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
