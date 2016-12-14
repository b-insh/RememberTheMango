import { connect } from 'react-redux';
import ListItem from './list_item';
import { fetchTasks, newTask, removeTask, createTaskForList, removeTaskFromList } from '../../actions/task_actions';
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
    fetchTasks: () => dispatch(fetchTasks()),
    newTask: (task) => dispatch(newTask(task)),
    editTask: (task) => dispatch(editTask(task)),
    removeTask: (task) => dispatch(removeTask(task)),
    createTaskForList: (task, listId) => dispatch(createTaskForList(task, listId)),
    removeTaskFromList: (taskId, listId) => dispatch(removeTaskFromList(taskId, listId)),
    // fetchListTasks: (listId) => dispatch(fetchListTasks(listId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
