import { connect } from 'react-redux';
import { fetchLists, newList, deleteList, fetchList } from '../../actions/list_actions';
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
    deleteList: (list) => dispatch(deleteList(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
