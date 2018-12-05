import React, {Component} from "react";
import Popup from "reactjs-popup";


class AdminLogin extends Component {
    constructor(props) {
      super(props);
      this.state = {
          admin: {userName:"RossHopkins", passWord:"Acheron1"},
          isLoggedin: false,
          adminStatus: "Admin is not logged in",
          adminKey: ""
      }
      this.firebaseRef = this.props.firebase.database().ref();
      this.enterPassword = this.enterPassword;
      this.enterUsername = this.enterUsername;
}

componentDidMount() {
  this.firebaseRef.child('Admin').on('child_added', snapshot => {
  const adminConst = snapshot.val();
  this.setState({ adminKey: adminConst});
  });
}

Login(e){
  e.preventDefault();

if(this.enterPassword === this.state.admin.passWord && this.enterUsername === this.state.admin.userName)
{
  this.setState({isLoggedin: true});
  this.loginStatus(true);

  this.setState({adminStatus: "Admin is logged in"});
}

}
Logout(e){
  this.setState({isLoggedin: false});
  this.loginStatus(false);

  this.setState({adminState: "Admin is not logged in"});
  this.enterPassword = "";
}

handleUsername(e){
  e.preventDefault();
  this.enterUsername = e.target.value;
}
handlePassword(e){
  e.preventDefault();
  this.enterPassword = e.target.value;
}

loginStatus(value) {
  this.props.sendStatus({ loginStatus: value})
}

isSignedIn(){
  if(this.props.sendStatus === true){
    return "Sign Out";
  }
  else if( this.props.sendStatus === false)
  {
    return "Admin Sign In";
  }
}

render(){

  const Modal =  () => (
    <Popup
      trigger={
        <button className="button">Admin Sign in</button>
    }
      modal
      closeOnDocumentClick
    >
      <span>
        <form className="AdminLogin" onSubmit={(e) => this.Login(e)}>
        <div>
          <input type='text' onChange={ (e) => this.handleUsername(e)}/>
        </div>
        <div>
          <input type="text" onChange={ (e) => this.handlePassword(e)}/>
        </div>
          <input value="Enter Admin Password" type="submit"/>
        </form>
        <button className="logOut" onClick={ (e) => this.Logout(e)}>Logout</button>
      </span>
    </Popup>
  )

  return(
    <div>
      <Modal />
    </div>
  )
}

}

export default AdminLogin;
