import { combineReducers } from 'redux';
import TodoReducer from './TodoReducers';

export default combineReducers({
  todo: TodoReducer,
});
