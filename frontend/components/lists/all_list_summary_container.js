import { connect } from 'react-redux';
import AllListSummary from './all_list_summary';

const mapStateToProps = (state, ownProps) => {
  return {
    lists: state.lists.lists
  };
};

export default connect(mapStateToProps)(AllListSummary);
