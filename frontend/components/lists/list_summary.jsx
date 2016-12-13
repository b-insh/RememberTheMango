import React from 'react';

class ListSummary extends React.Component{
  constructor(props) {
    super(props);

    this.parseTimeEstimate = this.parseTimeEstimate.bind(this);
    this.incompleteTasks = this.incompleteTasks.bind(this);
    this.overdueTasks = this.overdueTasks.bind(this);

  }

  parseTimeEstimate() {
    let minutes = 0;
    this.props.list.tasks.forEach( task => {
      if (task.estimate) {
        return minutes += task.estimate;
      }
    });
    let hours = 0;
    while (minutes >= 60) {
      hours += 1;
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
    const list = this.props.list;
    let numTasks, overdueTasks, completedTasks, taskNoun, hours, minutes;
    if(list.tasks) {
      numTasks = this.incompleteTasks(list.tasks);
      overdueTasks = this.overdueTasks(list.tasks);
      completedTasks = list.tasks.length - numTasks;
      taskNoun = numTasks === 1 ? "task" : "tasks";
      [hours, minutes] = this.parseTimeEstimate();
    }

    return (
      <section className="list-detail stretchLeft">
        <h3 className="list-detail-title">
          { list.title }
        </h3>

        <div className="task-summary group">
          <div className="task-amount">
            <span className="num-tasks"><strong>{ numTasks }</strong></span>
            <span className="task-noun">{ taskNoun }</span>
          </div>

          <div className="sum-text">
            <span className="formatted-estimate">
              <strong>{ hours }</strong>
              <small>hrs</small>
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

export default ListSummary;
