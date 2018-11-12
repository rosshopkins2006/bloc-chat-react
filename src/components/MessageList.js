
import React, { Component } from 'react';


class MessageList extends Component {

  constructor(props) {
    super(props);
      this.state = {
        keys:[],
        messages: [],
        message: '',
        username: '',
        content: '',
        sentAt: '',
        roomID: ''
      };

      this.messagesRef = this.props.firebase.database().ref();
    }

componentDidMount() {
  this.messagesRef.child('messages').on('child_added', snapshot => {
  const messageConst = snapshot.val();
  messageConst.key = snapshot.key;
  this.setState({ keys: this.state.keys.concat( messageConst.key ) })
  this.setState({ messages: this.state.messages.concat( messageConst ) })
  });
}

handleSubmit(e) {
  console.log(this.messagesRef)
  this.setState({ message: ''});
  this.setState({ username: this.props.userName });
  this.setState({ content: this.state.message, });
  this.setState({ sentAt: '2025', });
  this.setState({ roomID: this.props.sendKey });
  this.messagesRef.child('messages').push({
            username: this.props.userName,
            content: this.state.message,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomID: this.props.sendKey
          });
  e.preventDefault(); //stops page from rerendering
}

handleChange(e) {
  this.setState({ message: e.target.value })
}

deleteMessages(index) {
  if(this.state.keys !== "No Key Given")
  this.messagesRef.child('messages').child(this.state.keys[index]).remove();
  console.log(this.state.keys[index])
  window.location.reload();
}

editMessages(){
  console.log('test');
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
            {message.content}<button className="delete-messages" onClick={() => this.editMessages(index)}>Edit</button>
            <p>- {message.username}<button className="delete-messages" onClick={() => this.deleteMessages(index)}>x</button></p>

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
