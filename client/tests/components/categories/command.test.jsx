import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Command from '../../../src/app/components/categories/command';
import categories from '../../categories';

const commandProps = {
  command: categories[0].commands[0],
};

describe('<Command />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Command {...commandProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
