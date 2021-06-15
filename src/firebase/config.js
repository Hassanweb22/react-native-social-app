import firebase from "@react-native-firebase/app"
import Auth from "@react-native-firebase/auth"


var firebaseConfig = {
    apiKey: "AIzaSyCTUl5dBmhFD0ExWUAlAF55ZXQUL6mj9d8",
    authDomain: "react-native-5fa0c.firebaseapp.com",
    databaseURL: "https://react-native-5fa0c-default-rtdb.firebaseio.com/",
    projectId: "react-native-5fa0c",
    storageBucket: "react-native-5fa0c.appspot.com",
    messagingSenderId: "518931214396",
    appId: "1:518931214396:web:c4de44bbfb06146d9ad339"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase, Auth };