import { categories } from './initialState';
import { fetchCategoriesSuccess, toggleCategoryPrivacySuccess } from '../actions/actionTypes';

const categoriesReducer = (state = categories, action) => {
  switch (action.type) {
    case fetchCategoriesSuccess:
      return [...action.categories];
    case toggleCategoryPrivacySuccess:
      return state.map((category) => {
        if (category._id === action.id) {
          return { ...category, privacyStatus: !category.privacyStatus };
        }
        return category;
      });
    default:
      return state;
  }
};

export default categoriesReducer;
