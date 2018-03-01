import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import withFirebase from './container/Firebase';

const Root = withFirebase(App, process.env.NODE_ENV, process.env.REACT_APP_FIREBASE_API_KEY, process.env.REACT_APP_FIREBASE_DATABASE_URL);

ReactDOM.render(
  <Root/>, 
  document.getElementById('root')
);
registerServiceWorker();

