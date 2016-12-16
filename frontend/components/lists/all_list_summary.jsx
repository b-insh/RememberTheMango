import React from 'react';
import values from 'lodash/values';

class AllListSummary extends React.Component{
  constructor(props) {
    super(props);

    this.parseTimeEstimate = this.parseTimeEstimate.bind(this);
    this.incompleteTasks = this.incompleteTasks.bind(this);
    this.overdueTasks = this.overdueTasks.bind(this);
  }

  // getAllTasks(lists) {
  //   let allTasks = [];
  //   let allLists = values(lists);
  //   allLists.forEach( list => list.tasks.forEach( task => allTasks.push(task)));
  //   return allTasks;
  // }

  componentDidMount() {
    this.props.fetchTasks();
  }

  parseTimeEstimate(tasks) {
    let minutes = 0;
    tasks.forEach( task => {
      if (!task.completed && task.estimate) {
        return minutes += task.estimate;
      }
    });
    let hours = 0;
    while (minutes >= 60) {
      hours ++;
      minutes -= 60;
    }
    return [hours, minutes];
  }

  overdueTasks(tasks) {
    let overdue = 0;
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    Object.keys(tasks).map(id => tasks[id].due_date).forEach(dueDate => {
      if (dueDate && currentDate > new Date(dueDate).setHours(24,0,0,0)) {
        overdue++;
      }
    });
    return overdue;
  }

  incompleteTasks(tasks) {
    let incomplete = 0;
    Object.keys(tasks).map(id => tasks[id]).forEach( task => {
      if (!task.completed) {
        incomplete++;
      }
    });
    return incomplete;
  }

  render() {
    const tasks = this.props.tasks;
    let numTasks, overdueTasks, completedTasks, taskNoun, hours, minutes;
    if(tasks) {
      numTasks = this.incompleteTasks(tasks);
      overdueTasks = this.overdueTasks(tasks);
      completedTasks = tasks.length - numTasks;
      taskNoun = numTasks === 1 ? "task" : "tasks";
      [hours, minutes] = this.parseTimeEstimate(tasks);
    }

    return (
      <section className="list-detail">
      <h3 className="list-detail-title">
      All Tasks
      </h3>

      <div className="task-summary group">
        <div className="task-amount">
          <span className="num-tasks"><strong>{ numTasks }</strong></span>
          <span className="task-noun">{ taskNoun }</span>
        </div>

        <div className="sum-text">
          <span className="formatted-estimate">
            <strong>{ hours }</strong>
            <small>hrs</small>&nbsp;
            <strong>{ minutes }</strong>
            <small>min</small>
          </span>
          <span className="estimate-word">estimated</span>
        </div>
      </div>
      <div className="overdue-completed">
        <div className="overdue-tasks">
          <span className="overdue-num"><strong>{ overdueTasks }</strong></span>
          <span className="overdue-text">overdue</span>
        </div>

        <div className="completed-tasks">
          <span className="completed-num"><strong>{ completedTasks }</strong></span>
          <span className="completed-text">completed</span>
        </div>
      </div>
      { this.props.children}
      </section>
    );
  }
}

export default AllListSummary;
