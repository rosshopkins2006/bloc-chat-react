import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms: [],
      };

      this.roomsRef = firebase.database().ref().child('rooms');
      this.addRoom = firebase.database().ref().child('rooms').child('4').push('room4');

    }

componentDidMount() {

this.roomsRef.on('child_added', snapshot => {
  const room = snapshot.val();
  room.key = snapshot.key;
  this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

addRooms() {
  return (
    this.addRoom
  )
}

  render() {

const displayRooms = this.state.rooms.map((name, index) => {
  return (
    <li key={index}>{name.name}</li>
  )
})

  return(
    <section>
        <div>
          <ul>
            {displayRooms}
          </ul>
        </div>
      </section>
    )
  }

}

export default RoomList;
