import { ajaxCallsInProgress } from './initialState';
import { beginAjaxCall } from '../actions/actionTypes';

const ajaxCallsInProgressReducer = (state = ajaxCallsInProgress, action) => {
  const { type } = action;
  if (type === beginAjaxCall) return state + 1;
  if (type.endsWith('SUCCESS')) {
    return state ? state - 1 : state;
  }
  return state;
};

export default ajaxCallsInProgressReducer;
