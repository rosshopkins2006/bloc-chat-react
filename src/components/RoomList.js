
import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        keys: [],
        rooms: [],
        title: '',
        activeRoom: ''
      };

      this.roomListRef= this.props.firebase.database().ref();
    }

componentDidMount() {
  this.roomListRef.child('rooms').on('child_added', snapshot => {
  const room = snapshot.val();
  room.key = snapshot.key;
  this.setState({ keys: this.state.keys.concat( room.key ) })
  this.setState({ rooms: this.state.rooms.concat( room ) })
  });
}

handleSubmit(e) {
  e.preventDefault(); //stops page from rerendering
  this.roomListRef.child('rooms').push({ name: this.state.title });
  this.roomCount++;
  this.setState({ title: ''});
}

handleChange(e) {
  this.setState({ title: e.target.value })
}

activeRoom(index) {
  console.log("");
  this.props.sendRoom({ roomName: this.state.rooms[index].name,
                        roomKey: this.state.keys[index]})
}

deleteRoom(index){
  if(this.state.sendKeyState != 'no key given'){
      console.log(this.state.keys[index]);
  }
  else{
    console.log("works?");
  }
}

componentWillUnmount() {
  this.firebaseRef.off();
}

  render() {

const displayRooms = this.state.rooms.map((name, index) => {
  return (
    <li key={index}> <button onClick={ () => this.activeRoom(index) }>{name.name}</button><button className="delete-room" onClick={() => this.deleteRoom(index)}>x</button></li>
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
