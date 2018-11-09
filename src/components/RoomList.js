
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
      this.editToggle = true;
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
    this.roomListRef.child('rooms').child(this.state.keys[index]).remove();
  }
  window.location.reload();
}

editRoom(index){
    this.editToggle = !this.editToggle;
  console.log(this.state.rooms[index].name);
}

componentWillUnmount() {
  this.firebaseRef.off();
}

toggleRoomDisplay(e){

}

displayEdit(name, form){
  if(this.editToggle==true)
  {
    return(form);
  }
  else
  {
    return(name);
  }
}

  render() {

const form =
  <form className="NewTodoForm" onSubmit={ (e) => this.handleSubmit(e) }>
    <input type="text" value={this.state.title}  onChange={ (e) => this.handleChange(e) } />
    <input type="submit"/>
  </form>

const displayRooms = this.state.rooms.map((name, index) => {
  return (
    <li key={index}>
      <button onClick={ () => this.activeRoom(index) }>{this.displayEdit(name.name , form)}</button>
      <button className="delete-room" onClick={() => this.deleteRoom(index)}>x</button>
      <button className="edit-room" onClick={() => this.editRoom(index)}>edit</button>
    </li>
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
