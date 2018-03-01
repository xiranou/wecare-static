# WeCare

dev
`yarn`
`make run dev`

deploy
`yarn global add firebase-tools`
`firebase login`
`make deploy`

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

const Mookie = withFirebase(App)

See `src/index.js` for the current setup
