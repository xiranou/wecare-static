# WeCare

### dev

`yarn`

`make run dev`

### deploy

`yarn global add firebase-tools`

`firebase login`

create an `.firebaserc` file under root and add the project name as default

`make deploy`

### withFirebase

`Firebase` container exports a HOC that passes the contextualized api and the firebase app initializing state to the wrapped component

The wrapped component should use the `firebaseInitialized` prop to avoid race conditions

Contextualized API:
```
firebase.getEmails(): Promise<string[]>;
firebase.saveEmail(email: string): Promise<void>;
```

Example useage:
```
import withFirebase from './container/Firebase';

const Mookie = withFirebase(App, env, apiKey, databaseURL);

// in App.jsx
class App extends Component {
  ...

  async mookie() {
    const emails = await this.props.getEmails();
    await this.props.saveEmail('mookie@gmail.com');
  }

  render() {
    return this.props.firebaseInitialized ? <AppStuff /> : <LoadingState />
  }
}
```

See `src/index.js` for the current setup
