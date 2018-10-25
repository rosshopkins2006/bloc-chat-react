
import React, { Component } from 'react';
import * as firebase from 'firebase';

class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rooms: [],
        title: ''
      };

      this.roomsRef = firebase.database().ref().child('rooms');
    }

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
  const room = snapshot.val();
  room.key = snapshot.key;
  this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

handleSubmit(e) {
  const firebaseRef = firebase.database().ref('rooms');
  e.preventDefault(); //stops page from rerendering
  firebase.database().ref().child('rooms').push({ name: this.state.title });
  this.roomCount++;
  this.setState({ title: '' });
}

handleChange(e) {
  this.setState({ title: e.target.value })
}

componentWillUnmount() {
  this.firebaseRef.off();
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
          <div className="Rooms-Container">
            <ul>
              {displayRooms}
            </ul>
          </div>
          <form className="NewTodoForm" onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" value={this.state.title}  onChange={ (e) => this.handleChange(e) } />
            <input type="submit"/>
          </form>
        </div>
      </section>
    )
  }

}

export default RoomList;
