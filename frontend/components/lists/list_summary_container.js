import { connect } from 'react-redux';
import ListSummary from './list_summary';

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.lists.selectedList,
  };
};

export default connect(mapStateToProps)(ListSummary);
