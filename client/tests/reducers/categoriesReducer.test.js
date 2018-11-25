import categoriesReducer from '../../src/app/reducers/categoriesReducer';
import initialState from '../../src/app/reducers/initialState';
import { fetchCategoriesSuccess, toggleCategoryPrivacySuccess } from '../../src/app/actions/actionTypes';
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
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', id);
    expect(categoriesReducer(
      categories,
      { type: toggleCategoryPrivacySuccess, id },
    )).toEqual(categories.map((category) => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', category._id);
      if (category._id === id) return { ...category, privacyStatus: !category.privacyStatus };
      return category;
    }));
  });
});
