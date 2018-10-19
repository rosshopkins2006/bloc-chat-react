import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';

class App extends Component {

  constructor (props){
    super(props);
      this.states = {
        ClickedState: ""
      }
  }

clicked () {
  this.SetState({ ClickedState: "Clicked" });
  console.log("You clicked");
}
  render() {
    return (
      <div className="App">
        <h1>Bloc Chat</h1>
        <RoomList/>
        <div>
          <button onClick={this.clicked}>click me</button>
          {this.ClickedState}
        </div>
      </div>
    );
  }
}

export default App;
