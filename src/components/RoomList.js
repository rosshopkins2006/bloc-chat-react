import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms: []
      };

    }

    componentDidMount() {
      const rootRef = firebase.database().ref().child('rooms');
      const roomsRef = rootRef.child('3');
      const roomsRootRef = roomsRef.child('name');

      roomsRootRef.on('value', snap => {
        this.setState({
          rooms: snap.val()
        });
      });
    }

  render() {
      return(

        <div>
                <p>{this.state.rooms}</p>
        </div>

      );
    }

}

export default RoomList;
