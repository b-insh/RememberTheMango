import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import { fetchTasks, newTask, removeTask, editTask } from './actions/task_actions';
import Modal from 'react-modal';


document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
  } else {
    store = configureStore();
  }
  window.store = store;
  const root = document.getElementById('root');
  Modal.setAppElement(document.body);
  ReactDOM.render(<Root store={ store }/>, root);
});

window.fetchTasks = fetchTasks;
window.newTask = newTask;
window.removeTask = removeTask;
window.editTask = editTask;
