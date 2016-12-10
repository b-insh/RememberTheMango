import { connect } from 'react-redux';
import { editTask, fetchTaskDetail } from '../../actions/task_actions';
import TaskDetail from './task_detail';

const mapStateToProps = state => {
  debugger
  return {
    task: state.taskDetail.taskDetail,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  debugger
  return {
    fetchTaskDetail: () => (
      dispatch(fetchTaskDetail(ownProps.params.id))
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
