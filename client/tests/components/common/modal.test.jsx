import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../../../src/app/components/common/modal';

describe('<ModalOverlay />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Modal children={{}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
