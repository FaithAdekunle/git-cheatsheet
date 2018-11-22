import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loader from '../../../src/app/components/common/loader';

describe('<Loader />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Loader />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
