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
        <nav className="nav_bar group">
          <span className="settings">settings
            <div className="drop_down">
              <h3 className="name"> { currentUser.fname } { currentUser.lname }</h3>
              <h3 className="email">{ currentUser.email }</h3>
              <input className="logout" type="submit" value="Log Out" onClick={ this.handleLogout } />
            </div>
          </span>
        </nav>
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
