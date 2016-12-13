import React from 'react';
import { Link , hashHistory } from 'react-router';
import merge from 'lodash/merge';
import moment from 'moment';

import DatePicker from 'react-datepicker';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleListChange = this.handleListChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.update = this.update.bind(this);
    this.state = { title: "", location: "", start_date: "", due_date: "", estimate: "", list_id: ""};
  }

  componentDidMount() {
    this.props.fetchTaskDetail(this.props.params.taskId).then(() => {
      this.setState({ title: this.props.task.title, location: this.props.task.location, start_date: this.props.task.start_date, due_date: this.props.task.due_date, estimate: this.props.task.estimate, list_id: this.props.task.list_id });
    });
 }

 componentDidUpdate(prevProps) {
  if (prevProps.params.taskId !== this.props.params.taskId) {
      this.props.fetchTaskDetail(this.props.params.taskId).then(() => {
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
      this.props.editTask(newTask);
    }
  }

  updateTask() {
    const updatedTask = merge({}, this.props.task, this.state);
    this.props.editTask(updatedTask);
  }

  handleListChange(e) {
    this.setState({list_id: e.target.value});
  }

  handleDateChange(type) {
		return (date) => {
			this.setState({ [type]: date ? date._d : date });
		};
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
      return (
        <section className="task-detail group stretchLeft">
          <ul className="detail-top group">
            <li><div className="close"><Link to={ "/tasks" }>close x</Link></div></li>

            <li><textarea value={ this.state.title } className="task-name" onChange={ this.update("title")} onKeyPress={ this.handleEditTask }/></li>
            </ul>
            <div>
		            <span className="attr-name">start</span>
		            <DatePicker
		              className="task-input datepicker"
		              onChange={ this.handleDateChange("start_date") }
		              onBlur={ this.update("start_date") }
		              isClearable={ true }
		              placeholderText="No Start Date"
		              selected={ this.state.start_date ? moment(this.state.start_date) : null } />
		          </div>
              <div>
		            <span className="attr-name">due</span>
		            <DatePicker
		              className="task-input datepicker"
		              onChange={ this.handleDateChange("due_date") }
		              onBlur={ this.update("due_date") }
		              isClearable={true}
		              placeholderText="No Due Date"
		              selected={ this.state.due_date ? moment(this.state.due_date) : null } />
		          </div>
              <div>
		            <span className="attr-name">estimate</span>
		            <input
		              className="task-input estimate"
		              onChange={ this.update("estimate") }
		              type="number" min="0"
		              value={ this.state.estimate } />minutes
		          </div>
              <div>
                <span className="attr-name">location</span>
                <input
                  className="task-input location"
                  onChange={ this.update("location") }
                  type="text"
                  value={ this.state.location }/>
              </div>
            <span className="attr-name">list</span>
            <select className="task-input list-name-dropdown" value={ this.state.list_id } onChange={ this.handleListChange }>
              <option value={ null }>No List</option>
              { this.getLists() }
            </select>
            <input type="submit" className="update-task" value="Update" onClick={ this.updateTask }/>
          {this.props.children}
        </section>
      )
    } else {
      return null;
    }
  }
}

export default TaskDetail;
