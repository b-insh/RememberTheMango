import React from 'react';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);
    debugger
    this.getAttributes = this.getAttributes.bind(this);
    this.defined = this.defined.bind(this);
  }

  componentDidMount() {
   this.props.fetchTaskDetail(this.props.task.taskDetail);
 }

 componentWillReceiveProps(nextProps) {
   if (this.props.task !== nextProps.task.taskDetail)
     this.props.fetchTaskDetail(nextProps.task.taskDetail);
 }

  defined(value) {
    return this.props.tag[value] !== undefined;
  }

  getAttributes() {
    const attrs = ["start_date", "due_date", "estimate", "location", "list_id", "completed"].filter (this.defined);
    return attrs.map((attr, index) => {
      <li key={ index } className={ attr }>{ attr }&nbsp;&nbsp;&nbsp;{ task[attr] }</li>
    })
  }

  render() {
    const task = this.props.task.taskDetail;
    debugger
    if(task) {
    const attributes = this.getAttributes();
      return (
        <section className="task-detail">
        <h2 className="close">close x</h2>
        <h3 className="task-name">{ task.title }</h3>
        <ul className="attributes">
        { attributes }
        </ul>
        </section>
      )
    } else {
      return null;
    }
  }
}

export default TaskDetail;
