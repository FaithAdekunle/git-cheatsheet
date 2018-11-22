import categoriesReducer from '../../src/app/reducers/categoriesReducer';
import initialState from '../../src/app/reducers/initialState';
import { fetchCategoriesSuccess } from '../../src/app/actions/actionTypes';
import categories from '../../../server/seeds/categories';

describe('categoriesReducer', () => {
  test('should return initial empty array value for categories', () => {
    expect(categoriesReducer(undefined, {})).toBe(initialState.categories);
  });

  test('should return loaded categories', () => {
    expect(categoriesReducer([], { type: fetchCategoriesSuccess, categories }))
      .toEqual(categories);
  });
});
