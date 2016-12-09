import React from 'react';
import TaskItem from './task_item';

class TaskIndex extends React.Component {
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


    this.state = { allTasks: this.props.tasks, title: "", selectedTask: null, buttonStatus: "hidden", iconDisplay: "hidden", completeTasks: "", incompleteTasks: "highlight"};
  }

  componentDidMount() {
    this.props.fetchTasks();
  }

  updateTask(e) {
    this.setState({ title: e.target.value });
  }

  handleNewTask(e) {
    const task = Object.assign({}, this.state);
    this.props.newTask(task);

    this.setState({ title: "" });
  }

  handleSelectTask(task) {
    this.setState({ selectedTask: task })
    this.setState({ iconDisplay: "action-icons"});
  }

  displayButton() {
    if (this.state.buttonStatus === "hidden") {
      this.setState({ buttonStatus: "button-open" });
    }
  }

  handleDeleteTask() {
    this.props.removeTask(this.state.selectedTask)
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

  // completeTask(task) {
  //   let updateTask = e.current.target;
  //   const updatedTask = Object.assign({}, this.state, { complete: true });
  //   this.props.editTask(updatedTask);
  // }

  render() {
    const selectedTask = this.state.selectedTask;
    const tasks = this.props.tasks.map( (task, index) => {
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

        <section className="task-bar">
            <ul className="task-status group">
              <li className={ this.state.incompleteTasks } onClick={ this.toggleIncomplete }>Incomplete</li>
              <li className={ this.state.completeTasks } onClick={ this.toggleComplete }>Completed</li>
            </ul>

            <ul className={ this.state.iconDisplay }>
              <li className="delete-task" onClick={ this.handleDeleteTask }>delete</li>
              <li className="complete-task">check circle</li>
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
              { tasks }
            </ul>
          </section>

      </section>
    );
  }
}

export default TaskIndex;
