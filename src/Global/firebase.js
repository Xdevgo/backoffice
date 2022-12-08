import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyB4bGbwqFyWzkjJj5zcB11TmE4ETd2FKLc",
    authDomain: "shop-fc2d1.firebaseapp.com",
    projectId: "apiplaces-23dc8",
    storageBucket: "shop-fc2d1.appspot.com",
    messagingSenderId: "414926549162",
    appId: "1:345524868422:web:6d002c472be3bac31f4147"
  };



const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
