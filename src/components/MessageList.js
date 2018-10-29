
import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {

  constructor(props) {
    super(props);
      this.state = {
        messages: [],
        message: '',
        roomKey: '',
        user: {
          username: 'jen',
          content: 'Hello world',
          sentAt: '2025',
          roomID: '-LPxNkQ_D8m8OWiPSqNW'
        }
      };

      this.messagesRef = firebase.database().ref().child('rooms').child('-LPxNkQ_D8m8OWiPSqNW');
    }

    whatUser(){
      console.log(this.state.user);
    }


componentDidMount() {
  this.roomKey = this.state.user.roomID;

  const messageRefValue = this.messagesRef.child(this.state.user.roomID)

  messageRefValue.on('child_added', snapshot => {
  const message = snapshot.val();

  this.setState({ messages: this.state.messages.concat( message ) })
  });
}

handleSubmit(e) {
  const firebaseRef = firebase.database().ref('rooms');
  const firebaseRoom = firebaseRef.child(this.state.user.roomID);
  e.preventDefault(); //stops page from rerendering
  firebase.database().ref().child('rooms').child(this.state.user.roomID).push({ user: this.state.user });
  this.setState({ user:
             {username: 'jen',
             content: '',
             sentAt: '2025',
             roomID: '-LPxNkQ_D8m8OWiPSqNW'
           }});
}

handleChange(e) {
  const messageContent = this.state.user.content;
  this.setState({ messageContent: e.target.value })
}

handleSubmitRoomKey(e) {
  e.preventDefault();
  this.setState({ roomKey: this.roomKey});
}

handleChangeRoomKey(e) {
  this.roomKey = e.target.value;
  this.setState({ roomKey: e.target.value })
}

componentWillUnmount() {
  this.firebaseRef.off();
}

  render() {

    const displayRooms = this.state.messages.map((name, index) => {
      return (
        <li key={index}>{name.name}</li>
      )
    })

  return(
    <section>
        <div>
        <button onClick={this.whatUser()}>whatUser()</button>
        <div>{this.state.roomKey}</div>

          <div className="Message-Container">
            <ul>          <p>{this.state.user.username}</p>
                          <p>{this.state.user.content}</p>
                          <p>{this.state.user.sentAt}</p>
                          <p>{this.state.user.roomID}</p>
            {displayRooms}
            </ul>
          </div>

          <form className="Message-Submit" onSubmit={ (e) => this.handleSubmit(e) }>
          message
            <input type="text" value={this.state.message}  onChange={ (e) => this.handleChange(e) } />
            <input type="submit"/>
          </form>

          <form className="Message-Submit" onSubmit={ (e) => this.handleSubmitRoomKey(e) }>
            roomkey
            <input type="text" value={this.state.roomKey}  onChange={ (e) => this.handleChangeRoomKey(e) } />
            <input type="submit"/>
          </form>

        </div>
      </section>
    )
  }

}

export default MessageList;
