import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { App, mapStateToProps } from '../../src/app/components/App';
import mockState from '../mockState';

describe('<App />', () => {
  test('should match snapshot when there are no ajaxCallsInProgress', () => {
    const wrapper = shallow(<App ajaxCallsInProgress={0} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should match snapshot when there are ajaxCallsInProgress', () => {
    const wrapper = shallow(<App ajaxCallsInProgress={1} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('should return required state properties', () => {
    expect(mapStateToProps(mockState))
      .toEqual({ ajaxCallsInProgress: mockState.ajaxCallsInProgress });
  });
});
