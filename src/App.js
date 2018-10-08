import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';

class App extends Component {


  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <RoomList/>
      </div>
    );
  }
}

export default App;
