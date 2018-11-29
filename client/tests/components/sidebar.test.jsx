import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Sidebar, mapDispatchToProps, mapStateToProps } from '../../src/app/components/sidebar';
import mockState from '../mockState';

let wrapper;

const sidebarProps = {
  expand: false,
  user: { token: '', id: '' },
  expandSidebar: jest.fn(),
  logout: jest.fn(),
};

describe('<Sidebar />', () => {
  beforeEach(() => {
    sidebarProps.expandSidebar.mockClear();
    sidebarProps.logout.mockClear();
    wrapper = shallow(<Sidebar {...sidebarProps} />);
  });

  test('should not render with sidebar-expand class', () => {
    expect(wrapper.find('.sidebar-expand').length).toBe(0);
  });

  test('should render with sidebar-expand class', () => {
    const props = { ...sidebarProps, expand: true };
    wrapper = shallow(<Sidebar {...props} />);
    expect(wrapper.find('.sidebar-expand').length).toBe(1);
  });

  test('should match snapshot without user details', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should match snapshot with user details', () => {
    const props = { ...sidebarProps, user: { token: 'token', id: 'id' } };
    wrapper = shallow(<Sidebar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should call logout prop method', () => {
    const props = { ...sidebarProps, user: { token: 'token', id: 'id' } };
    wrapper = shallow(<Sidebar {...props} />);
    const logoutButton = wrapper.find('.logout');
    logoutButton.simulate('click');
    expect(sidebarProps.logout).toHaveBeenCalled();
  });

  test('should call expandSidebar prop method', () => {
    const expandSidebar = wrapper.find('.expand-sidebar');
    expandSidebar.simulate('click');
    expect(sidebarProps.expandSidebar).toHaveBeenCalledTimes(1);
  });

  test('should return required state properties', () => {
    const expectedReturn = { expand: mockState.expandSidebar, user: mockState.user };
    expect(mapStateToProps(mockState)).toEqual(expectedReturn);
  });

  test('should return required actions', () => {
    const dispatch = jest.fn();
    const actions = mapDispatchToProps(dispatch);
    actions.expandSidebar();
    actions.logout();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
