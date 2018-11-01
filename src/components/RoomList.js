
import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        keys: [],
        rooms: [],
        title: '',
        activeRoom: ''
      };

      this.roomsRef = this.props.firebaseRef.child('rooms');
    }

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
  const room = snapshot.val();
  room.key = snapshot.key;
  this.setState({ keys: this.state.keys.concat( room.key ) })
  this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

handleSubmit(e) {
  e.preventDefault(); //stops page from rerendering
  firebase.database().ref().child('rooms').push({ name: this.state.title });
  this.roomCount++;
  this.setState({ title: ''});
}

handleChange(e) {
  this.setState({ title: e.target.value })
}

activeRoom(index) {
  this.props.sendKey({ roomKey: this.state.keys[index]})
  this.props.sendName({ roomName: this.state.rooms[index].name })
  this.setState({ activeRoom: this.state.keys[index]})
}

componentWillUnmount() {
  this.firebaseRef.off();
}

  render() {



const displayRooms = this.state.rooms.map((name, index) => {
  return (
    <li key={index}> <button onClick={ () => this.activeRoom(index) }>{name.name}</button></li>
  )
})

  return(
    <section>
        <div>
          <div className="Rooms-Container">
            <ul>
              {displayRooms}
            </ul>
          </div>
          <form className="NewTodoForm" onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" value={this.state.title}  onChange={ (e) => this.handleChange(e) } />
            <input type="submit"/>
          </form>
        </div>
      </section>
    )
  }

}

export default RoomList;
