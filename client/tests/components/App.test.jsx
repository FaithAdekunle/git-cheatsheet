import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { App, mapStateToProps, mapDispatchToProps } from '../../src/app/components/App';
import mockState from '../mockState';

const collapseSidebar = jest.fn();

describe('<App />', () => {
  beforeEach(() => {
    collapseSidebar.mockClear();
  });

  test('should match snapshot when there are no ajaxCallsInProgress', () => {
    const wrapper = shallow(<App ajaxCallsInProgress={0} collapseSidebar={collapseSidebar} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should match snapshot when there are ajaxCallsInProgress', () => {
    const wrapper = shallow(<App ajaxCallsInProgress={1} collapseSidebar={collapseSidebar} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should call collapseSidebar action', () => {
    const wrapper = shallow(<App ajaxCallsInProgress={0} collapseSidebar={collapseSidebar} />);
    wrapper.find('.main').simulate('click');
    expect(collapseSidebar).toHaveBeenCalledTimes(1);
  });

  test('should return required state properties', () => {
    expect(mapStateToProps(mockState))
      .toEqual({ ajaxCallsInProgress: mockState.ajaxCallsInProgress });
  });

  test('should return required actions', () => {
    const dispatch = jest.fn();
    const actions = mapDispatchToProps(dispatch);
    actions.collapseSidebar();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
