import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase';

class App extends Component {
  componentDidMount() {
    this.initFirebase()
  }

  async initFirebase() {
    // const response = await fetch('/__/firebase/init.json');
    // const config = await response.text();
    // console.log(config);
    console.log(process.env.MOOKIE);
        
  }

  render() {
    return (
      <div className="App">
        WeCare?
      </div>
    );
  }
}

export default App;
