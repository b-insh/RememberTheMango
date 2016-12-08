import React from 'react';
import { Link, withRouter } from 'react-router';

class Greeting extends React.Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { dropDownStatus: "dropdown-close" };
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.dropDownStatus === "dropdown-close") {
      this.setState({ dropDownStatus: "dropdown-open"});
    } else {
      this.setState({ dropDownStatus: "dropdown-close"});
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser === null) {
      this.props.router.push('/welcome');
    }
  }

  render() {
    const { currentUser, logout } = this.props;
    return(
      <nav className="nav-bar group">
        <span onClick={ this.handleClick } className="settings">settings
          <div className={ this.state.dropDownStatus }>
            <span className="dropdown-arrow"></span>
            <ul className="header-nav-links">
              <li><h3 className="name"> { currentUser.fname } { currentUser.lname }</h3></li>
              <li><h3 className="email">{ currentUser.email }</h3></li>
              <li><input className="logout" type="submit" value="Log Out" onClick={ this.handleLogout } /></li>
            </ul>
          </div>
        </span>
      </nav>
    );
  }
}

export default withRouter(Greeting);
