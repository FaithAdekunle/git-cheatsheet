import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import ajaxCallsInProgressReducer from './ajaxCallsInProgressReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  ajaxCallsInProgress: ajaxCallsInProgressReducer,
  expandSidebar: sidebarReducer,
  userToken: usersReducer,
});

export default rootReducer;
