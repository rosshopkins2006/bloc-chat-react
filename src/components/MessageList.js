
import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {

  constructor(props) {
    super(props);
      this.state = {
        messages: [],
        message: '',
        username: 'jen',
        content: '',
        sentAt: '',
        roomID: ''
      };

      this.messagesRef = this.props.firebase.database().ref().child('messages');
    }

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
  const messageConst = snapshot.val();
  messageConst.key = snapshot.key;
  this.setState({ messages: this.state.messages.concat( messageConst ) })
  });
}

handleSubmit(e) {
  this.setState({ message: ''});
  this.setState({ username: this.props.userName });
  this.setState({ content: this.state.message, });
  this.setState({ sentAt: '2025', });
  this.setState({ roomID: this.props.sendKey });
  firebase.database().ref().child('messages').push({
            username: this.props.userName,
            content: this.state.message,
            sentAt: firebase.database.ServerValue.TIMESTAMP,
            roomID: this.props.sendKey
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

    const displayMessages = this.state.messages.map((message, index) => {
      if(message.roomID === this.props.sendKey)
        {
          return (
            <li key={index}>
            {message.content}
            <p>- {message.username}</p>

            </li>
          )
        }
    })

  return(
    <section>
        <div>

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
