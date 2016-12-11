import React from 'react';
import { Link } from 'react-router';
import { merge } from 'lodash/merge';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.getAttributes = this.getAttributes.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.update = this.update.bind(this);
    this.state = { title: "" };
  }

  componentDidMount() {
    this.props.fetchTaskDetail(this.props.params.id).then(() => {
      this.setState({ title: this.props.task.title });
    });
 }

 componentDidUpdate(prevProps) {
  if (prevProps.params.id !== this.props.params.id) {
      this.props.fetchTaskDetail(this.props.params.id).then(() => {
        this.setState({ title: this.props.task.title });
      });
    }
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  handleEditTask(e) {
    if (e.key == 'Enter') {
      debugger
      const newTitle = { title: this.state.title }
      const editedTask = Object.assign(this.props.task, newTitle);
      this.props.editTask(editedTask);
    }

  }

  getAttributes(task) {
    const attrs = [];
    if (task.start_date) { attrs.push(["start", task.start_date]); }
    if (task.due_date) { attrs.push(["due", task.due_date]); }
    if (task.estimate) { attrs.push(["estimate", task.estimate]); }
    if (task.location) { attrs.push(["location", task.location]); }
    if (task.list_id) { attrs.push(["list", task.list_id]); }
    return attrs.map((attr, index) => {
      return <li key={ index }><strong>{ attr[0] }</strong>&nbsp;&nbsp;&nbsp;{ attr[1] }</li>
    });
  }

  render() {
    const task = this.props.task;
    if (task) {
    const attributes = this.getAttributes(task);
      return (
        <section className="task-detail">
        <ul className="detail-top group">
          <li><h2 className="close"><Link to={ "/tasks" }>close x</Link></h2></li>
          <li><input type="text" value={ this.state.title } className="task-name" onChange={ this.update("title")} onKeyPress={ this.handleEditTask }/></li>
        </ul>

        <ul className="attributes">
          { attributes }
        </ul>
         {this.props.children}
        </section>
      )
    } else {
      return null;
    }
  }
}

export default TaskDetail;
