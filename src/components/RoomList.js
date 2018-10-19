import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {

constructor(props) {
    super(props);
      this.state = {
        rooms: [],
        testState: 0
      };

      this.roomsRef = firebase.database().ref().child('rooms');
      this.testNum = 0;
    }

componentDidMount() {

this.roomsRef.on('child_added', snapshot => {
  const room = snapshot.val();
  room.key = snapshot.key;
  this.setState({ rooms: this.state.rooms.concat( room ) });
  });
}

addRooms() {
  console.log("cloinked");
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
            {this.state.testState}
            {displayRooms}
          </ul>
        </div>
        <div className="addRoom-container">
          <button className="addRoom-button" onClick={this.addRooms}>{this.testNum}</button>
        </div>
      </section>
    )
  }

}

export default RoomList;
