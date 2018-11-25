import React from 'react';
import { shallow } from 'enzyme';
import categories from '../../categories';
import { Categories, mapStateToProps, mapDispatchToProps } from '../../../src/app/components/categories/categories';
import mockState from '../../mockState';

const categoriesProps = {
  categories,
  fetchCategories: jest.fn(),
  user: { token: '', id: '' },
};

const mockEvent = value => ({
  target: { value },
  preventDefault: jest.fn(),
});

const dispatch = jest.fn();

let wrapper;

describe('<Categories />', () => {
  beforeEach(() => {
    categoriesProps.fetchCategories.mockClear();
    dispatch.mockClear();
    wrapper = shallow(<Categories {...categoriesProps} />);
  });

  test('should call fetchCategories prop method when component mounts', () => {
    expect(categoriesProps.fetchCategories).toHaveBeenCalledTimes(1);
  });

  test('should render search field container, expand/collapse buttons and container for all categories', () => {
    const searchFieldContainer = wrapper.find('.command-keywords-search-container');
    const expandOrCollapseButton = wrapper.find('.expand-or-collapse');
    const categoryComponent = wrapper.find('.category-component');
    expect(searchFieldContainer.length).toBe(1);
    expect(expandOrCollapseButton.length).toBe(1);
    expect(categoryComponent.length).toBe(categories.length);
  });

  test('should not render search field, expand/collapse buttons and container for all categories', () => {
    const props = { ...categoriesProps, categories: [] };
    wrapper = shallow(<Categories {...props} />);
    const searchFieldContainer = wrapper.find('.command-keywords-search-container');
    const expandOrCollapseButton = wrapper.find('.expand-or-collapse');
    const categoryComponent = wrapper.find('.category-component');
    expect(searchFieldContainer.length).toBe(0);
    expect(expandOrCollapseButton.length).toBe(0);
    expect(categoryComponent.length).toBe(0);
  });

  test('should change button text from Expand All to Collapse All', () => {
    let expandOrCollapseButton;
    expandOrCollapseButton = wrapper.find('.expand-or-collapse');
    expect(expandOrCollapseButton.text()).toBe('Expand All');
    expandOrCollapseButton.simulate('click');
    wrapper.update();
    expandOrCollapseButton = wrapper.find('.expand-or-collapse');
    expect(expandOrCollapseButton.text()).toBe('Collapse All');
  });

  test('should filter categories based on search keywords', () => {
    let categoryComponent;
    categoryComponent = wrapper.find('.category-component');
    expect(categoryComponent.length).toBe(categories.length);
    const searchField = wrapper.find('.command-keyword-search-field');
    searchField.simulate('change', mockEvent('debian'));
    wrapper.update();
    categoryComponent = wrapper.find('.category-component');
    expect(categoryComponent.length).toBe(1);
  });

  test('should not filter categories based on search keywords', () => {
    let categoryComponent;
    categoryComponent = wrapper.find('.category-component');
    expect(categoryComponent.length).toBe(categories.length);
    const searchField = wrapper.find('.command-keyword-search-field');
    searchField.simulate('change', mockEvent('   '));
    wrapper.update();
    categoryComponent = wrapper.find('.category-component');
    expect(categoryComponent.length).toBe(categories.length);
  });

  test('should return required state properties', () => {
    const expectedReturn = { categories: mockState.categories, user: mockState.user };
    expect(mapStateToProps(mockState)).toEqual(expectedReturn);
  });

  test('should return required actions', () => {
    const actions = mapDispatchToProps(dispatch);
    actions.fetchCategories();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
