import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from "./components/MessageList"
import * as firebase from 'firebase';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: '',
      currentRoomName: ''
    }

    this.firebaseRef = firebase.database().ref();
    this.room = this.room;
  }

getKey(val){
  const keyObj = val;
  const key = keyObj.roomKey;
  console.log(key);
}

getName(val){
  const roomObj = val;
  const room = roomObj.roomName;
  console.log(room);
  this.setState({ currentRoomName: room });
}

  render() {
    return (
      <div className="App">

        <h1>Bloc Chat</h1>

        <div className="App-Container">
          <RoomList
            sendKey={this.getKey}
            sendName={this.getName}
            firebaseRef = {this.firebaseRef}/>
          <MessageList
          firebaseRef = {this.firebaseRef}
          />
        </div>

      </div>
    );
  }
}

export default App;
