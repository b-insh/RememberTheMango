import React from 'react';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
    this.allErrors = this.allErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearErrors = this.props.clearErrors;
    this.guestLogin = this.guestLogin.bind(this);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      username: "",
      password: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { processForm, router } = this.props;
    const user = Object.assign({}, this.state);
    processForm(user).then(() => {
      router.push('/tasks');
    });
  }

  guestLogin(e) {
    e.preventDefault();
    const { login, router } = this.props;
    const guestUser = { username: "mangomango", password: "ilovemangoes123" };
    login(guestUser).then(() => {
      router.push('/tasks');
    });
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  allErrors(property) {
    const { errors } = this.props;
    if (errors[property] === undefined) return null;
    return errors[property].map((error, index) => {
      return <li key={ index }>{ error }</li>;
    });
  }

  render() {
    const { formType, errors, location } = this.props;
    const { fname, lname, email, username, password } = this.state;

    const otherLinkUrl = formType === 'login' ? 'signup' : 'login';
    const otherLinkText = formType === 'login' ? 'Sign up for free' : 'Log in';
    const submitText = formType === 'login' ? 'Log in' : 'Sign up!';
    const greetingText = formType === 'login' ? 'Been here before? Welcome back!' : 'Sign up for free.';
    const fnameErr = errors["fname"] === undefined ? "" : "hasError";
    const lnameErr = errors["lname"] === undefined ? "" : "hasError";
    const unameErr = errors["username"] === undefined ? "" : "hasError";
    const emailErr = errors["email"] === undefined ? "" : "hasError";
    const passwordErr = errors["password"] === undefined ? "" : "hasError";
    const baseErr = errors["base"] === undefined ? "" : "signinError";

    const newUserFields = formType === 'login' ? "" : (
      <div>
        <label>
          <input
            className="authField"
            id={ fnameErr }
            type="text"
            value={ fname }
            onChange={ this.update("fname") }
            placeholder="First Name" />
        </label>
        <ul className="errorContainer">{ this.allErrors("fname") }</ul>
        <label>
          <input
            className="authField"
            id={ lnameErr }
            type="text"
            value={ lname }
            onChange={ this.update("lname") }
            placeholder="Last Name" />
        </label>
        <ul className="errorContainer">{ this.allErrors("lname") }</ul>
        <label>
          <input
            className="authField"
            id={ emailErr }
            type="text"
            value={ email }
            onChange={ this.update("email") }
            placeholder="Email" />
        </label>
        <ul className="errorContainer">{ this.allErrors("email") }</ul>
      </div>
    );

    let leftSideGraphics = "";
    if (formType === 'signup') {
      leftSideGraphics = (
        <div>
          <div className="row group">
            <span className="imageContainer">
              <div className="img signupImage1"></div>
            </span>
            <span className="imageContainer">
              <div className="img signupImage2"></div>
            </span>
            <span className="imageContainer">
              <div className="img signupImage3"></div>
            </span>
          </div>
          <div className="welcome join">
            <h2>Join millions of people getting more organized and productive!</h2>
          </div>
      </div>
    );
    } else {
      leftSideGraphics = (
        <div>
            <div className="welcome quote">
            <h2>“Don’t sit at home and wait for mango tree to bring mangoes to you wherever you are. It won’t happen. If you are truly hungry for change, go out of your comfort zone and change the world.”</h2>
            <h3> - Israelmore Ayivor</h3>
          </div>
        </div>
      );
    }

    const guestUserLogin = location.pathname === '/login' ? (
      <section className="guestLoginSection">
        <div className="divider">
          <hr />
          <span> OR </span>
        </div>
        <input
          onClick={ this.guestLogin }
          className="guestLogIn authField"
          type="submit"
          value="Log in as guest"/>
      </section>
    ) : "";

    return(
      <main className="container group">
        <section className="leftSide">
          { leftSideGraphics }
        </section>

        <section className="group rightSide">
          <Link
            onClick={ this.clearErrors }
            className="link" to={ otherLinkUrl }>
            { otherLinkText }
          </Link>

          <form onSubmit={ this.handleSubmit }>
            <h3>{ greetingText }</h3>
            <ul className={ baseErr }>{ this.allErrors("base") }</ul>
            { newUserFields }
            <label>
              <input
                className="authField"
                id={ unameErr }
                type="text"
                value={ username }
                onChange={ this.update("username") }
                placeholder="Username" />
            </label>
            <ul className="errorContainer">{ this.allErrors("username") }</ul>
            <label>
              <input
                className="authField"
                id={ passwordErr }
                type="password"
                value={ password }
                onChange={ this.update("password") }
                placeholder="Password" />
            </label>
            <ul className="errorContainer">{ this.allErrors("password") }</ul>
            <input className="submit authField" type="submit" value={ submitText } />
            { guestUserLogin }
          </form>
        </section>
      </main>
    );
  }
}

export default SessionForm;
