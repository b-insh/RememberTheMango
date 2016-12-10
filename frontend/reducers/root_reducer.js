import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import taskReducer from './task_reducer';
import taskDetailReducer from './task_detail_reducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
  session: sessionReducer,
  taskDetail: taskDetailReducer
});

export default rootReducer;
