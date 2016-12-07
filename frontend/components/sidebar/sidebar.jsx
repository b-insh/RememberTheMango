import React from 'react';

class Sidebar extends React.Component {
  constructor({ tasks }) {
    super();

  }

  render() {
    return(
      <section className="mainContent">
        <section className="sidebar">
          <p>All Tasks</p>
          <p>Today</p>
        </section>
      </section>
    );
  }
}

export default Sidebar;
