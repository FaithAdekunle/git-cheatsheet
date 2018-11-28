import { categories } from './initialState';
import {
  createCategorySuccess,
  deleteCategorySuccess,
  editCategorySuccess,
  fetchCategoriesSuccess,
  toggleCategoryPrivacySuccess,
} from '../actions/actionTypes';

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
    case deleteCategorySuccess:
      return state.filter(category => category._id !== action.id);
    case createCategorySuccess:
      return [...state, action.category];
    case editCategorySuccess:
      return state.map((category) => {
        if (category._id === action.category._id) {
          return { ...category, ...action.category };
        }
        return category;
      });
    default:
      return state;
  }
};

export default categoriesReducer;
