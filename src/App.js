import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from "./components/MessageList"

import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">

        <h1>Bloc Chat</h1>

        <div className="App-Container">
          <RoomList/>
          <MessageList/>
        </div>

      </div>
    );
  }
}

export default App;
