import React from 'react';
import { shallow } from 'enzyme';
import categories from '../../categories';
import { Category, mapDispatchToProps, mapStateToProps } from '../../../src/app/components/categories/category';
import mockState from '../../mockState';

const category = categories[0];

const categoryProps = {
  category,
  expandAll: false,
  keyword: '',
  user: { token: '', id: '' },
  togglePrivacyStatus: jest.fn(),
};
let wrapper;

describe('<Category />', () => {
  beforeEach(() => {
    categoryProps.togglePrivacyStatus.mockClear();
    wrapper = shallow(<Category {...categoryProps} />);
  });

  test('should render category commands', () => {
    expect(wrapper.find('.command-list-item').length).toBe(category.commands.length);
  });

  test('should render action icons', () => {
    const props = { ...categoryProps, user: { token: 'token', id: category.userId } };
    wrapper = shallow(<Category {...props} />);
    expect(wrapper.find('.category-actions').length).toBe(1);
  });

  test('should render privacy status of private', () => {
    const props = {
      ...categoryProps,
      user: { token: 'token', id: category.userId },
      category: { ...categoryProps.category, privacyStatus: true },
    };
    wrapper = shallow(<Category {...props} />);
    expect(wrapper.find('.privacy').text()).toBe('set to public');
  });

  test('should call togglePrivacyStatus prop method', () => {
    const props = {
      ...categoryProps,
      user: { token: 'token', id: category.userId },
      category: { ...categoryProps.category, privacyStatus: true },
    };
    wrapper = shallow(<Category {...props} />);
    const privacy = wrapper.find('.privacy');
    privacy.simulate('click');
    expect(categoryProps.togglePrivacyStatus).toHaveBeenCalled();
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

  test('should return prop actions', () => {
    const dispatch = jest.fn();
    const actions = mapDispatchToProps(dispatch);
    actions.togglePrivacyStatus();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('should return state props', () => {
    expect(mapStateToProps(mockState)).toEqual({});
  });
});
