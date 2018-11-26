import React from 'react';
import { mount } from 'enzyme';
import categories from '../../categories';
import { Categories, mapStateToProps, mapDispatchToProps } from '../../../src/app/components/categories/categories';
import mockState from '../../mockState';

const categoriesProps = {
  categories,
  fetchCategories: jest.fn(),
  user: { token: '', id: '' },
  togglePrivacyStatus: jest.fn(),
  deleteCategory: jest.fn(),
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
    categoriesProps.deleteCategory.mockClear();
    categoriesProps.togglePrivacyStatus.mockClear();
    dispatch.mockClear();
    wrapper = mount(<Categories {...categoriesProps} />);
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
    wrapper = mount(<Categories {...props} />);
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

  test('should add expand class to each rendered category', () => {
    let expandCategory;
    expandCategory = wrapper.find('.expand');
    expect(expandCategory.length).toBe(0);
    const expandOrCollapseButton = wrapper.find('.expand-or-collapse');
    expandOrCollapseButton.simulate('click');
    wrapper.update();
    expandCategory = wrapper.find('.expand');
    expect(expandCategory.length).toBe(categories.length);
  });

  test('should add expand class to clicked category', () => {
    let expandCategory;
    expandCategory = wrapper.find('.expand');
    expect(expandCategory.length).toBe(0);
    const categoryHeaders = wrapper.find('.category-header');
    categoryHeaders.first().simulate('click');
    wrapper.update();
    expandCategory = wrapper.find('.expand');
    expect(expandCategory.length).toBe(1);
  });

  test('display corresponding privacy status', () => {
    const props = {
      ...categoriesProps,
      user: { token: 'token', id: categories[0].userId },
      categories: [{ ...categories[0], privacyStatus: true }],
    };
    wrapper = mount(<Categories {...props} />);
    const toggleButton = wrapper.find('.privacy');
    expect(toggleButton.text()).toBe('set to public');
  });

  test('should call deleteCategory prop method', () => {
    const props = { ...categoriesProps, user: { token: 'token', id: categories[0].userId } };
    wrapper = mount(<Categories {...props} />);
    const toggleButton = wrapper.find('.privacy');
    expect(toggleButton.text()).toBe('set to private');
    toggleButton.simulate('click');
    expect(categoriesProps.togglePrivacyStatus).toHaveBeenCalledTimes(1);
  });

  test('should call deleteCategory prop method', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const deleteIcon = wrapper.find('.delete-category-icon');
    deleteIcon.simulate('click');
    wrapper.update();
    const deleteButton = wrapper.find('.delete-category-button');
    deleteButton.simulate('click');
    expect(categoriesProps.deleteCategory).toHaveBeenCalledWith(categories[0]._id, user.token);
  });

  test('should abort delete category action', () => {
    const props = { ...categoriesProps, user: { token: 'token', id: categories[0].userId } };
    wrapper = mount(<Categories {...props} />);
    const deleteIcon = wrapper.find('.delete-category-icon');
    deleteIcon.simulate('click');
    expect(wrapper.state('categoryToBeDeleted')).toEqual(categories[0]);
    wrapper.update();
    const abortButton = wrapper.find('.abort-delete-category-button');
    abortButton.simulate('click');
    expect(wrapper.state('categoryToBeDeleted')).toBe(null);
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
    actions.togglePrivacyStatus();
    actions.deleteCategory();
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
