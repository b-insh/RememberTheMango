import React from 'react';
import { Link } from 'react-router';

class Sidebar extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchLists();
    debugger
  }

  render() {

    const lists = this.props.lists.map( (list, index) => {
      return (
        <Link to={ `lists/${list.id}` }>
          <li key={ index }>
            { list.title }
          </li>
        </Link>
      )
    })
    return(
      <section className="sidebar">
        <section className="sidebar-tasks">
          <Link to={ "/tasks" }><p>All Tasks</p></Link>
          <p>Today</p>
        </section>
        <section className="lists">
          { lists }
        </section>
      </section>
    );
  }
}

export default Sidebar;
