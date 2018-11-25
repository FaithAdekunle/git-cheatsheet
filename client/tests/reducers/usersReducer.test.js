import usersReducer from '../../src/app/reducers/usersReducer';
import initialState from '../../src/app/reducers/initialState';
import { authenticateSuccess } from '../../src/app/actions/actionTypes';

describe('userReducer', () => {
  test('should return initial token value', () => {
    expect(usersReducer(undefined, {})).toEqual(initialState.user);
  });

  test('should return received token value', () => {
    const user = { token: 'token', id: 'id' };
    const action = { type: authenticateSuccess, user };
    expect(usersReducer('', action)).toEqual(user);
  });
});
