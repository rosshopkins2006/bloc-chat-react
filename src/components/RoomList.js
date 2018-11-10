
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
      this.editToggle = false;
      this.saveName = 'test';
      this.saveBool = false;
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
  this.setState({ title: ''});
}

handleNameSubmit(e) {
  e.preventDefault(); //stops page from rerendering
  this.roomListRef.child('rooms').push({ name: this.state.title });
  this.setState({ title: ''});
}

handleChange(e) {
  this.setState({ title: e.target.value })
}

handleNameChange(e) {
  this.setState({ title: e.target.value })
}

activeRoom(index) {
  this.props.sendRoom({ roomName: this.state.rooms[index].name,
                        roomKey: this.state.keys[index]})
}

deleteRoom(index){
  if(this.state.sendKeyState !== 'no key given'){
    this.roomListRef.child('rooms').child(this.state.keys[index]).remove();
  }
  window.location.reload();
}

editRoom(index, name, form){
    this.editToggle = !this.editToggle;

    if(this.saveBool === false){
      this.saveName = name;
    }

    console.log(this.saveName);

    if(this.editToggle===true)
    {

        let newState = Object.assign({}, this.state);
        newState.rooms[index].name = form;
        this.setState(newState);

        this.saveBool = true;

        this.forceUpdate()

    }

    if(this.editToggle === false)
    {
      this.state.rooms[index].name = this.saveName;
    }
    this.props.sendRoom({ roomName: this.state.rooms[index].name,
                          roomKey: this.state.keys[index]})

}

displayEdit(index, name, form){
  if(this.editToggle==true)
  {
    return(this.state.rooms[index].name);
  }
  else
  {

    return(this.state.rooms[index].name);
    console.log("test")
  }
}

componentWillUnmount() {
  this.firebaseRef.off();
}



  render() {

const form =
  <form className="ChangeNameForm" onSubmit={ (e) => this.handleNameSubmit(e) }>
    <input type="text" value={this.state.title}  onChange={ (e) => this.handleNameChange(e) } />
    <input value="Submit New Name" type="submit"/>
  </form>

const displayRooms = this.state.rooms.map((name, index) => {

  return (
    <li key={index}>
      <button onClick={ () => this.activeRoom(index) }>{this.displayEdit(index, name.name , form)}</button>
      <button className="delete-room" onClick={() => this.deleteRoom(index)}>x</button>
      <button className="edit-room" onClick={() => this.editRoom(index, name.name, form)}>edit</button>
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
          <form className="NewRoomForm" onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" value={this.state.title}  onChange={ (e) => this.handleChange(e) } />
            <input type="submit"/>
          </form>
        </div>
      </section>
    )
  }

}

export default RoomList;
