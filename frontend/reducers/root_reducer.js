import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import taskReducer from './task_reducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  session: sessionReducer,
});

export default rootReducer;
