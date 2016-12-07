import { connect } from 'react-redux';
import { fetchTasks, newTask, editTask, removeTask } from '../../actions/task_actions';
import TaskIndex from './task_index';

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
    newTask: (task) => dispatch(newTask(task)),
    editTask: (task) => dispatch(editTask(task)),
    removeTask: (task) => dispatch(removeTask(task))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);
