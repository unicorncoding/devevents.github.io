import * as firebase from "firebase/app";
import "firebase/auth";
import AuthConfig from "../../firebase.auth.json";

firebase.initializeApp(AuthConfig);

const authReady = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        unsubscribe();
        resolve(user);
      },
      error => {
        unsubscribe();
        reject(error);
      }
    );
  });

const jwtToken = () =>
  new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return resolve("");
    }
    user.getIdToken().then(
      tkn => resolve(tkn),
      error => reject(error)
    );
  });

export { firebase, authReady, jwtToken };
