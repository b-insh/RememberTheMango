import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory }from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';
import WelcomeContainer from './welcome/welcome_container';
import HomePage from './home_page';


const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  };

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  }

  return(
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path='/welcome' component={ WelcomeContainer } onEnter={ _redirectIfLoggedIn }>
          <Route path="/login" component={ SessionFormContainer } />
          <Route path="/signup" component={ SessionFormContainer } />
        </Route>
        <Route path="/" component={ App } onEnter={ _ensureLoggedIn }>
          <IndexRoute component={ HomePage } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
