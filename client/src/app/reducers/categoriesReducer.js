import { categories } from './initialState';
import { fetchCategoriesSuccess } from '../actions/actionTypes';

const categoriesReducer = (state = categories, action) => {
  switch (action.type) {
    case fetchCategoriesSuccess:
      return [...action.categories];
    default:
      return state;
  }
};

export default categoriesReducer;
