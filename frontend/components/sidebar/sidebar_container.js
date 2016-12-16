import { connect } from 'react-redux';
import { fetchLists, newList, removeList, fetchList } from '../../actions/list_actions';
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
