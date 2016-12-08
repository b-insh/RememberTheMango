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
        <section className="welcome_page">
          <nav className="welcome_nav group">
            <ul className="welcome_links group">
              <li className="welcome_login_link">
                <Link to={'/login'}>Log in</Link>
              </li>
              <li className="welcome_signup_link">
                <Link to={'/signup'}>Sign up for free</Link>
              </li>
            </ul>
          </nav>
          <section className="welcome_content">
            <h1 className="smart_app_text">The smart to-do app for busy people.</h1>
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
