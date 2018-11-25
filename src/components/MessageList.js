
import React, { Component } from 'react';


class MessageList extends Component {

  constructor(props) {
    super(props);
      this.state = {
        keys:[],
        messages: [],
        message: '',
        messageSave:'',
        username: '',
        content: '',
        sentAt: '',
        roomID: ''
      };
      this.saveBool = false;
      this.saveMessage = 'test';
      this.editToggle = false;
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

handleMessageSubmit(a, index) {
 console.log(this.state.keys[index])
 this.messagesRef.child('messages').child(this.state.keys[index]).update({ content: this.state.messageSave });
  this.setState({ messageSave: ''});
}

handleChange(e) {
  this.setState({ message: e.target.value })
}

handleMessageChange(a) {
  this.setState({ messageSave: a.target.value })
}

deleteMessages(index) {
  if(this.state.keys !== "No Key Given")
  this.messagesRef.child('messages').child(this.state.keys[index]).remove();
  console.log(this.state.keys[index])
  window.location.reload();
}

editMessages(index, name, form){

    this.editToggle = !this.editToggle;

    if(this.saveBool === false){
      this.saveMessages = name;
    }

    if(this.editToggle===true)
    {

        let newState = Object.assign({}, this.state);
        newState.messages[index].content = form;
        this.setState(newState);

        this.saveBool = true;

        this.forceUpdate()

    }

    if(this.editToggle === false)
    {
      let newState = Object.assign({}, this.state);
      newState.messages[index].content = this.saveMessages;
      this.setState(newState);
      this.forceUpdate()
      }
}

displayEdit(index, name, form){
  if(this.editToggle === true)
  {
    return(this.state.messages[index].content);
  }
  else
  {

    return(this.state.messages[index].content);
    console.log("test")
  }
}

componentWillUnmount() {
  this.firebaseRef.off();
}

  render() {


    const displayMessages = this.state.messages.map((message, index) => {

      var indexVar = index;

      var form =
        <form className="ChangeNameForm" onSubmit={ (a) => this.handleMessageSubmit(a, indexVar) }>
          <input type="text" onChange={ (a) => this.handleMessageChange(a) } />
          <input value="Submit New Name" type="submit"/>
        </form>

      if(message.roomID === this.props.sendKey)
        {
          return (
            <li key={index}>
              {this.displayEdit(index, message.content , form)}
              <button className="edit-messages" onClick={() => this.editMessages(index, message.content, form)}>Edit</button>
              <p>-{message.username}
              <button className="delete-messages" onClick={() => this.deleteMessages(index)}>x</button></p>
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
