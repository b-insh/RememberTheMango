import React from 'react';
import { Link, hashHistory } from 'react-router';

class TaskItem extends React.Component {

  render() {
    let { task, selectedTask, handleSelectTask, openPath, closePath } = this.props;
    let className = "";
    if (selectedTask && task.id === selectedTask.id) {
      className += "selected-task ";
    }
    if (task && task.completed) {
      className += "completed ";
    }

    let fullpath;
    if (hashHistory.getCurrentLocation().pathname.includes(`${task.id}`)) {
      fullpath = `${closePath}`;
    } else {
      fullpath = `${openPath}/${task.id}`;
    }

    return (
      <Link to={ fullpath }>
        <li className={ className } onClick={ () => handleSelectTask(task) } key={ task.id }>
          { task.title }
        </li>
      </Link>
    );
  }
}

export default TaskItem;
