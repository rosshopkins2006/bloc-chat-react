import React, {Component} from "react";
import * as firebase from 'firebase';

class User extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.firebaseRef = firebase.database().ref();
  }

componentDidMount(){
  this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  })
}

SignInUser(){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );
}

SignOutUser(){
  this.props.firebase.auth().signOut();
}

  render(){
    return(
      <section>
        <div className="User-Container">
          <div className="User">
            <h6>{this.props.user.displayName}</h6>
            <button onClick={() => this.SignInUser()}>Sign In With Google</button>
            <button onClick={() => this.SignOutUser()}>Sign Out</button>
          </div>
        </div>
      </section>
    )
  }
}

export default User;
