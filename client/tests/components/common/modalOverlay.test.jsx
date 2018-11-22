import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ModalOverlay from '../../../src/app/components/common/modalOverlay';

describe('<ModalOverlay />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<ModalOverlay />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
