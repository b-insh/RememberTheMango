import React from 'react';

class Sidebar extends React.Component {
  constructor({ tasks }) {
    super();

  }

  render() {
    return(
      <section className="sidebar">
        <p>All Tasks</p>
        <p>Today</p>
      </section>
    );
  }
}

export default Sidebar;
