import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms: [],
        stations : [
          {call: 'station one', frequency: '000'},
          {call: 'station two', frequency: '001'}
        ]
      };

      this.roomsRef = firebase.database().ref().child('rooms');
      this.theRooms = [];
      this.stationArr = [];

    }

componentDidMount() {

this.roomsRef.on('child_added', snapshot => {
  const room = snapshot.val();
  room.key = snapshot.key;
  this.setState({ rooms: this.state.rooms.concat( room ) })
});

}

  render() {

const displayRooms = this.state.rooms.map(name => {
  return (
    <li>{name.name}</li>
  )
})

      return(
        <div>
          <ul>
            {displayRooms}
          </ul>
        </div>
    )
  }

}

export default RoomList;
