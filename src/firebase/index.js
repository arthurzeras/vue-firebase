// Plugin to load firebase credentials to your app
// https://firebase.google.com/docs/web/setup

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  // VUE_APP_* are the vue-cli environment variables,
  // you must duplicate '.env.local.example' file and set up
  // your own data provided by firebase and save as .env.local
  // https://cli.vuejs.org/guide/mode-and-env.html#example-staging-mode

  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
})

// Create a firebase plugin. With this we are able to do
// something like this.$firebase.auth() inside our components
// https://vuejs.org/v2/guide/plugins.html
export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get () {
      return firebaseApp
    }
  })
}
