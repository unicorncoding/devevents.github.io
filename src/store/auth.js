import { firebase, ui, auth, noCredentialsHelper } from "../utils/firebase";

export default {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    username: state => {
      const [firstName] = state.user.name.split(" ");
      return firstName;
    },
    isAdmin: state => {
      return !!state.user.claims?.admin;
    },
    isSignedIn: state => {
      return !!state.user.jwtToken;
    }
  },
  actions: {
    signIn({ commit }, containerSelector) {
      const signInSuccessWithAuthResult = ({ user }) => {
        user
          .getIdTokenResult(true)
          .then(it => ({ ...user, claims: it.claims, jwtToken: it.token }))
          .then(it => commit("setUser", it))
          .then(() => location.reload());
      };
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult
        },
        signInFlow: "popup",
        credentialHelper: noCredentialsHelper,
        signInSuccessUrl: window.location.href,
        signInOptions: [
          auth.GithubAuthProvider.PROVIDER_ID,
          auth.TwitterAuthProvider.PROVIDER_ID,
          auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
      ui.start(containerSelector, uiConfig);
    },
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => commit("setUser", {}))
        .then(() => location.reload());
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = {
        name: user.displayName,
        claims: user.claims,
        jwtToken: user.jwtToken,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid
      };
    }
  }
};
