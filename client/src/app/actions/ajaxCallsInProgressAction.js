import { beginAjaxCall } from './actionTypes';

class AjaxCallsInProgressAction {
  static beginAjaxCalls() {
    return { type: beginAjaxCall };
  }
}

export default AjaxCallsInProgressAction;
