import React from 'react';
import { Link , hashHistory } from 'react-router';
import merge from 'lodash/merge';
import moment from 'moment';

import DatePicker from 'react-datepicker';

class TaskDetail extends React.Component {
  constructor(props) {
    super(props);

    this.handleListChange = this.handleListChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.goBack = this.goBack.bind(this);
    this.update = this.update.bind(this);
    this.createLocationMap = this.createLocationMap.bind(this);
    this.state = { title: "", location: "", google_location: "", start_date: "", due_date: "", estimate: "", list_id: ""};
  }

  componentDidMount() {
    this.props.fetchTaskDetail(this.props.params.taskId).then(() => {
      this.setState({ title: this.props.task.title, location: this.props.task.location, google_location: this.props.task.google_location, start_date: this.props.task.start_date, due_date: this.props.task.due_date, estimate: this.props.task.estimate, list_id: this.props.task.list_id });
    }).then(() => {
      this.createLocationMap();
    });
 }

 componentDidUpdate(prevProps) {
  if (prevProps.params.taskId !== this.props.params.taskId) {
      this.props.fetchTaskDetail(this.props.params.taskId).then(() => {
        this.setState({ title: this.props.task.title, location: this.props.task.location, google_location: this.props.task.google_location, start_date: this.props.task.start_date, due_date: this.props.task.due_date, estimate: this.props.task.estimate, list_id: this.props.task.list_id });
      }).then(() => {
        this.createLocationMap();
      });
    }
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  updateTask() {
    const updatedTask = merge({}, this.props.task, this.state);
    this.props.editTask(updatedTask)
      .then(() => {
        this.props.fetchTaskDetail(this.props.params.taskId);
      })
      .then(() => {
        this.props.fetchList(this.props.task.list_id);
      });
  }

  handleListChange(e) {
    this.setState({list_id: e.target.value});
  }


  handleDateChange(type) {
		return (date) => {
			this.setState({ [type]: date._d }, () => {
        this.props.editTask({
          id: this.props.task.id,
          [type]: this.state[type]
        });
      });
		};
	}

  getLists() {
		return (
			this.props.lists.map(list => <option key={list.id} value={list.id}>{list.title}</option>)
		)
  }

  goBack() {
    let location = hashHistory.getCurrentLocation().pathname;
    if (this.props.location.pathname.includes("lists") || this.props.location.pathname.includes("search")) {
      location = location.slice(0, location.indexOf("/tasks"));
    }
    else {
      location = location.slice(0, location.indexOf(`/${this.props.task.id}`));
    }
    hashHistory.push(location);
  }

  createLocationMap() {
    let mapOptions = {
      center: { lat: 40.7128, lng: -74.0059 },
      zoom: 12
    }
    if (this.state.google_location) {
      if (this.state.google_location.length !== 0) {
        mapOptions = {
          center: {
            lat: JSON.parse(this.state.google_location).location.lat,
            lng: JSON.parse(this.state.google_location).location.lng },
            zoom: 18
          }
        }
      }

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    if (this.state.google_location) {
      new google.maps.Marker({
        map: map,
        icon: 'https://s28.postimg.org/iph3cpxod/map_icon.png',
        position: JSON.parse(this.state.google_location).location
      })
    }

    let locInput = document.getElementById('loc-input');
    const searchLoc = new google.maps.places.SearchBox(locInput);

    map.addListener('bounds_changed', () => {
      searchLoc.setBounds(map.getBounds());
    });

    let markers = [];
    searchLoc.addListener('places_changed', () => {
      let location = searchLoc.getPlaces();
      if (location.length === 0 ) return;

      markers.forEach( marker => {
        marker.setMap(null);
      });
      markers = [];

    let bounds = new google.maps.LatLngBounds();
    location.forEach( loc => {
      markers.push(new google.maps.Marker({
        map: map,
        icon: 'https://s28.postimg.org/iph3cpxod/map_icon.png',
        title: loc.name,
        position: loc.geometry.location
      }))

      if (loc.geometry.viewport) {
        bounds.union(loc.geometry.viewport);
      } else {
        bounds.extend(loc.geometry.location)
      }
    });
    this.setState({ google_location: JSON.stringify(location[0].geometry) });
    this.setState({ location: location[0].name})
    map.fitBounds(bounds);
    map.setZoom(18);
  });
}

  render() {
    const task = this.props.task;
    if (task) {
      return (
        <section className="task-detail group stretchLeft">
          <ul className="detail-top group">
            <li>
              <div className="close" onClick={ this.goBack }>close x</div>
            </li>
            <li>
              <textarea value={ this.state.title } className="task-name" onChange={ this.update("title")} />
            </li>
          </ul>
            <div>
		            <span className="attr-name">start</span>
		            <DatePicker
		              className="task-input datepicker"
		              onChange={ this.handleDateChange("start_date") }
		              isClearable={ true }
		              placeholderText="No Start Date"
		              selected={ this.state.start_date ? moment(this.state.start_date) : "" } />
		          </div>
              <div>
		            <span className="attr-name">due</span>
		            <DatePicker
		              className="task-input datepicker"
		              onChange={ this.handleDateChange("due_date") }
		              isClearable={true}
		              placeholderText="No Due Date"
		              selected={ this.state.due_date ? moment(this.state.due_date) : "" } />
		          </div>
              <div>
		            <span className="attr-name">estimate</span>
		            <input
		              className="task-input estimate"
		              onChange={ this.update("estimate") }
		              type="number" min="0"
		              value={ this.state.estimate } />minutes
		          </div>
              <div>
                <span className="attr-name">location</span>
                <input
                  id="loc-input"
                  className="task-input location"
                  onChange={ this.update("location") }
                  type="text"
                  value={ this.state.location ? this.state.location : "" }
                  placeholder="Add Location"/>
              </div>
            <span className="attr-name">list</span>
            <select className="task-input list-name-dropdown" value={ this.state.list_id } onChange={ this.handleListChange }>
              <option value={ "" }>No List</option>
              { this.getLists() }
            </select>
            <input type="submit" className="update-task" value="Update" onClick={ this.updateTask }/>
            <div id="map"></div>
          {this.props.children}
        </section>
      )
    } else {
      return null;
    }
  }
}

export default TaskDetail;
