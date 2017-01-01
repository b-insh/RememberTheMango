import { connect } from 'react-redux';
import ListItem from './list_item';
import { newTask, removeTask, editTask } from '../../actions/task_actions';
import { fetchList } from '../../actions/list_actions';
import { selectAllTasks } from '../../reducers/selectors';

const mapStateToProps = state => {
  return {
    list: state.lists.selectedList,
    tasks: selectAllTasks(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchList: (id) => dispatch(fetchList(id)),
    removeTask: (task) => dispatch(removeTask(task)),
    newTask: (task) => dispatch(newTask(task)),
    editTask: (task) => dispatch(editTask(task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
