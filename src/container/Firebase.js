import React, { Component } from 'react';
import * as firebase from 'firebase';

const withFirebase = (WrappedComponent, env, apiKey, databaseURL) => {
  return class Firebase extends Component {
    constructor(props) {
      super(props);

      this.state = {
        initialized: false
      }

      this.env = env;
      this.databaseRef = env;

      this.apiKey = apiKey;
      this.databaseURL = databaseURL;

      this.setUp = this.setUp.bind(this);
      this.getEmails = this.getEmails.bind(this);
      this.saveEmail = this.saveEmail.bind(this);
    }

    get api() {
      return {
        getEmails: this.getEmails,
        saveEmail: this.saveEmail
      }
    }

    componentWillMount() {
      this.setUp();
    }

    async setUp() {
      if (this.env === 'production') {
        const response = await fetch('/__/firebase/init.json');
        const config = await response.json();
        firebase.initializeApp(config);
        await this.auth();
        this.setState({ initialized: true });
        return;
      }

      const config = {
        apiKey: this.apiKey,
        databaseURL: this.databaseURL
      };

      firebase.initializeApp(config);
      await this.auth();
      this.setState({ initialized: true })
    }

    async auth() {
      try {
        const user = await firebase.auth().signInAnonymously();
        this.user = user;
      } catch (error) {
        console.error(`Error authenticating user: ${error.message}`, error.code);
      }
    }

    async getEmails() {
      const snapshot = await firebase.database().ref(`/${this.databaseRef}`).once('value');
      const values = snapshot.val();

      if (values) {
        const emails = Object.keys(values).map((key) => values[key]);
        return emails;
      }
    }

    async saveEmail(email) {
      const id = this.user ? `${this.user.uid}-${Date.now()}` : `UUID-${Date.now()}`;

      return await firebase.database().ref(`/${this.databaseRef}`).update({
        [id]: email
      });
    }

    render() {
      return <WrappedComponent firebaseInitialized={this.state.initialized} firebase={this.api} {...this.props} />;
    }
  }
}

export default withFirebase;
