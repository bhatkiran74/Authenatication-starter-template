import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyCOGpULMbUZndS6uu87A8wn7Jmr7UYsR8Y",
    authDomain: "mart-28d8b.firebaseapp.com",
    projectId: "mart-28d8b",
    storageBucket: "mart-28d8b.appspot.com",
    messagingSenderId: "741020716979",
    appId: "1:741020716979:web:c35cae87c389fbf6ed05c6"
};


firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const faceAuthProvider = new firebase.auth.FacebookAuthProvider()



export { auth, googleAuthProvider, faceAuthProvider }



