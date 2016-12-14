import { connect } from 'react-redux';
import SearchSummary from './search_summary';
import { selectAllTasks } from '../../reducers/selectors';

const mapStateToProps = state => {
  return {
    tasks: state.searchResults,
  };
};

export default connect(mapStateToProps)(SearchSummary);
