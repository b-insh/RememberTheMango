import { connect } from 'react-redux';
import { fetchTasks, newTask, removeTask, searchTasks } from '../../actions/task_actions';
import { selectAllTasks } from '../../reducers/selectors';
import Search from './search';

const mapStateToProps = state => {
  return {
    tasks: state.searchResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
    newTask: (task) => dispatch(newTask(task)),
    editTask: (task) => dispatch(editTask(task)),
    removeTask: (task) => dispatch(removeTask(task)),
    searchTasks: (query) => dispatch(searchTasks(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
