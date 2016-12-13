import React from 'react';
import { Link } from 'react-router';

class TaskItem extends React.Component {

  render() {
    let { task, selectedTask, handleSelectTask, path } = this.props;
    let className = "";
    if (selectedTask && task.id === selectedTask.id) {
      className += "selected-task ";
    }
    if (task && task.completed) {
      className += "completed ";
    }
    if (path === undefined) {
      path = "/tasks";
    }
    return (
      <Link to={ `${path}/${task.id}` }>
        <li className={ className } onClick={ () => handleSelectTask(task) } key={ task.id }>
          { task.title }
        </li>
      </Link>
    );
  }
}

export default TaskItem;
