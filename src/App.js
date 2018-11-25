import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from "./components/MessageList";
import User from "./components/User";
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendKeyState: 'no key given',
      currentRoomName: 'No room selected',
      user: ''
    }

    this.firebaseRef = firebase;
    this.room = this.room;
  }

setUser(user){
  try{
     this.setState({ user: user.displayName });
  }
  catch(err){
     this.setState({ user: "guest"});
  }
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
        <h6>{this.state.user}</h6>
        <User
          user = {this.state.user}
          setUser = {this.setUser.bind(this)}
          firebase = {this.firebaseRef}
          />

        <div className="App-Container">

          <RoomList
            sendRoom={this.getName.bind(this)}
            firebase = {this.firebaseRef}/>
          <MessageList
          userName ={this.state.user}
          sendKey={this.state.sendKeyState}
          firebase = {this.firebaseRef}
          />
        </div>
      </div>
    );
  }
}

export default App;
