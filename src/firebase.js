import firebase from 'firebase'
const config = {
  apiKey: $apiKey,
  authDomain: $authDomain,
  databaseURL: $databaseURL,
  projectId: $projectId,
  storageBucket: $storageBucket,
  messagingSenderId: $messagingSenderId
}

firebase.initializeApp(config)

export default firebase
