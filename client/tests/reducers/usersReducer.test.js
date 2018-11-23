import usersReducer from '../../src/app/reducers/usersReducer';
import initialState from '../../src/app/reducers/initialState';
import { authenticateSuccess } from '../../src/app/actions/actionTypes';

describe('userReducer', () => {
  test('should return initial token value', () => {
    expect(usersReducer(undefined, {})).toBe(initialState.userToken);
  });

  test('should return received token value', () => {
    const token = 'token';
    const action = { type: authenticateSuccess, token };
    expect(usersReducer('', action)).toBe(token);
  });
});
