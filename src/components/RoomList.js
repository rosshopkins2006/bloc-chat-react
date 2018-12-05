
import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        keys: [],
        secretKeys: [],
        rooms: [],
        secretRooms: [],
        title: '',
        titleSave: '',
        activeRoom: '',
        adminStatus: false
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

  this.roomListRef.child('secretRooms').on('child_added', snapshot => {
  const room = snapshot.val();
  room.key = snapshot.key;
  this.setState({ secretKeys: this.state.secretKeys.concat( room.key ) })
  this.setState({ secretRooms: this.state.secretRooms.concat( room ) })
  });
}


handleSubmit(e) {
  e.preventDefault(); //stops page from rerendering
  this.roomListRef.child('rooms').push({ name: this.state.title });
  this.setState({ title: ''});
}

handleSecretSubmit(e) {
  e.preventDefault(); //stops page from rerendering
  this.roomListRef.child('secretRooms').push({ name: this.state.title });
  this.setState({ title: ''});
}

handleNameSubmit(a, index) {
  this.roomListRef.child('rooms').child(this.state.keys[index]).update({ name: this.state.titleSave });
  this.setState({ titleSave: ''});
}

handleSecretNameSubmit(a, index) {
  this.roomListRef.child('secretRooms').child(this.state.secretKeys[index]).update({ name: this.state.titleSave });
  this.setState({ titleSave: ''});
}

handleChange(e) {
  this.setState({ title: e.target.value })
}

handleNameChange(a) {
  this.setState({ titleSave: a.target.value })
}

activeRoom(index) {
  this.props.sendRoom({ roomName: this.state.rooms[index].name,
                        roomKey: this.state.keys[index]})
}

activeSecretRoom(index) {
  this.props.sendRoom({ roomName: this.state.secretRooms[index].name,
                        roomKey: this.state.secretKeys[index]})
}

deleteRoom(index){
    this.roomListRef.child('rooms').child(this.state.keys[index]).remove();

  window.location.reload();
}

deleteSecretRoom(index){
    this.roomListRef.child('secretRooms').child(this.state.secretKeys[index]).remove();

  window.location.reload();
}

editRoom(index, name, form){
    this.editToggle = !this.editToggle;

    if(this.saveBool === false){
      this.saveName = name;
    }

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
      let newState = Object.assign({}, this.state);
      newState.rooms[index].name = this.saveName;
      this.setState(newState);
      this.forceUpdate()
      }

    this.props.sendRoom({ roomName: this.state.rooms[index].name,
                          roomKey: this.state.keys[index]})
}

editSecretRoom(index, name, form){
    this.editToggle = !this.editToggle;

    if(this.saveBool === false){
      this.saveName = name;
    }

    if(this.editToggle===true)
    {

        let newState = Object.assign({}, this.state);
        newState.secretRooms[index].name = form;
        this.setState(newState);

        this.saveBool = true;

        this.forceUpdate()

    }

    if(this.editToggle === false)
    {
      let newState = Object.assign({}, this.state);
      newState.secretRooms[index].name = this.saveName;
      this.setState(newState);
      this.forceUpdate()
      }

    this.props.sendRoom({ roomName: this.state.secretRooms[index].name,
                          roomKey: this.state.secretKeys[index]})
}

displayEdit(index, name, form){
  if(this.editToggle === true)
  {
    return(this.state.rooms[index].name);
  }
  else
  {
    return(this.state.rooms[index].name);
  }
}

displaySecretEdit(index, name, form){
  if(this.editToggle === true)
  {
    return(this.state.secretRooms[index].name);
  }
  else
  {
    return(this.state.secretRooms[index].name);
  }
}

IsLoggedIn(){
  if(this.props.sendStatus === true){
      return     <form className="NewRoomForm" onSubmit={ (e) => this.handleSecretSubmit(e) }>
                  <p>Create Secret Rooms Here as administrator</p>
                  <input type="text" value={this.state.title}  onChange={ (e) => this.handleChange(e) } />
                  <input type="submit"/>
                </form>;
    }
  else if(this.props.sendStatus === false)
    {
      return <h4>Chatrooms Available</h4>
    }
}


componentWillUnmount() {
  this.firebaseRef.off();
}

  render() {

const displayRooms = this.state.rooms.map((name, index) => {

  var indexVar = index;

  var form =
    <form className="ChangeNameForm" onSubmit={ (a) => this.handleNameSubmit(a, indexVar) }>
      <input type="text" onChange={ (a) => this.handleNameChange(a) } />
      <input value="Submit New Name" type="submit"/>
    </form>

  return (
    <li key={index}>
      <button onClick={ () => this.activeRoom(index) }>{this.displayEdit(index, name.name , form)}</button>
      <button className="delete-room" onClick={() => this.deleteRoom(index)}>x</button>
      <button className="edit-room" onClick={() => this.editRoom(index, name.name, form)}>edit</button>
    </li>
  )
})

const displaySecretRooms = this.state.secretRooms.map((name, index) => {
if(this.props.canSeeSecretRooms === true) {
  var indexVar = index;

  var form =
    <form className="ChangeNameForm" onSubmit={ (a) => this.handleSecretNameSubmit(a, indexVar) }>
      <input type="text" onChange={ (a) => this.handleNameChange(a) } />
      <input value="Submit New Name" type="submit"/>
    </form>

  return (
    <li key={index}>
      <button onClick={ () => this.activeSecretRoom(index) }>{this.displaySecretEdit(index, name.name , form)}</button>
      <button className="delete-room" onClick={() => this.deleteSecretRoom(index)}>x</button>
      <button className="edit-room" onClick={() => this.editSecretRoom(index, name.name, form)}>edit</button>
    </li>
  )
}
else {
  return null;
}

})

  return(
    <section className="Rooms">
        <div>
          <div>
            {this.IsLoggedIn()}
          </div>
          <div className="Rooms-Container">
            <ul>
              {displayRooms}
            </ul>
            <ul>
              {displaySecretRooms}
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
