import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory }from 'react-router';
import App from './app';
import SessionFormContainer from './session/session_form_container';
import WelcomeContainer from './welcome/welcome_container';
import TaskIndexContainer from './tasks/task_index_container';
import TaskDetailContainer from './tasks/task_detail_container';



const Root = ({ store }) => {

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/tasks');
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
          <Route path="/tasks" component={ TaskIndexContainer }>
            <Route path="/tasks/:id" component={ TaskDetailContainer }/>
          </Route>

        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
