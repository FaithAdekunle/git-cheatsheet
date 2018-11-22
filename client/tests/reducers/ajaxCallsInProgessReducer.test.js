import ajaxCallsInProgressReducer from '../../src/app/reducers/ajaxCallsInProgressReducer';
import initialState from '../../src/app/reducers/initialState';
import { beginAjaxCall } from '../../src/app/actions/actionTypes';

describe('ajaxCallsInProgressReducer', () => {
  test('should return initial value for number of ajax calls in progress', () => {
    expect(ajaxCallsInProgressReducer(undefined, { type: '' }))
      .toBe(initialState.ajaxCallsInProgress);
  });

  test('should increment number of ajax calls in progress', () => {
    expect(ajaxCallsInProgressReducer(1, { type: beginAjaxCall }))
      .toBe(2);
  });

  test('should decrement number of ajax calls in progress', () => {
    expect(ajaxCallsInProgressReducer(2, { type: 'SUCCESS' }))
      .toBe(1);
  });

  test('should not decrement number of ajax calls in progress', () => {
    expect(ajaxCallsInProgressReducer(0, { type: 'SUCCESS' }))
      .toBe(0);
  });
});
