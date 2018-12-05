import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from "./components/MessageList";
import User from "./components/User";
import AdminLogin from './components/AdminLogin';
import * as firebase from 'firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedAdmin: false,
      checkedGuest: false,
      checkedUser: false,
      sendKeyState: 'no key given',
      currentRoomName: 'No room selected',
      user: '',
      userList: [],
      adminStatus: false,
      canSeeSecretRooms: false,
      value: false,
      approvedUser: "",
      approvedUserKeys: [],
      approvedUserList:[],
      isTyping: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.userList = this.userList;
    this.firebaseRef = firebase;
    this.room = this.room;
    this.userRef = this.firebaseRef.database().ref();
    this.saveUser = "";
    this.userApproved = "";
  }

  componentDidMount() {
    this.userRef.child('approvedUsers').on('child_added', snapshot => {
    const approvedUserSnap = snapshot.val();
    this.setState({ approvedUserList: this.state.approvedUserList.concat( approvedUserSnap ) })
    });
}

  handleChange(e) {

  }

setUser(user){
    try{
       this.setState({ user: user.displayName });
       if(this.state.user !== "guest" || this.state.user !== "Admin" ){
         this.setState({ checkedGuest: false})
         this.setState({ checkedAdmin: false})
         this.setState({ checkedUser: true})
         for(var i = 0; i < this.state.approvedUserList.length; i++){
           if(this.state.user === this.state.approvedUserList[i]){
             this.setState({ canSeeSecretRooms: true})
           }
         }
       }
    }
    catch(err){
       this.setState({ user: "guest"});
       this.setState({ checkedGuest: true})
       this.setState({ checkedAdmin: false})
       this.setState({ checkedUser: false})
       this.setState({ canSeeSecretRooms: false})
    }
}

getName(val){
  const roomObj = val;
  const room = roomObj.roomName;
  const key = roomObj.roomKey;

  this.setState({ sendKeyState: key });
  this.setState({ currentRoomName: room });

}

setAdmin(){
  if(this.state.user !== 'Admin'){

    this.saveUser = this.state.user;

    if(this.state.adminStatus){
        this.setState({ user: "Admin"})
        this.setState({ checkedGuest: false})
        this.setState({ checkedAdmin: true})
        this.setState({ checkedUser: false})
      this.setState({ canSeeSecretRooms: true})
    }
  }
  if(this.state.user === 'Admin'){
    if(!this.state.adminStatus){
      this.setState({user: 'guest' })
      this.setState({ checkedGuest: true})
      this.setState({ checkedAdmin: false})
      this.setState({ checkedUser: false})
    this.setState({ canSeeSecretRooms: false})
    }
  }
}

getAdmin(value){
  this.setState({ adminStatus: value.loginStatus});
}

ifUser(){
  if(this.state.user === "Admin" || this.state.user === "guest"){
    return "No Users Online"
  }
  else{
    return this.state.user;
  }
}

handleSubmit(e) {
  e.preventDefault(); //stops page from rerendering
  this.roomListRef.child('rooms').push({ name: this.state.title });
  this.setState({ title: ''});
}

submitApprovedUser(e){
  e.preventDefault();
  this.userRef.child("approvedUsers").push(this.userApproved);
  this.setState({ approvedUser: this.userApproved})
}

handleApprovedUser(e){
  e.preventDefault();
  this.userApproved = e.target.value
}

isLoggedIn(){
  if(this.state.adminStatus === true){
    return <div>
            <form className="userSubmit" onSubmit={ (e) => this.submitApprovedUser(e)}>
              <input type="text" onChange={ (e) => this.handleApprovedUser(e)}/>
              <input value="Sumbit Approved User" type="Submit"/>
            </form>
          </div>
  }
}
  render() {


    return (
      <div className="App">
      {this.setAdmin()}
        <ul>
          <li>To add yourself to the secert chatrooms login as admin and above Admin Sign in type the
          name of your email so if your email is rosshopkins@ross.com you would type rosshopkins and then press submit,
          log out of admin and then log in via google email as a user and you will then see you have access to the secret
          rooms</li>
          <li>To log in as admin type "Ross Hopkins" for the username and "Acheron1" for the password</li>
        </ul>

        <h1>Bloc Chat</h1>
        <h2>current room: {this.state.currentRoomName}</h2>
        <h6>{this.state.currentRoomKey}</h6>
        <h6>{this.state.userList}</h6>
      <div className="App-Container">
        {this.isLoggedIn()}
        <AdminLogin
          sendStatus = {this.getAdmin.bind(this)}
          firebase = {this.firebaseRef}
        />
      </div>
      <div className="App-Container">
         <User
          user = {this.state.user}
          setUser = {this.setUser.bind(this)}
          firebase = {this.firebaseRef}
          sendStatus = {this.state.adminStatus}
          />
        </div>
        <div>
          <RoomList
          sendRoom={this.getName.bind(this)}
          firebase = {this.firebaseRef}
          sendStatus = {this.state.adminStatus}
          canSeeSecretRooms = {this.state.canSeeSecretRooms}
          />
        </div>
        <div className="App-Container">
          <MessageList
          userName ={this.state.user}
          sendKey={this.state.sendKeyState}
          firebase = {this.firebaseRef}
          sendStatus = {this.state.adminStatus}
          />
        </div>

        <div className="CheckboxContainer">
          <div className="Checkbox">
            <div>
            <h4> Admin </h4>
            </div>
            <div>
              is online
              <input type="checkbox" checked={this.state.checkedAdmin} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="Checkbox">
            <div>
            <h4>{this.ifUser()}</h4>
            </div>
            <div>
              is online
              <input type="checkbox" checked={this.state.checkedUser} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
          <div className="Checkbox">
            <div>
            <h4>Guest</h4>
            </div>
            <div>
              is online
              <input type="checkbox" checked={this.state.checkedGuest} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
