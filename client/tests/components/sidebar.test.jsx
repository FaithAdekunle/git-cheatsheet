import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Sidebar, mapDispatchToProps, mapStateToProps } from '../../src/app/components/sidebar';
import mockState from '../mockState';

let wrapper;

const sidebarProps = {
  expand: false,
  userToken: '',
  expandSidebar: jest.fn(),
};

describe('<Sidebar />', () => {
  beforeEach(() => {
    sidebarProps.expandSidebar.mockClear();
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

  test('should match snapshot without userToken', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should match snapshot with userToken', () => {
    const props = { ...sidebarProps, userToken: 'token' };
    wrapper = shallow(<Sidebar {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should call expandSidebar prop method', () => {
    const expandSidebar = wrapper.find('.expand-sidebar');
    expandSidebar.simulate('click');
    expect(sidebarProps.expandSidebar).toHaveBeenCalledTimes(1);
  });

  test('should return required state properties', () => {
    const expectedReturn = { expand: mockState.expandSidebar, userToken: mockState.userToken };
    expect(mapStateToProps(mockState)).toEqual(expectedReturn);
  });

  test('should return required actions', () => {
    const dispatch = jest.fn();
    const actions = mapDispatchToProps(dispatch);
    actions.expandSidebar();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
