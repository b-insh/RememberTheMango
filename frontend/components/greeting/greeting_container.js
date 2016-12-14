import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { searchTasks } from '../../actions/task_actions';
import Greeting from './greeting';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    searchTasks: (query) => dispatch(searchTasks(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
