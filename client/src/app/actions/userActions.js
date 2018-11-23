import { authenticateSuccess, mockSuccess } from './actionTypes';
import AjaxCallsInProgressAction from './ajaxCallsInProgressAction';
import AjaxHelpers from '../helpers/ajaxHelpers';

class UserActions {
  static authenticateSuccess(token) {
    return { type: authenticateSuccess, token };
  }

  static login(credentials) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      const login = await AjaxHelpers.login(credentials);
      if (login.success) return dispatch(UserActions.authenticateSuccess(login.token));
      dispatch({ type: mockSuccess });
      throw new Error(login.error);
    };
  }

  static register(credentials) {
    return async (dispatch) => {
      dispatch(AjaxCallsInProgressAction.beginAjaxCalls());
      const user = await AjaxHelpers.register(credentials);
      if (user.success) return dispatch(UserActions.authenticateSuccess(user.token));
      dispatch({ type: mockSuccess });
      throw new Error(user.error);
    };
  }
}

export default UserActions;
