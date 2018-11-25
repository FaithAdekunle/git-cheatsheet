import { user } from './initialState';
import { authenticateSuccess } from '../actions/actionTypes';

const usersReducer = (state = user, action) => {
  if (action.type === authenticateSuccess) return action.user;
  return state;
};

export default usersReducer;
