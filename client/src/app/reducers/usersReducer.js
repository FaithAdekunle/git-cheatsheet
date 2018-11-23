import { userToken } from './initialState';
import { authenticateSuccess } from '../actions/actionTypes';

const usersReducer = (state = userToken, action) => {
  if (action.type === authenticateSuccess) return action.token;
  return state;
};

export default usersReducer;
