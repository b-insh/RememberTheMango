import React from 'react';
import TaskItem from '../tasks/task_item';
import values from 'lodash/values';
import { hashHistory } from 'react-router';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleSelectTask = this.handleSelectTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.displayButton = this.displayButton.bind(this);
    this.undisplayButton = this.undisplayButton.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleIncomplete = this.toggleIncomplete.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.toggleCompleteTask = this.toggleCompleteTask.bind(this);
    this.toggleIncompleteTask = this.toggleIncompleteTask.bind(this);
    this.findIncompleteTasks = this.findIncompleteTasks.bind(this);
    this.findCompleteTasks = this.findCompleteTasks.bind(this);
    this.getSearchedTasks = this.getSearchedTasks.bind(this);

    this.state = { title: "", selectedTask: "", buttonStatus: "hidden", iconDisplay: "hidden", completeTasks: "", incompleteTasks: "highlight", query: ""};
  }

  componentDidMount() {
    let location = hashHistory.getCurrentLocation().pathname;
    const query = location.slice(location.indexOf("/search/") + 8);
    this.setState({ query: query });
    this.props.searchTasks(query);
  }

  getSearchedTasks() {
    let tasks = this.props.tasks;
    if (tasks) {
      return Object.keys(tasks).map(taskId => tasks[taskId]);
    }
  }

  updateTask(e) {
    this.setState({ title: e.target.value });
  }

  handleNewTask(e) {
    let task = Object.assign({}, this.state);
    this.props.newTask(task);
    this.setState({ title: "" });
  }

  handleSelectTask(task) {
    this.setState({ selectedTask: task });
    this.setState({ iconDisplay: "action-icons"});

  }

  handleDeleteTask() {
    this.props.removeTask(this.state.selectedTask).then(() => {
      this.props.fetchTasks();
    });
    this.props.router.push(`/search/${this.state.query}`);
  }

  displayButton() {
    if (this.state.buttonStatus === "hidden") {
      this.setState({ buttonStatus: "button-open" });
    }
  }

  undisplayButton(e) {
    if (e.currentTarget.contains(e.relatedTarget)) {
      this.handleNewTask(e);
    }
    if (this.state.buttonStatus === "button-open") {
      this.setState({ buttonStatus: "hidden"});
    }
  }

  toggleComplete() {
    if (this.state.incompleteTasks === "highlight") {
      this.setState({ incompleteTasks: "", completeTasks: "highlight" });
    }
  }

  toggleIncomplete() {
    if (this.state.completeTasks === "highlight") {
      this.setState({ incompleteTasks: "highlight", completeTasks: "" });
    }
  }

  toggleCompleteTask() {
    let completedTask = Object.assign({}, this.state.selectedTask, { completed: true });
    this.props.editTask(completedTask);
    this.setState({ selectedTask: "" });

  }

  toggleIncompleteTask() {
    let incompleteTask = Object.assign({}, this.state.selectedTask, { completed: false });
    this.props.editTask(incompleteTask);
    this.setState({ selectedTask: "" });
  }

  findCompleteTasks(tasks) {
    const completeTasks = [];
    if (tasks) {
      tasks.forEach( task => {
        if (task.completed) { completeTasks.push(task); }
      });
      return completeTasks;
    }
  }

  findIncompleteTasks(tasks) {
    const incompleteTasks = [];
    if(tasks) {
      tasks.forEach( task => {
        if (!task.completed) { incompleteTasks.push(task); }
      });
      return incompleteTasks;
    }
  }

  render() {
    const closePath = `/search/${this.state.query}`;
    const openPath = `/search/${this.state.query}/tasks`;
    const tasks = this.getSearchedTasks();
    let findTasks = this.state.incompleteTasks === "highlight" ? this.findIncompleteTasks(tasks) : this.findCompleteTasks(tasks);
    let renderedTasks;
    if (findTasks) {
      renderedTasks = findTasks.map( (task, index) => {
        return(
          <TaskItem
          task={ task }
          key={ index }
          handleSelectTask={ this.handleSelectTask }
          selectedTask={ this.state.selectedTask }
          closePath={ closePath }
          openPath={ openPath } />
        );
      });
    }
    const inputClass = this.state.title === "" ? "add-task-button inactive" : "add-task-button";
    const buttonClass = inputClass + " " + this.state.buttonStatus;

    return (
      <section className="tasks group">

        <section className="task-bar">
          <ul className="task-status group">
            <li className={ this.state.incompleteTasks } onClick={ this.toggleIncomplete }>Incomplete</li>
            <li className={ this.state.completeTasks } onClick={ this.toggleComplete }>Completed</li>
          </ul>

          <ul className={ this.state.iconDisplay }>
            <li className="delete-task" onClick={ this.handleDeleteTask }>delete</li>
            <li className="complete-task" onClick={ this.toggleCompleteTask }>check circle</li>
            <li className="uncomplete-task" onClick={ this.toggleIncompleteTask }>restore</li>
          </ul>

        </section>

        <section className="add-task group" onFocus={ this.displayButton } onBlur={ this.undisplayButton }>

          <input className="task-text" type="text" value={ this.state.title } placeholder="Add a task..." onChange={ (e) => this.updateTask(e) }/>

          <div className="button-wrapper" >
            <input type="submit" onClick={ this.handleNewTask } className={ buttonClass } value="Add Task" />
          </div>
        </section>

        <section className="tasks-index">
          <ul className="tasks-list">
            { renderedTasks }
          </ul>
        </section>

        { this.props.children }
      </section>
    );
  }
}

export default Search;
