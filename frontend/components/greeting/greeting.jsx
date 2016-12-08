import React from 'react';
import { Link, withRouter } from 'react-router';

class Greeting extends React.Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser === null) {
      this.props.router.push('/welcome');
    }
  }

  render() {
    const { currentUser, logout } = this.props;
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
  }
}

export default withRouter(Greeting);
