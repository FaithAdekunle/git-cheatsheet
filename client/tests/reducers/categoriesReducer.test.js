import categoriesReducer from '../../src/app/reducers/categoriesReducer';
import initialState from '../../src/app/reducers/initialState';
import {
  fetchCategoriesSuccess,
  toggleCategoryPrivacySuccess,
  deleteCategorySuccess,
  createCategorySuccess,
  editCategorySuccess,
  editCategoryCommandSuccess,
  createCategoryCommandsSuccess,
} from '../../src/app/actions/actionTypes';
import categories from '../categories';

describe('categoriesReducer', () => {
  test('should return initial empty array value for categories', () => {
    expect(categoriesReducer(undefined, {})).toBe(initialState.categories);
  });

  test('should return loaded categories', () => {
    expect(categoriesReducer([], { type: fetchCategoriesSuccess, categories }))
      .toEqual(categories);
  });

  test('should toggle category privacy status', () => {
    const id = categories[0]._id;
    expect(categoriesReducer(
      categories,
      { type: toggleCategoryPrivacySuccess, id },
    )).toEqual(categories.map((category) => {
      if (category._id === id) return { ...category, privacyStatus: !category.privacyStatus };
      return category;
    }));
  });

  test('should add new category', () => {
    const category = { _id: 'newly created category' };
    expect(categoriesReducer(
      categories,
      { type: createCategorySuccess, category },
    )).toEqual([...categories, category]);
  });

  test('should remove category', () => {
    const id = categories[0]._id;
    expect(categoriesReducer(
      [...categories],
      { type: deleteCategorySuccess, id },
    )).toEqual(categories.filter(category => category._id !== id));
  });

  test('should edit existing category', () => {
    const edit = {
      _id: categories[0]._id,
      title: 'edited title',
      privacyStatus: true,
      userId: categories[0].userId,
    };
    expect(categoriesReducer(
      [...categories],
      { type: editCategorySuccess, category: edit },
    )).toEqual(categories.map((category) => {
      if (category._id === edit._id) {
        return { ...edit, commands: category.commands };
      }
      return category;
    }));
  });

  test('should edit existing command', () => {
    const edit = {
      _id: categories[0].commands[0]._id,
      script: 'edited script',
      userId: categories[0].userId,
      categoryId: categories[0]._id,
    };
    const expectedResult = categories.map((category) => {
      if (category._id === edit.categoryId) {
        return {
          ...category,
          commands: category.commands.map((command) => {
            if (command._id === edit._id) return edit;
            return command;
          }),
        };
      }
      return category;
    });
    expect(categoriesReducer(
      [...categories],
      { type: editCategoryCommandSuccess, command: edit },
    )).toEqual(expectedResult);
  });

  test('should add existing command', () => {
    const edit = [{
      script: 'edited script',
      userId: categories[0].userId,
      categoryId: categories[0]._id,
    }];
    const expectedResult = categories.map((category) => {
      if (category._id === edit[0].categoryId) {
        return {
          ...category,
          commands: [...category.commands, ...edit],
        };
      }
      return category;
    });
    expect(categoriesReducer(
      [...categories],
      { type: createCategoryCommandsSuccess, commands: edit },
    )).toEqual(expectedResult);
  });
});
