import { connect } from 'react-redux';
import Welcome from './welcome';

const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
  };
};

export default connect(mapStateToProps)(Welcome);
