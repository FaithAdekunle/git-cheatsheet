import initialState from '../../src/app/reducers/initialState';
import sidebarReducer from '../../src/app/reducers/sidebarReducer';
import { expandSidebar } from '../../src/app/actions/actionTypes';

describe('sidebarReducer', () => {
  test('should return initial value for sidebar expansion', () => {
    expect(sidebarReducer(undefined, { type: '' }))
      .toBe(initialState.sidebar);
  });

  test('should return new value for sidebar expansion', () => {
    expect(sidebarReducer(false, { type: expandSidebar, expand: true })).toBe(true);
  });
});
