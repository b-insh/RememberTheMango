import React from 'react';
import TaskItem from '../tasks/task_item';

class ListItem extends React.Component {
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

    this.state = {
      title: "",
      selectedTask: "",
      buttonStatus: "hidden",
      iconDisplay: "hidden",
      completeTasks: "",
      incompleteTasks: "highlight",
      tasks: this.props.list.tasks
    };
  }

  componentDidMount() {
    const { fetchList, params } = this.props;
    fetchList(params.listId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.listId !== newProps.params.listId) {
      newProps.fetchList(newProps.params.listId);
    }
  }

  handleSelectTask(task) {
    this.setState({
      selectedTask: task,
      iconDisplay: "action-icons"
    });
  }

    updateTask(e) {
      this.setState({ title: e.target.value });
    }

    handleNewTask(e) {
      if(e.keyCode == 13) {
        const { list, newTask, fetchList, params } = this.props;
        let task = Object.assign({}, this.state, { list_id: list.id });
        newTask(task).then(() => {
          fetchList(params.listId);
        });
        this.setState({ title: "" });
      }
    }

    handleDeleteTask() {
      const { removeTask, fetchList, params, router } = this.props;
      removeTask(this.state.selectedTask).then(() => {
        fetchList(params.listId);
      });
      router.push(`lists/${params.listId}`);
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
      const { editTask, fetchList, params, list } = this.props;
      let listId = list.id;
      let completedTask = Object.assign({}, this.state.selectedTask, { completed: true });
      editTask(completedTask).then(() => {
        fetchList(params.listId);
      });
      this.setState({ selectedTask: "" });

    }

    toggleIncompleteTask() {
      const { list, editTask, fetchList, params } = this.props;
      let listId = list.id;
      let incompleteTask = Object.assign({}, this.state.selectedTask, { completed: false });
      editTask(incompleteTask).then(() => {
        fetchList(params.listId);
      });
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
    const { list } = this.props;
    const {
      incompleteTasks,
      selectedTask,
      title,
      buttonStatus,
      completeTasks,
      iconDisplay } = this.state;

    let tasks;
    if (list.id) {
      const openPath = `/lists/${list.id}/tasks`;
      const closePath = `/lists/${list.id}`;
      tasks = this.state.incompleteTasks === "highlight" ? this.findIncompleteTasks(list.tasks) : this.findCompleteTasks(list.tasks);
      tasks = tasks.map( (task, index) => {
        return(
          <TaskItem
            task={ task }
            key={ index }
            handleSelectTask={ this.handleSelectTask }
            selectedTask={ this.state.selectedTask }
            openPath={ openPath }
            closePath={ closePath } />
          );
      });
    }
    const inputClass = this.state.title === "" ? "add-task-button inactive" : "add-task-button";
    const buttonClass = inputClass + " " + this.state.buttonStatus;
    if (tasks && tasks.length === 0) {
      tasks = ( <div className="list-mangoes">Nothing in here... get to it!</div> );
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

        <section
          className="add-task group"
          onFocus={ this.displayButton }
          onBlur={ this.undisplayButton }>

          <input
            className="task-text"
            type="text"
            value={ this.state.title }
            placeholder="Add a task..."
            onChange={ (e) => this.updateTask(e) }
            onKeyDown={ this.handleNewTask }/>

        </section>

        <section className="tasks-index">
          <ul className="tasks-list">
            { tasks }
          </ul>
        </section>

        { this.props.children }
      </main>
    );
  }
}

export default ListItem;
