import { categories } from './initialState';
import {
  createCategoryCommandsSuccess,
  createCategorySuccess, deleteCategoryCommandSuccess,
  deleteCategorySuccess,
  editCategoryCommandSuccess,
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
          return { ...action.category, commands: category.commands };
        }
        return category;
      });
    case editCategoryCommandSuccess:
      return state.map((category) => {
        if (category._id === action.command.categoryId) {
          return {
            ...category,
            commands: category.commands.map((command) => {
              if (command._id === action.command._id) return action.command;
              return command;
            }),
          };
        }
        return category;
      });
    case createCategoryCommandsSuccess:
      return state.map((category) => {
        if (category._id === action.commands[0].categoryId) {
          return {
            ...category,
            commands: [...category.commands, ...action.commands],
          };
        }
        return category;
      });
    case deleteCategoryCommandSuccess:
      return state.map((category) => {
        if (category._id === action.categoryId) {
          return {
            ...category,
            commands: category.commands.filter(command => command._id !== action.commandId),
          };
        }
        return category;
      });
    default:
      return state;
  }
};

export default categoriesReducer;
