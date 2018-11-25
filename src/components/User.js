import React, {Component} from "react";


class User extends Component {

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

SignInAdministrator(){
  
}

  render(){



    return(
      <section>
        <div className="User-Container">
          <div className="User">
            <button onClick={() => this.SignInUser()}>Sign In With Google</button>
            <button onClick={() => this.SignOutUser()}>Sign Out</button>
            <button onClick={() => this.SignInAdministrator()}>Admin Sign in</button>
          </div>
        </div>
      </section>
    )
  }
}

export default User;
