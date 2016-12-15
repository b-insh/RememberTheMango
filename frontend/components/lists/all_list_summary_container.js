import { connect } from 'react-redux';
import AllListSummary from './all_list_summary';
import { selectAllTasks } from '../../reducers/selectors';
import { fetchTasks } from '../../actions/task_actions';

const mapStateToProps = state => {
  return {
    tasks: selectAllTasks(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllListSummary);
