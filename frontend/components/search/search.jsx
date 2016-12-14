import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.filterTasks = this.filterTasks.bind(this);

    this.state = { query: "" };
  }

  filterTasks() {
    tasks = this.props.tasks;
    query = this.state.query;


  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  render() {

    return (
      <section className="search-bar">
        <input type="text" value={ this.state.query } onChange={ this.update("query") } onEnter={ this.filterTasks } />
      </section>
    );
  }
}
