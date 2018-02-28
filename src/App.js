import React, { Component } from 'react';
import './App.css';

import * as firebase from 'firebase';

class App extends Component {
  componentWillMount() {
    this.initFirebase()
  }

  async initFirebase() {
    if (process.env.NODE_ENV === 'production') {
      const response = await fetch('/__/firebase/init.json');
      firebase.initializeApp(response.json());
      return;
    }

    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
    };

    firebase.initializeApp(config);
  }

  render() {
    const database = firebase.database();
    const ref = database.ref('test').once('value').then(snapshot => console.log(snapshot));
    return (
      <div className="App">
        WeCare?
      </div>
    );
  }
}

export default App;
