import React from 'react';
import { shallow } from 'enzyme';
import categories from '../../categories';
import { Category } from '../../../src/app/components/categories/category';

const category = categories[0];

const categoryProps = {
  category,
  expandAll: false,
  keyword: '',
};
let wrapper;

describe('<Category />', () => {
  beforeEach(() => {
    wrapper = shallow(<Category {...categoryProps} />);
  });

  test('should render category commands', () => {
    expect(wrapper.find('.command-list-item').length).toBe(category.commands.length);
  });

  test('commands unordered list should not have expand class', () => {
    expect(wrapper.find('.expand').length).toBe(0);
  });

  test('commands unordered list should have expand class', () => {
    const props = { ...categoryProps, expandAll: true };
    wrapper = shallow(<Category {...props} />);
    expect(wrapper.find('.expand').length).toBe(1);
  });

  test('should render only category commands that match keyword', () => {
    const props = { ...categoryProps, keyword: 'debian' };
    wrapper = shallow(<Category {...props} />);
    expect(wrapper.find('.command-list-item').length).toBe(1);
  });

  test('should add expand class to commands unordered list', () => {
    let commandsUnorderedList;
    commandsUnorderedList = wrapper.find('.expand');
    expect(commandsUnorderedList.length).toBe(0);
    wrapper.find('.category-header').simulate('click');
    wrapper.update();
    commandsUnorderedList = wrapper.find('.expand');
    expect(commandsUnorderedList.length).toBe(1);
  });

  test('should update expand state properties', () => {
    expect(wrapper.state('expand')).toBe(false);
    wrapper.setProps({ expandAll: true });
    wrapper.update();
    expect(wrapper.state('expand')).toBe(true);
  });
});
