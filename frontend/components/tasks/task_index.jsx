import React from 'react';

class TaskIndex extends React.Component {
  constructor({ tasks, fetchTasks, newTask, editTask, removeTask }) {
    super();

  }


  render() {
    const tasks = this.props.tasks;
    return(
      <section className="task-index">

      </section>
    );
  }
}

export default TaskIndex;
