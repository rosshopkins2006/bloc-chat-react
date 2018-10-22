import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms'); //this is where I first grab the firebase array
  }

  render() {

    return (
      <div className="RoomList-Container">
        <div className="RoomList">
        </div>
      </div>
    )
  }
}
export default RoomList;
