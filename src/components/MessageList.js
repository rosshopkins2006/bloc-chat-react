
import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {

  constructor(props) {
    super(props);
      this.state = {
        keys: [],
        messages: [],
        message: '',
        roomKey: '',
        username: 'jen',
        content: '',
        sentAt: '2025',
        roomID: '-LPxNkQ_D8m8OWiPSqNW'
      };

      this.messagesRef = firebase.database().ref().child('messages');
    }

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
  const messageConst = snapshot.val();
  messageConst.key = snapshot.key;
  this.setState({ keys: this.state.keys.concat( messageConst.key ) })
  this.setState({ messagess: this.state.messages.concat( messageConst ) })
  });
}

handleSubmit(e) {
  this.setState({ message: ''});
  this.setState({ username: 'jen', });
  this.setState({ content: this.state.message, });
  this.setState({ sentAt: '2025', });
  this.setState({ roomID: '-LPxNkQ_D8m8OWiPSqNW' });
  firebase.database().ref().child('messages').push({
            username: 'jen',
            content: this.state.message,
            sentAt: '2025',
            roomID: '-LPxNkQ_D8m8OWiPSqNW'
          });
  e.preventDefault(); //stops page from rerendering
}

handleChange(e) {
  this.setState({ message: e.target.value })
}

componentWillUnmount() {
  this.firebaseRef.off();
}

  render() {

    const displayMessages = this.state.messages.map((name, index) => {
      return (
        <li key={index}>{name.name}</li>
      )
    })

  return(
    <section>
        <div>
        <div>{this.state.roomKey}</div>
          <div className="Message-Container">
            <ul>
            {displayMessages}
            </ul>
          </div>

          <form className="Message-Submit" onSubmit={ (e) => this.handleSubmit(e) }>
          message
            <input type="text" value={this.state.message}  onChange={ (e) => this.handleChange(e) } />
            <input type="submit"/>
          </form>

        </div>
      </section>
    )
  }

}

export default MessageList;
