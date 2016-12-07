import React from 'react';
import { Link } from 'react-router';

class Greeting extends React.Component {

  constructor() {
    super();

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
    } else if (currentUser === null) {
      return(
        <div>
          <Link to={'/signup'}>Sign Up</Link>
          <br />
          <Link to={'/login'}>Log In</Link>
          { this.props.children }
        </div>
      );
    }
  }
}

export default Greeting;
