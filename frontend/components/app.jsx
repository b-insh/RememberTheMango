import React from 'react';
import GreetingContainer from './greeting/greeting_container';
import SidebarContainer from './sidebar/sidebar_container';



const App = ({ children }) => (
  <div className="home-page group">
    <GreetingContainer />
    <SidebarContainer />
    { children }
  </div>
);

export default App;
