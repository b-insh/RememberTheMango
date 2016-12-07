import React from 'react';
import { Link, withRouter } from 'react-router';

class Greeting extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { currentUser, logout } = this.props;
    if (currentUser) {
      return(
        <div>
          <h1>Logged in as: { currentUser.username }</h1>
          <input type="submit" value="Log Out" onClick={ this.handleLogout } />
        </div>
      );
    } else if ( this.props.location.pathname === '/' ){
      return(
        <div>
          <Link to={'/signup'}>Sign Up</Link>
          <br />
          <Link to={'/login'}>Log In</Link>
          { this.props.children }
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(Greeting);
