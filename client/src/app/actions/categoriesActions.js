import {
  createCategoryCommandsSuccess,
  createCategorySuccess,
  deleteCategorySuccess,
  editCategoryCommandSuccess,
  editCategorySuccess,
  fetchCategoriesSuccess,
  toggleCategoryPrivacySuccess,
} from './actionTypes';
import AjaxHelpers from '../helpers/ajaxHelpers';
import AjaxCallsInProgressAction from './ajaxCallsInProgressAction';

class CategoriesActions {
  static fetchCategoriesSuccess(categories) {
    return {
      type: fetchCategoriesSuccess,
      categories,
    };
  }

  static toggleCategoryPrivacySuccess(id) {
    return { type: toggleCategoryPrivacySuccess, id };
  }

  static deleteCategorySuccess(id) {
    return { type: deleteCategorySuccess, id };
  }

  static createCategorySuccess(category) {
    return { type: createCategorySuccess, category };
  }

  static editCategorySuccess(category) {
    return { type: editCategorySuccess, category };
  }

  static editCategoryCommandSuccess(command) {
    return { type: editCategoryCommandSuccess, command };
  }

  static createCategoryCommandsSuccess(commands) {
    return { type: createCategoryCommandsSuccess, commands };
  }

  static fetchCategories(token = '') {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      const { categories } = await AjaxHelpers.fetchCategories(token);
      dispatch(CategoriesActions.fetchCategoriesSuccess(categories));
    };
  }

  static toggleCategoryPrivacy(id, token) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      await AjaxHelpers.toggleCategoryPrivacy(id, token);
      dispatch(CategoriesActions.toggleCategoryPrivacySuccess(id));
    };
  }

  static deleteCategory(id, token) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      await AjaxHelpers.deleteCategory(id, token);
      dispatch(CategoriesActions.deleteCategorySuccess(id));
    };
  }

  static createOrEditCategory(category, token) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      if (category._id) {
        const data = await AjaxHelpers.editCategory(category, token);
        dispatch(CategoriesActions.editCategorySuccess(data.category));
      } else {
        const data = await AjaxHelpers.createCategory(category, token);
        dispatch(CategoriesActions.createCategorySuccess(data.category));
      }
    };
  }

  static editCategoryCommand(command, token) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      const data = await AjaxHelpers.editCommand(command, token);
      dispatch(CategoriesActions.editCategoryCommandSuccess(data.command));
    };
  }

  static createCategoryCommands(commands, categoryId, token) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      const data = await AjaxHelpers.createCommands(commands, categoryId, token);
      dispatch(CategoriesActions.createCategoryCommandsSuccess(data.commands));
    };
  }
}

export default CategoriesActions;
