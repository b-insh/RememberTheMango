import React from 'react';
import { Link, withRouter } from 'react-router';

class Greeting extends React.Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchTasks = this.searchTasks.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.state = { dropDownStatus: "dropdown-close", query: "", activeSearchBar: "search-bar group" };
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

  searchTasks(e) {
    if(e.key === 'Enter') {
      const query = this.state.query;
      this.props.searchTasks(this.state.query).then(() => this.props.router.push(`/search/${query}`));
      this.setState({ query: "" });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentUser === null) {
      this.props.router.push('/welcome');
    }
  }

  handleSearchClick() {
    if (this.state.activeSearchBar === "active search-bar group") {
      this.setState({ activeSearchBar: "search-bar group"});
    } else {
      this.setState({ activeSearchBar: "active search-bar group"});
    }
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  render() {
    const { currentUser, logout } = this.props;
    return(
      <nav className="nav-bar group">
      <section className={ this.state.activeSearchBar } onClick={ this.handleSearchClick } onBlur={ this.handleSearchClick }><div className="search-icon">search</div>
        <input className="search-input" type="text" value={ this.state.query } onChange={ this.update("query") } onKeyPress={ this.searchTasks } />
      </section>
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
