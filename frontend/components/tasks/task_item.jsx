import React from 'react';

class TaskItem extends React.Component {

  render() {
    let { task, selectedTask, handleSelectTask } = this.props;
    if (selectedTask && task.id === selectedTask.id) {
        return (
          <li className="selected-task" onClick={ () => handleSelectTask(task) } key={ task.id }>
            { task.title }
          </li>
        );
    } else {
      return (
        <li onClick={ () => handleSelectTask(task) } key={ task.id }>
          { task.title }
        </li>
      );
    }
  }
}

export default TaskItem;
