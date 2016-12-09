import React from 'react';
import TaskItem from './task_item';

class TaskIndex extends React.Component {
  constructor({ tasks, fetchTasks, newTask, editTask, removeTask }) {
    super();

    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleSelectTask = this.handleSelectTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.displayButton = this.displayButton.bind(this);
    this.undisplayButton = this.undisplayButton.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleIncomplete = this.toggleIncomplete.bind(this);

    this.state = { title: "", selectedTask: null, buttonStatus: "button-close", completeTasks: "", incompleteTasks: "highlight", taskActions: "hidden"};
  }

  componentDidMount() {
    this.props.fetchTasks();
  }

  updateTask(e) {
    this.setState({ title: e.target.value });
  }

  handleNewTask() {
    const task = Object.assign({}, this.state);
    this.props.newTask(task).then(() => {
      this.props.fetchTasks();
    });

    this.setState({ title: "" });
  }

  handleSelectTask(task) {
    this.setState({ selectedTask: task });
    if (this.state.selectedTask) {
      this.setState({ taskActions: "action-icons"});
    }
  }

  displayButton() {
    if (this.state.buttonStatus === "button-close" || this.state.title !== "" ) {
      this.setState({ buttonStatus: "button-open" });
    }
  }

  undisplayButton() {
    if (this.state.buttonStatus === "button-open") {
      this.setState({ buttonStatus: "button-close"});
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

  // completeTask(task) {
  //   let updateTask = e.current.target;
  //   const updatedTask = Object.assign({}, this.state, { complete: true });
  //   debugger
  //   this.props.editTask(updatedTask);
  // }

  render() {
    const selectedTask = this.state.selectedTask;
    const allTasks = this.props.tasks.map( (task, index) => {
      return (
        <TaskItem
          task={ task }
          key={ index }
          handleSelectTask={ this.handleSelectTask }
          selectedTask={ selectedTask }
          />
      );
    });
    const inputClass = this.state.title === "" ? "add-task-button inactive" : "add-task-button";
    const buttonClass = inputClass + " " + this.state.buttonStatus;

    return(
      <section className="tasks group">

        <ul className="task-status group">
          <li className={ this.state.incompleteTasks } onClick={ this.toggleIncomplete }>Incomplete</li>
          <li className={ this.state.completeTasks } onClick={ this.toggleComplete }>Completed</li>
        </ul>

        <section className="task-actions">
          <ul className={ this.state.taskActions }>
            <li className="delete-task" onClick={ () => this.props.removeTask(this.state.selectedTask).then(() => this.props.fetchTasks())}>delete</li>
            <li className="complete-task" >check circle</li>
          </ul>
        </section>

        <section className="add-task group" onBlur={ this.undisplayButton }>

          <input className="task-text" type="text" value={ this.state.title } placeholder="Add a task..." onChange={ (e) => this.updateTask(e) } onFocus={ this.displayButton } />

          <div className="button-wrapper">
            <input type="submit" onClick={ this.handleNewTask } className={ buttonClass } value="Add Task" />
          </div>
        </section>


        <section className="tasks-index">
          <ul className="tasks-list">
            { allTasks }
          </ul>
        </section>

      </section>
    );
  }
}

export default TaskIndex;
