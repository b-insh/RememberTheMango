import { connect } from 'react-redux';
import { fetchTasks, newTask, editTask, removeTask } from '../../actions/task_actions';
import Sidebar from './sidebar';

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
