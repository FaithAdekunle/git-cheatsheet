import { sidebar } from './initialState';
import { expandSidebar } from '../actions/actionTypes';

const sidebarReducer = (state = sidebar, action) => {
  if (action.type === expandSidebar) return action.expand;
  return state;
};

export default sidebarReducer;
