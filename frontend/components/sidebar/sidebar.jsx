import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
import modalStyle from './modalstyle';

class Sidebar extends React.Component {
  constructor() {
    super();

    this.toggleModal = this.toggleModal.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.createList = this.createList.bind(this);
    this.update = this.update.bind(this);
    this.state = { modalOpen: false, title: "", selectedListIdx: ""};
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

  createList() {
    const list = Object.assign({}, this.state);
    this.props.newList(list);
    this.onModalClose();
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  render() {

    const lists = this.props.lists.map( (list, index) => {
      let className = this.state.selectedListIdx === list.id ? "list-highlight" : "";
      return (
        <Link to={ `/lists/${list.id}` }>
          <li key={ index } className={ `${className}` } onClick={ () => this.toggleList(list.id) }>
            { list.title }
          </li>
        </Link>
      )
    })

    return(
      <section className="sidebar">
        <section className="sidebar-tasks">
          <Link to={ "/tasks" }><p>All Tasks</p></Link>
          <p>Today</p>
        </section>
        <section className="sidebar-lists">
          <ul className="lists group">
            <li className="lists-header">
              Lists
              <span className="add-list" onClick={ this.toggleModal }>add circle</span>
            </li>
            <ul className="list-items">
            { lists }
            </ul>
          </ul>
        </section>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.onModalClose }
          style={ modalStyle }>

          <aside className="modal-content group">
            <input type="submit" className="close-modal" onClick={ this.onModalClose } value="X"/>
            <h3>Add a list</h3>
            <label>Please enter a new list name:
              <input className="title-input" onChange={ this.update("title")} type="text"/>
            </label>
            <input type="submit" className="add-list-button" onClick={ this.createList } value={ this.state.listTitle } value="Add"/>
          </aside>

        </Modal>
      </section>
    );
  }
}

export default Sidebar;
