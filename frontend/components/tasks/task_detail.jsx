import React from 'react';
import { Link , hashHistory } from 'react-router';
import merge from 'lodash/merge';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.getAttributes = this.getAttributes.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.getBlanks = this.getBlanks.bind(this);
    this.update = this.update.bind(this);
    this.state = { title: "", location: "", start_date: "", due_date: "", estimate: "", list_id: ""};
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

  handleListChange(e) {
    this.setState({list_id: e.target.value});
  }

  getAttributes(task) {
    const attrs = [];
    if (task.start_date) { attrs.push(["start", "start_date", this.state.start_date]); }
    if (task.due_date) { attrs.push(["due", "due_date", this.state.due_date]); }
    if (task.estimate) { attrs.push(["estimate", "estimate", this.state.estimate]); }
    if (task.location) { attrs.push(["location", "location", this.state.location]); }
    // if (task.list_id) { attrs.push(["list", "list_id", task.list.title]); }
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
    if (!task.start_date) { nonAttrs.push(["start", "start_date", 0]); }
    if (!task.due_date) { nonAttrs.push(["due", "due_date", 1]); }
    if (!task.estimate) { nonAttrs.push(["estimate", "estimate", 2]); }
      if (!task.location) { nonAttrs.push(["location", "location", 3]); }
    // if (!task.list_id) { nonAttrs.push(["list", "list_id", 4]); }
    return nonAttrs.map((attr, index) => {
      let type;
      if (attr[1] === "start_date" || attr[1] === "due_date") {
        type = "date";
      } else {
        type = "text";
      }
      return <li key={ `${attr[2]}` }><strong>{ attr[0] }</strong>&nbsp;&nbsp;&nbsp;<input className="input-attr" type={ type } onKeyPress={ this.handleEditTask } onChange={ this.update(`${attr[1]}`)}/></li>
    });
  }

  getLists() {
		return (
			this.props.lists.map(list => <option key={list.id} value={list.id}>{list.title}</option>)
		)
  }
  // onClick={ () => {
  //   let location = hashHistory.getCurrentLocation().pathname;
  //   location = location.slice(0, location.indexOf("/task"));
  //   hashHistory.push(location);

  render() {
    const task = this.props.task;
    if (task) {
    const attributes = this.getAttributes(task);
    const blanks = this.getBlanks(task);
      return (
        <section className="task-detail stretchLeft">
          <ul className="detail-top group">
            <li><div className="close"><Link to={ "/tasks" }>close x</Link></div></li>

            <li><textarea value={ this.state.title } className="task-name" onChange={ this.update("title")} onKeyPress={ this.handleEditTask }/></li>
          </ul>
          <div className="task-data">
            <ul className="attributes">
              { attributes }
            </ul>
            <span className="list-label">list</span>
            <select className="list-name-dropdown" value={ this.state.list_id } onChange={ this.handleListChange }>
            <option value={ null }>No List</option>
            { this.getLists() }
            </select>
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
