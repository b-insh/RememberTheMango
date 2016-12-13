import { connect } from 'react-redux';
import { editTask, fetchTaskDetail } from '../../actions/task_actions';
import TaskDetail from './task_detail';

const mapStateToProps = state => {
  return {
    task: state.taskDetail,
    lists: Object.keys(state.lists.lists).map(listId => ({ id: listId, title: state.lists.lists[listId].title }))
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTaskDetail: (id) => (dispatch(fetchTaskDetail(id))),
    editTask: (task) => (dispatch(editTask(task))),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
