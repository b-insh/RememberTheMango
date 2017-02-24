import React from 'react';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';
import modalStyle from './modalstyle';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.toggleModal = this.toggleModal.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.createList = this.createList.bind(this);
    this.update = this.update.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.dropDownLists = this.dropDownLists.bind(this);
    this.clearSelectedList = this.clearSelectedList.bind(this);
    this.state = {
      modalOpen: false,
      title: "",
      selectedListIdx: "",
      visibleLists: "list-items pullDown visible"
    };
  }

  componentDidMount() {
    this.props.fetchLists();
  }

  toggleModal() {
    this.setState({ modalOpen: true });
  }

  onModalClose() {
    this.setState({ modalOpen: false });
  }

  toggleList(id) {
    this.setState({ selectedListIdx: id});

  }

  removeList(list) {
    const { removeTask, removeList, router } = this.props;
    list.tasks.forEach((task) => {
      removeTask(task);
    });
    removeList(list).then(() => router.push('/tasks'));
  }

  createList() {
    const { newList, fetchLists } = this.props;
    const list = Object.assign({}, this.state);
    newList(list);
    this.onModalClose();
    fetchLists();
    this.setState({ visibleLists: "list-item pullDown visible"});
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  dropDownLists() {
    if (this.state.visibleLists === "list-items pullDown invisible") {
      this.setState({ visibleLists: "list-items pullDown visible"});
    } else {
      this.setState({ visibleLists: "list-items pullDown invisible" });
    }
  }

  clearSelectedList() {
    this.setState({ selectedListIdx: "" });
  }

  render() {
  let lists = this.props.lists;
  if (lists) {
    lists = lists.map( (list) => {
      let className = this.state.selectedListIdx === list.id ? "list-highlight" : "";
      let removeButton = this.state.selectedListIdx === list.id ? (
        <span
          className="delete-list"
          onClick={ () => this.removeList(list) }>
          remove circle
          <span
            className="tooltiptext delete-list-tip">
            Delete list
          </span>
        </span>) : "";

      return (
        <Link key={ list.id } to={ `/lists/${list.id}` }>
          <li className={ `${className}` } onClick={ () => this.toggleList(list.id) }>
          { list.title }
          { removeButton }
          </li>
        </Link>
        )
      })
    }

    return(
      <section className="sidebar">
      <section className="logo"></section>
        <section className="sidebar-tasks">
          <Link to={ "/tasks" }>
            <div className="all-tasks" onClick={ this.clearSelectedList }>
              All Tasks
            </div>
          </Link>
        </section>
        <section className="sidebar-lists">
          <ul className="lists group">
            <li className="lists-header" >
              <div className="pull-down-arrow"></div>
              <span onClick={ this.dropDownLists }>Lists</span>
              <span
                className="add-list"
                onClick={ this.toggleModal }>
                add circle
                <span className="tooltiptext add-list-tip">
                  Create list
                </span>
              </span>
            </li>
            <ul className={ this.state.visibleLists }>
              { lists }
            </ul>
          </ul>
        </section>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.onModalClose }
          style={ modalStyle }
          contentLabel="Modal">

          <aside className="modal-content group">
            <input
              type="submit"
              className="close-modal"
              onClick={ this.onModalClose }
              value="X"/>
            <h3>Add a list</h3>
            <label>Please enter a new list name:
              <input className="title-input" onChange={ this.update("title")} type="text"/>
            </label>
            <input
              type="submit"
              className="add-list-button"
              onClick={ this.createList }
              value={ this.state.listTitle }
              value="Add"/>
          </aside>
        </Modal>
      </section>
    );
  }
}

export default withRouter(Sidebar);
