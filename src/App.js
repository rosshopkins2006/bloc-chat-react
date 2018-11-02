import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from "./components/MessageList"
import * as firebase from 'firebase';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendKeyState: 'no key given',
      currentRoomName: 'No room selected'
    }

    this.firebaseRef = firebase.database().ref();
    this.room = this.room;
  }

getName(val){
  const roomObj = val;
  const room = roomObj.roomName;
  const key = roomObj.roomKey;

  this.setState({ sendKeyState: key });
  this.setState({ currentRoomName: room });

}

  render() {


    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <h6>Current Room</h6>
        <h2>{this.state.currentRoomName}</h2>
        <h6>{this.state.currentRoomKey}</h6>
        <div className="App-Container">
          <RoomList
            sendRoom={this.getName.bind(this)}
            firebaseRef = {this.firebaseRef}/>
          <MessageList
          sendKey={this.state.sendKeyState}
          firebaseRef = {this.firebaseRef}
          />
        </div>

      </div>
    );
  }
}

export default App;
