import React from 'react';
import { Link } from 'react-router';
import merge from 'lodash/merge';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.getAttributes = this.getAttributes.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.getBlanks = this.getBlanks.bind(this);
    this.update = this.update.bind(this);
    this.state = { title: "", location: "", start_date: "", due_date: "", estimate: "", list: ""};
  }

  componentDidMount() {
    this.props.fetchTaskDetail(this.props.params.id).then(() => {
      this.setState({ title: this.props.task.title, location: this.props.task.location, start_date: this.props.task.start_date, due_date: this.props.task.due_date, estimate: this.props.task.estimate, list_id: this.props.task.list_id });
    });
 }

 componentDidUpdate(prevProps) {
  if (prevProps.params.id !== this.props.params.id) {
      this.props.fetchTaskDetail(this.props.params.id).then(() => {
        this.setState({ title: this.props.task.title, location: this.props.task.location, start_date: this.props.task.start_date, due_date: this.props.task.due_date, estimate: this.props.task.estimate, list_id: this.props.task.list_id });
      });
    }
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  handleEditTask(e) {
    if(e.key === 'Enter') {
      const newTask = merge({}, this.props.task, this.state);
      this.props.editTask(newTask).then(() => {
        this.props.fetchTaskDetail(newTask.id);
      });
    }
  }

  getAttributes(task) {
    const attrs = [];
    if (task.start_date) { attrs.push(["start", "start_date", this.state.start_date]); }
    if (task.due_date) { attrs.push(["due", "due_date", this.state.due_date]); }
    if (task.estimate) { attrs.push(["estimate", "estimate", this.state.estimate]); }
    if (task.location) { attrs.push(["location", "location", this.state.location]); }
    if (task.list_id) { attrs.push(["list", "list_id", this.state.list_id]); }
    return attrs.map((attr, index) => {
      let type;
      if (attr[1] === "start_date" || attr[1] === "due_date") {
        type = "date";
      } else {
        type = "text";
      }
      return <li key={ index }><strong>{ attr[0] }</strong>&nbsp;&nbsp;&nbsp;<input className="input-attr" type={ type } onKeyPress={ this.handleEditTask } onChange={ this.update(`${attr[1]}`) } value={ `${attr[2]}` }/></li>
    });
  }

  getBlanks(task) {
    const nonAttrs = [];
    if (!task.start_date) { nonAttrs.push(["start", "start_date"]); }
    if (!task.due_date) { nonAttrs.push(["due", "due_date"]); }
    if (!task.estimate) { nonAttrs.push(["estimate", "estimate"]); }
      if (!task.location) { nonAttrs.push(["location", "location"]); }
    if (!task.list_id) { nonAttrs.push(["list", "list_id"]); }
    return nonAttrs.map((attr, index) => {
      let type;
      if (attr[1] === "start_date" || attr[1] === "due_date") {
        type = "date";
      } else {
        type = "text";
      }
      return <li key={ index }><strong>{ attr[0] }</strong>&nbsp;&nbsp;&nbsp;<input className="input-attr" type={ type } onKeyPress={ this.handleEditTask } onChange={ this.update(`${attr[1]}`)}/></li>
    });  }

  render() {
    const task = this.props.task;
    if (task) {
    const attributes = this.getAttributes(task);
    const blanks = this.getBlanks(task);
      return (
        <section className="task-detail">
          <ul className="detail-top group">
            <li><h2 className="close"><Link to={ "/tasks" }>close x</Link></h2></li>
            <li><input type="text" value={ this.state.title } className="task-name" onChange={ this.update("title")} onKeyPress={ this.handleEditTask }/></li>
          </ul>
          <div className="task-data">
            <ul className="attributes">
              { attributes }
            </ul>
            <ul className = "non-attributes">
              { blanks }
            </ul>
          </div>
          {this.props.children}
        </section>
      )
    } else {
      return null;
    }
  }
}

export default TaskDetail;
