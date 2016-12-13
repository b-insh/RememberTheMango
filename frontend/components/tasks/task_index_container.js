import { connect } from 'react-redux';
import { fetchTasks, newTask, removeTask, createTaskForList } from '../../actions/task_actions';
import { fetchList } from '../../actions/list_actions';
import { selectAllTasks } from '../../reducers/selectors';
import TaskIndex from './task_index';

const mapStateToProps = state => {
  return {
    tasks: selectAllTasks(state),
    list: state.lists.selectedList
  };
};

  const mapDispatchToProps = (dispatch, ownProps) => {
  const type = ownProps.location.pathname.includes('lists');
  return {
    pageType: type,
    createTaskForList: (task, listId) => dispatch(createTaskForList(task, listId)),
    fetchTasks: () => dispatch(fetchTasks()),
    newTask: (task) => dispatch(newTask(task)),
    editTask: (task) => dispatch(editTask(task)),
    removeTask: (task) => dispatch(removeTask(task)),
    fetchList: (id) => dispatch(fetchList(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskIndex);
