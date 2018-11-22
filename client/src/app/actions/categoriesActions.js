import { fetchCategoriesSuccess } from './actionTypes';
import AjaxHelpers from '../helpers/ajaxHelpers';
import AjaxCallsInProgressAction from './ajaxCallsInProgressAction';

class CategoriesActions {
  static fetchCategoriesSuccess(categories) {
    return {
      type: fetchCategoriesSuccess,
      categories,
    };
  }

  static fetchCategories() {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      const { categories } = await AjaxHelpers.fetchCategories();
      dispatch(CategoriesActions.fetchCategoriesSuccess(categories));
    };
  }
}

export default CategoriesActions;
