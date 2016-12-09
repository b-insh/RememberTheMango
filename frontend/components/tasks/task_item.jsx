import React from 'react';

class TaskItem extends React.Component {

  render() {
    let { task, selectedTask, handleSelectTask } = this.props;

    let className = "";
    let completed = "hidden";
    if (selectedTask && task.id === selectedTask.id) {
      className += "selected-task ";
    }
    if (task && task.completed) {
      completed = "completed";
    }

    return (
      <li className={ className } onClick={ () => handleSelectTask(task) } key={ task.id }>
        <span className={ completed }>stars</span>
        { task.title }
      </li>
    );
  }
}

export default TaskItem;
