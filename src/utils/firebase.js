import * as firebase from "firebase/app";
import { auth as firebaseAuthUi } from "firebaseui";
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

const ui = new firebaseAuthUi.AuthUI(firebase.auth());
const auth = firebase.auth;
const noCredentialsHelper = firebaseAuthUi.CredentialHelper.NONE;

export { firebase, authReady, jwtToken, ui, auth, noCredentialsHelper };
