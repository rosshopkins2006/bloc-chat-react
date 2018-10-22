import React, { Component } from 'react';
import RoomList from "./components/RoomList";
import './App.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC9bW7syVO4ZEKu0vweYTPCKwWMEZEMafI",
  authDomain: "bloc-chat-react-d52a0.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-d52a0.firebaseio.com",
  projectId: "bloc-chat-react-d52a0",
  storageBucket: "bloc-chat-react-d52a0.appspot.com",
  messagingSenderId: "164935147836"
};
firebase.initializeApp(config);

class App extends Component {
  render() {

    return (
      <div className="App-Container">
        <div className="App">
          <RoomList/>
        </div>
      </div>
    )
  }
}

export default App;
