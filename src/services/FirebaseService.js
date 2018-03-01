import * as firebase from 'firebase';

export default class FirebaseService {
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
}