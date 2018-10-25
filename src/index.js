import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC9bW7syVO4ZEKu0vweYTPCKwWMEZEMafI",
  authDomain: "bloc-chat-react-d52a0.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-d52a0.firebaseio.com",
  projectId: "bloc-chat-react-d52a0",
  storageBucket: "bloc-chat-react-d52a0.appspot.com",
  messagingSenderId: "164935147836"
};
firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
