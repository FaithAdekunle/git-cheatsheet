import { combineReducers } from 'redux';
import categoriesReducer from './categoriesReducer';
import ajaxCallsInProgressReducer from './ajaxCallsInProgressReducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  ajaxCallsInProgress: ajaxCallsInProgressReducer,
});

export default rootReducer;
