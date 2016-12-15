import React from 'react';
import { Link, withRouter } from 'react-router';

class Welcome extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { currentUser } = this.props;
    if (this.props.location.pathname === "/welcome") {
      return (
        <section className="welcome-page">
          <nav className="welcome-nav group">
            <section className="welcome-logo"></section>
            <ul className="welcome-links group">
              <li className="welcome-login-link">
                <Link to={'/login'}>Log in</Link>
              </li>
              <li className="welcome-signup-link">
                <Link to={'/signup'}>Sign up for free</Link>
              </li>
            </ul>
          </nav>
          <section className="welcome-content">
            <h1 className="smart-app-text">The smart to-do app for busy people.</h1>
            <Link to={'/signup'}>Sign up free</Link>
          </section>
          { this.props.children }
        </section>
      );
    } else {
      return (
        <div>
          { this.props.children }
        </div>
      );
    }

  }
}

export default withRouter(Welcome);
