import React from 'react';
import TaskItem from './task_item';

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleSelectTask = this.handleSelectTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleIncomplete = this.toggleIncomplete.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.toggleCompleteTask = this.toggleCompleteTask.bind(this);
    this.toggleIncompleteTask = this.toggleIncompleteTask.bind(this);
    this.findIncompleteTasks = this.findIncompleteTasks.bind(this);
    this.findCompleteTasks = this.findCompleteTasks.bind(this);

    this.state = {
      title: "",
      selectedTask: "",
      iconDisplay: "hidden",
      completeTasks: "",
      incompleteTasks: "highlight"
    };
  }

  componentDidMount() {
      this.props.fetchTasks();
  }

  updateTask(e) {
    this.setState({ title: e.target.value });
  }

  handleNewTask(e) {
    if(e.keyCode == 13) {
      let task = Object.assign({}, this.state);
      this.props.newTask(task);
      this.setState({ title: "" });
    }
  }

  handleSelectTask(task) {
    this.setState({
      selectedTask: task,
      iconDisplay: "action-icons"
    });
  }

  handleDeleteTask() {
    const { removeTask, fetchTasks, router } = this.props;
    removeTask(this.state.selectedTask).then(() => {
      fetchTasks();
    });
    router.push("/tasks");
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
    const closePath = "tasks";
    const openPath = "tasks";
    const tasks = this.props.tasks;
    let findTasks = this.state.incompleteTasks === "highlight" ? this.findIncompleteTasks(tasks) : this.findCompleteTasks(tasks);
    let renderedTasks;
    if (findTasks) {
      renderedTasks = findTasks.map( (task, index) => {
        return (
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

    if (renderedTasks && renderedTasks.length === 0) {
      renderedTasks = ( <div className="task-mangoes">Well, what are you waiting for?</div> );
    }

      return(
        <main className="tasks group">
          <section className="task-bar">
            <ul className="task-status group">
              <li
                className={ this.state.incompleteTasks }
                onClick={ this.toggleIncomplete }>
                Incomplete
              </li>
              <li
                className={ this.state.completeTasks }
                onClick={ this.toggleComplete }>
                Completed
              </li>
            </ul>

            <ul className={ this.state.iconDisplay }>
              <li
                className="delete-task"
                onClick={ this.handleDeleteTask }>
                delete
                <span
                  className="tooltiptext delete-tip">
                  Delete task
                </span>
              </li>
              <li
                className="complete-task"
                onClick={ this.toggleCompleteTask }>
                check circle
                <span
                  className="tooltiptext complete-tip">
                  Mark complete
                </span>
              </li>
              <li
                className="uncomplete-task"
                onClick={ this.toggleIncompleteTask }>
                restore
                <span
                  className="tooltiptext uncomplete-tip">
                  Mark incomplete
                </span>
              </li>
            </ul>
          </section>

          <section className="add-task group">
            <input
              className="task-text"
              type="text"
              value={ this.state.title }
              placeholder="Add a task..."
              onChange={ (e) => this.updateTask(e)}
              onKeyDown={ this.handleNewTask }/>
          </section>

          <section className="tasks-index">
            <ul className="tasks-list">
              { renderedTasks }
            </ul>
          </section>

          { this.props.children }
        </main>
      );
  }
}

export default TaskIndex;
