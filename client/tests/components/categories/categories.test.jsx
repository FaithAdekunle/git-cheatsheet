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
  deleteCategory: jest.fn(() => new Promise(resolve => resolve())),
  createOrEditCategory: jest.fn(() => new Promise(resolve => resolve())),
  createCategoryCommands: jest.fn(() => new Promise(resolve => resolve())),
  editCategoryCommand: jest.fn(() => new Promise(resolve => resolve())),
  deleteCategoryCommand: jest.fn(() => new Promise(resolve => resolve())),
};

const mockEvent = (value, name, checked) => ({
  target: { value, name, checked },
  preventDefault: jest.fn(),
});

const dispatch = jest.fn();

let wrapper;

describe('<Categories />', () => {
  beforeEach(() => {
    categoriesProps.fetchCategories.mockClear();
    categoriesProps.deleteCategory.mockClear();
    categoriesProps.togglePrivacyStatus.mockClear();
    categoriesProps.createOrEditCategory.mockClear();
    categoriesProps.createCategoryCommands.mockClear();
    categoriesProps.editCategoryCommand.mockClear();
    categoriesProps.deleteCategoryCommand.mockClear();
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

  test('should call togglePrivacyStatus prop method', () => {
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

  test('should call createOrEditCategory prop method', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const editIcon = wrapper.find('.edit-category-icon');
    editIcon.simulate('click');
    wrapper.update();
    const editForm = wrapper.find('.add-or-edit-category-form');
    editForm.simulate('submit');
    expect(categoriesProps.createOrEditCategory).toHaveBeenCalledWith({
      _id: categories[0]._id,
      title: categories[0].title,
    }, user.token);
  });

  test('should maintain edit category form state', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    const testTitle = 'test title';
    wrapper = mount(<Categories {...props} />);
    let editIcon = wrapper.find('.edit-category-icon');
    editIcon.simulate('click');
    wrapper.update();
    let titleField = wrapper.find('.title-field');
    titleField.simulate('change', mockEvent(testTitle, 'title'));
    const abortButton = wrapper.find('.abort-add-or-edit-category-button');
    abortButton.simulate('click');
    editIcon = wrapper.find('.edit-category-icon');
    editIcon.simulate('click');
    wrapper.update();
    titleField = wrapper.find('.title-field');
    expect(titleField.props().value).toBe(testTitle);
  });

  test('should set error message for empty title field', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const editIcon = wrapper.find('.edit-category-icon');
    editIcon.simulate('click');
    wrapper.update();
    const titleField = wrapper.find('.title-field');
    titleField.simulate('change', mockEvent('', 'title'));
    wrapper.update();
    const errors = wrapper.find('.error');
    expect(errors.first().text()).toBe('title field cannot be empty');
  });

  test('should add and remove command input groups in add category modal', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchAddCategoryButton = wrapper.find('.launch-add-category-button');
    launchAddCategoryButton.simulate('click');
    wrapper.update();
    let commandInputGroups = wrapper.find('.command-input-group');
    let removeCategoryCommandIcon = wrapper.find('.remove-category-command-icon');
    expect(removeCategoryCommandIcon.length).toBe(0);
    expect(commandInputGroups.length).toBe(1);
    const addCategoryCommandIcon = wrapper.find('.add-category-command-icon');
    addCategoryCommandIcon.simulate('click');
    wrapper.update();
    commandInputGroups = wrapper.find('.command-input-group');
    removeCategoryCommandIcon = wrapper.find('.remove-category-command-icon');
    expect(removeCategoryCommandIcon.length).toBe(2);
    expect(commandInputGroups.length).toBe(2);
    removeCategoryCommandIcon.first().simulate('click');
    wrapper.update();
    commandInputGroups = wrapper.find('.command-input-group');
    removeCategoryCommandIcon = wrapper.find('.remove-category-command-icon');
    expect(removeCategoryCommandIcon.length).toBe(0);
    expect(commandInputGroups.length).toBe(1);
  });

  test('should prevent submission of category when required fields are empty', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchAddCategoryButton = wrapper.find('.launch-add-category-button');
    launchAddCategoryButton.simulate('click');
    wrapper.update();
    let editForm = wrapper.find('.add-or-edit-category-form');
    editForm.simulate('submit');
    wrapper.update();
    let errors = wrapper.find('.error');
    expect(errors.length).toBe(2);
    expect(errors.first().text()).toBe('title field cannot be empty');
    expect(errors.last().text()).toBe('script and description fields cannot be empty');
    const titleField = wrapper.find('.title-field');
    const scriptField = wrapper.find('input[name="script"]');
    titleField.simulate('change', mockEvent('test-title', 'title'));
    scriptField.simulate('change', mockEvent('git script test', 'script'));
    wrapper.update();
    editForm = wrapper.find('.add-or-edit-category-form');
    editForm.simulate('submit');
    wrapper.update();
    errors = wrapper.find('.error');
    expect(errors.last().text()).toBe('description field cannot be empty');
  });

  test('should call createOrEditCategory prop method', () => {
    const category = {
      title: 'test-title',
      privacyStatus: false,
      commands: [{
        script: 'git script test',
        description: 'test description',
        keywords: ['key', 'words'],
      }],
    };
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchAddCategoryButton = wrapper.find('.launch-add-category-button');
    launchAddCategoryButton.simulate('click');
    wrapper.update();
    const titleField = wrapper.find('.title-field');
    const scriptField = wrapper.find('input[name="script"]');
    const descriptionField = wrapper.find('input[name="description"]');
    const keywordsField = wrapper.find('input[name="keywords"]');
    titleField.simulate('change', mockEvent(category.title, 'title'));
    scriptField.simulate('change', mockEvent(category.commands[0].script, 'script'));
    descriptionField.simulate('change', mockEvent(category.commands[0].description, 'description'));
    keywordsField.simulate(
      'change',
      mockEvent(category.commands[0].keywords.join(','), 'keywords'),
    );
    const editForm = wrapper.find('.add-or-edit-category-form');
    editForm.simulate('submit');
    expect(categoriesProps.createOrEditCategory).toHaveBeenCalledWith(category, user.token);
  });

  test('should call createOrEditCategory prop method', () => {
    const category = {
      title: 'test-title',
      privacyStatus: true,
      commands: [{
        script: 'git script test',
        description: 'test description',
        keywords: [],
      }],
    };
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchAddCategoryButton = wrapper.find('.launch-add-category-button');
    launchAddCategoryButton.simulate('click');
    wrapper.update();
    const titleField = wrapper.find('.title-field');
    const scriptField = wrapper.find('input[name="script"]');
    const descriptionField = wrapper.find('input[name="description"]');
    const privacyCheckbox = wrapper.find('input[name="privacyStatus"]');
    titleField.simulate('change', mockEvent(category.title, 'title'));
    scriptField.simulate('change', mockEvent(category.commands[0].script, 'script'));
    descriptionField.simulate('change', mockEvent(category.commands[0].description, 'description'));
    privacyCheckbox.simulate('change', mockEvent(undefined, 'privacyStatus', false));
    const editForm = wrapper.find('.add-or-edit-category-form');
    editForm.simulate('submit');
    expect(categoriesProps.createOrEditCategory).toHaveBeenCalledWith(category, user.token);
  });

  test('should call editCategoryCommand prop method', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchEditCommandButton = wrapper.find('.edit-command-icon');
    launchEditCommandButton.first().simulate('click');
    wrapper.update();
    const editCommandForm = wrapper.find('.create-or-edit-command-form');
    editCommandForm.simulate('submit');
    expect(categoriesProps.editCategoryCommand).toHaveBeenCalled();
  });

  test('should maintain edit command form state', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    let launchEditCommandButton = wrapper.find('.edit-command-icon');
    launchEditCommandButton.first().simulate('click');
    wrapper.update();
    let scriptField = wrapper.find('input[name="script"]');
    scriptField.simulate('change', mockEvent('script changed', 'script'));
    wrapper.update();
    const abortEditCommandButton = wrapper.find('.abort-create-or-edit-command-button');
    abortEditCommandButton.simulate('click');
    wrapper.update();
    launchEditCommandButton = wrapper.find('.edit-command-icon');
    launchEditCommandButton.first().simulate('click');
    wrapper.update();
    scriptField = wrapper.find('input[name="script"]');
    expect(scriptField.props().value).toBe('script changed');
  });

  test('should add and remove command input groups in add command modal', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchAddCommandsButton = wrapper.find('.add-commands-icon');
    launchAddCommandsButton.first().simulate('click');
    wrapper.update();
    let commandInputGroups = wrapper.find('.command-input-group');
    expect(commandInputGroups.length).toBe(1);
    const addCommandIcon = wrapper.find('.add-command-icon');
    addCommandIcon.simulate('click');
    wrapper.update();
    commandInputGroups = wrapper.find('.command-input-group');
    expect(commandInputGroups.length).toBe(2);
    const removeCommandIcons = wrapper.find('.remove-command-icon');
    removeCommandIcons.first().simulate('click');
    wrapper.update();
    commandInputGroups = wrapper.find('.command-input-group');
    expect(commandInputGroups.length).toBe(1);
  });

  test('should display specific error messages', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchAddCommandsButton = wrapper.find('.add-commands-icon');
    launchAddCommandsButton.first().simulate('click');
    wrapper.update();
    const editCommandForm = wrapper.find('.create-or-edit-command-form');
    editCommandForm.simulate('submit');
    wrapper.update();
    let error = wrapper.find('.error');
    expect(error.text()).toBe('script and description fields cannot be empty');
    const scriptField = wrapper.find('input[name="script"]');
    scriptField.simulate('change', mockEvent('script changed', 'script'));
    wrapper.update();
    error = wrapper.find('.error');
    expect(error.text()).toBe('description field cannot be empty');
  });

  test('should call createCategoryCommands prop method', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchAddCommandsButton = wrapper.find('.add-commands-icon');
    launchAddCommandsButton.first().simulate('click');
    wrapper.update();
    const scriptField = wrapper.find('input[name="script"]');
    const descriptionField = wrapper.find('input[name="description"]');
    const keywordsField = wrapper.find('input[name="keywords"]');
    scriptField.simulate('change', mockEvent('script changed', 'script'));
    descriptionField.simulate('change', mockEvent('description changed', 'description'));
    keywordsField.simulate('change', mockEvent('key,words', 'keywords'));
    wrapper.update();
    const editCommandForm = wrapper.find('.create-or-edit-command-form');
    editCommandForm.simulate('submit');
    expect(categoriesProps.createCategoryCommands).toHaveBeenCalled();
  });

  test('should call deleteCategoryCommand prop method', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchDeleteCommandIcon = wrapper.find('.delete-command-icon');
    launchDeleteCommandIcon.first().simulate('click');
    wrapper.update();
    const deleteCommandButton = wrapper.find('.delete-command-button');
    deleteCommandButton.simulate('click');
    expect(categoriesProps.deleteCategoryCommand).toHaveBeenCalled();
  });

  test('should call abort delete command action', () => {
    const user = { token: 'token', id: categories[0].userId };
    const props = { ...categoriesProps, user };
    wrapper = mount(<Categories {...props} />);
    const launchDeleteCommandIcon = wrapper.find('.delete-command-icon');
    launchDeleteCommandIcon.first().simulate('click');
    wrapper.update();
    expect(wrapper.state('commandToBeDeleted')).toEqual(categories[0].commands[0]);
    const abortDeleteCommandButton = wrapper.find('.abort-delete-command-button');
    abortDeleteCommandButton.simulate('click');
    wrapper.update();
    expect(wrapper.state('commandToBeDeleted')).toBe(null);
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
    actions.createOrEditCategory();
    actions.editCategoryCommand();
    actions.createCategoryCommands();
    actions.deleteCategoryCommand();
    expect(dispatch).toHaveBeenCalledTimes(7);
  });
});
