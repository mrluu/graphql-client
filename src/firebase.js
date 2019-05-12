import firebase from 'firebase';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAb1J8fK0uSwf-zz95h8G0Mu1fD9gT70_k",
  authDomain: "graphql-sample.firebaseapp.com",
  databaseURL: "https://graphql-sample.firebaseio.com",
  projectId: "graphql-sample",
  storageBucket: "graphql-sample.appspot.com",
  messagingSenderId: "233011101239"
};

var app = firebase.initializeApp(config);
export const db = firebase.firestore(app);
export default firebase;
