import React from 'react';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fname: "", lname: "", email: "", username: "", password: "" };

    this.update = this.update.bind(this);
    this.allErrors = this.allErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearErrors = this.props.clearErrors;
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

  allErrors(property) {
    if (this.props.errors[property] === undefined) return null;
    return this.props.errors[property].map((error, index) => {
      return <li key={ index }>{ error }</li>;
    });
  }


  render() {
    const otherLinkUrl = this.props.formType === 'login' ? 'signup' : 'login';
    const otherLinkText = this.props.formType === 'login' ? 'Sign up for free' : 'Log in';
    const submitText = this.props.formType === 'login' ? 'Log in' : 'Sign up!';
    const greetingText = this.props.formType === 'login' ? 'Been here before? Welcome back!' : 'Sign up for free.';
    const fnameErr = this.props.errors["fname"] === undefined ? "" : "hasError";
    const lnameErr = this.props.errors["lname"] === undefined ? "" : "hasError";
    const unameErr = this.props.errors["username"] === undefined ? "" : "hasError";
    const emailErr = this.props.errors["email"] === undefined ? "" : "hasError";
    const passwordErr = this.props.errors["password"] === undefined ? "" : "hasError";
    const baseErr = this.props.errors["base"] === undefined ? "" : "signinError";

    const newUserFields = this.props.formType === 'login' ? "" : (
      <div>
        <label>
          <input className="authField" id={ fnameErr } type="text" value={ this.state.fname } onChange={ this.update("fname") } placeholder="First Name" />
        </label>

        <ul className="errorContainer">{ this.allErrors("fname") }</ul>

        <label>
          <input className="authField" id={ lnameErr } type="text" value={ this.state.lname } onChange={ this.update("lname") } placeholder="Last Name" />
        </label>

        <ul className="errorContainer">{ this.allErrors("lname") }</ul>

        <label>
          <input className="authField" id={ emailErr } type="text" value={ this.state.email } onChange={ this.update("email") } placeholder="Email" />
        </label>

        <ul className="errorContainer">{ this.allErrors("email") }</ul>
      </div>
    );

    let leftSideGraphics = "";
    if (this.props.formType === 'signup') {
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

    return(
      <section className="container group">
        <section className="leftSide">
          { leftSideGraphics }
        </section>

        <section className="group rightSide">
          <Link onClick={ this.clearErrors } className="link" to={ otherLinkUrl }>{ otherLinkText }</Link>

          <form onSubmit={ this.handleSubmit }>
            <h3>{ greetingText }</h3>

            <ul className={ baseErr }>{ this.allErrors("base") }</ul>

            { newUserFields }
            <label>
              <input className="authField" id={ unameErr } type="text" value={ this.state.username } onChange={ this.update("username") } placeholder="Username" />
            </label>

            <ul className="errorContainer">{ this.allErrors("username") }</ul>

            <label>
              <input className="authField" id={ passwordErr } type="password" value={ this.state.password } onChange={ this.update("password") } placeholder="Password" />
            </label>

            <ul className="errorContainer">{ this.allErrors("password") }</ul>

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
