import { connect } from 'react-redux';
import { fetchLists, newList, removeList, fetchList } from '../../actions/list_actions';
import { removeTask } from '../../actions/task_actions';
import { selectAllLists } from '../../reducers/selectors';
import Sidebar from './sidebar';

const mapStateToProps = state => {
  return {
    lists: selectAllLists(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLists: () => dispatch(fetchLists()),
    fetchList: (list) => dispatch(fetchList(list)),
    newList: (list) => dispatch(newList(list)),
    removeList: (list) => dispatch(removeList(list)),
    removeTask: (task) => dispatch(removeTask(task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
