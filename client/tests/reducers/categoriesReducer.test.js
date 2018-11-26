import categoriesReducer from '../../src/app/reducers/categoriesReducer';
import initialState from '../../src/app/reducers/initialState';
import {
  fetchCategoriesSuccess,
  toggleCategoryPrivacySuccess,
  deleteCategorySuccess,
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

  test('should remove category', () => {
    const id = categories[0]._id;
    expect(categoriesReducer(
      categories,
      { type: deleteCategorySuccess, id },
    )).toEqual(categories.filter(category => category._id !== id));
  });
});
