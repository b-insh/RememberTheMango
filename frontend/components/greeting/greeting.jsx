import React from 'react';
import { Link, withRouter } from 'react-router';

class Greeting extends React.Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchTasks = this.searchTasks.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.renderIcon = this.renderIcon.bind(this);

    this.state = { dropDownStatus: "dropdown-close", query: "", activeSearchBar: "search-bar group", imageFile: "", imageUrl: ""};
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

  updateFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  renderIcon() {
    if (this.state.imageUrl !== "") {
      return <img className="user-icon" src={ this.state.imageUrl } />
    } else {
      if (this.props.currentUser) {
        return <img className="user-icon" src={ this.props.currentUser.image_url } />
      }
    }
  }

  handleImageSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user[id]", this.props.currentUser.id);
    formData.append("user[image]", this.state.imageFile);
    this.props.editUser(formData);
  }

  render() {
    const { currentUser, logout } = this.props;
    if (currentUser) {
      return(
        <nav className="nav-bar group">
        <section className={ this.state.activeSearchBar } onClick={ this.handleSearchClick } onBlur={ this.handleSearchClick }>
        <div className="search-icon">search</div>
        <input className="search-input" type="text" value={ this.state.query } onChange={ this.update("query") } onKeyPress={ this.searchTasks } />
        </section>

        <span><div className="settings" onClick={ this.handleClick }>settings</div>
        <div className={ this.state.dropDownStatus }>
        <span className="dropdown-arrow"></span>
        { this.renderIcon() }
        <ul className="header-nav-links">
        <li><h3 className="name"> { currentUser.fname } { currentUser.lname }</h3></li>
        <li><h3 className="email">{ currentUser.email }</h3></li>

        <div className="input-container">
        <li>
        <label className="fake-input">Choose File
        <input type="file" className="image-upload" encType="multipart/form-data" onChange={ this.updateFile }/></label></li>
        </div>

        <li><button className="image-submit" onClick={ this.handleImageSubmit }>Upload Photo</button></li>
        <li><input className="logout" type="submit" value="Log Out" onClick={ this.handleLogout } /></li>
        </ul>
        </div>
        </span>
        </nav>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(Greeting);





// <li><div className="fake-input">Choose File</div></li>
