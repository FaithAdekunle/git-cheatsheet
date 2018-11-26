import {
  deleteCategorySuccess,
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
}

export default CategoriesActions;