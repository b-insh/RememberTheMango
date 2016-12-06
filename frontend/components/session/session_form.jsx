import React from 'react';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor() {
    super();

    this.state = { fname: "", lname: "", email: "", username: "", password: "" };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => {
      this.props.router.push('/');
    });
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  render() {
    const otherLinkUrl = this.props.formType === 'login' ? 'signup' : 'login';
    const otherLinkText = this.props.formType === 'login' ? 'Sign up for free' : 'Log in';
    const submitText = this.props.formType === 'login' ? 'Log in' : 'Sign up!';
    const greetingText = this.props.formType === 'login' ? 'Been here before? Welcome back!' : 'Sign up for free.';

    const newUserFields = this.props.formType === 'login' ? "" : (
      <div>
        <label>
          <input className="authField" type="text" value={ this.state.fname } onChange={ this.update("fname") } placeholder="First Name" />
        </label>

        <label>
          <input className="authField" type="text" value={ this.state.lname } onChange={ this.update("lname") } placeholder="Last Name" />
        </label>

        <label>
          <input className="authField" type="text" value={ this.state.email } onChange={ this.update("email") } placeholder="Email" />
        </label>
      </div>
    );

    return(
      <section className="container group">
        <section className="leftSide">
        </section>

        <section className="group rightSide">
          <Link className="link" to={ otherLinkUrl }>{ otherLinkText }</Link>

          <form onSubmit={ this.handleSubmit }>
            <h3>{ greetingText }</h3>
            { newUserFields }
            <label>
              <input className="authField" type="text" value={ this.state.username } onChange={ this.update("username") } placeholder="Username" />
            </label>

            <label>
              <input className="authField" type="password" value={ this.state.password } onChange={ this.update("password") } placeholder="Password" />
            </label>

            <input className="submit authField" type="submit" value={ submitText } />
            <div className="divider">
              <hr />
              <span> OR </span>
            </div>
            <input className="guestLogIn authField" type="submit" value="Log in as guest"/>
          </form>
        </section>
      </section>
    );
  }
}

export default SessionForm;
