import React from 'react';
import TaskIndexContainer from './tasks/task_index_container';
import SidebarContainer from './sidebar/sidebar_container';


const HomePage = ({ children }) => (
  <div className="home-page">
    <SidebarContainer />
    <TaskIndexContainer />

    { children }
  </div>
);

export default HomePage;
