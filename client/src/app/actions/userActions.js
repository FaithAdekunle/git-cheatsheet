import { authenticateSuccess, mockSuccess } from './actionTypes';
import AjaxCallsInProgressAction from './ajaxCallsInProgressAction';
import AjaxHelpers from '../helpers/ajaxHelpers';
import CategoriesActions from './categoriesActions';
import expandOrCollapseSidebar from './sidebarAction';

class UserActions {
  static authenticateSuccess(user) {
    return { type: authenticateSuccess, user };
  }

  static login(credentials) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      const user = await AjaxHelpers.login(credentials);
      if (user.success) {
        dispatch(CategoriesActions.fetchCategories(user.token));
        dispatch(UserActions.authenticateSuccess({ token: user.token, id: user.id }));
        return dispatch(expandOrCollapseSidebar(false));
      }
      dispatch({ type: mockSuccess });
      throw new Error(user.error);
    };
  }

  static register(credentials) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      const user = await AjaxHelpers.register(credentials);
      if (user.success) {
        dispatch(CategoriesActions.fetchCategories(user.token));
        await dispatch(UserActions.authenticateSuccess({ token: user.token, id: user.id }));
        return dispatch(expandOrCollapseSidebar(false));
      }
      dispatch({ type: mockSuccess });
      throw new Error(user.error);
    };
  }

  static logout() {
    return async (dispatch) => {
      await dispatch(CategoriesActions.fetchCategories());
      dispatch(UserActions.authenticateSuccess({ token: '', id: '' }));
    };
  }
}

export default UserActions;
