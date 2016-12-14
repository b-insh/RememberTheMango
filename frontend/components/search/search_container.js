import { connect } from 'react-redux';
import Search from './search';
import { selectAllTasks } from '../../reducers/selectors';

const mapStateToProps = state => {
  return {
    tasks: selectAllTasks(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
