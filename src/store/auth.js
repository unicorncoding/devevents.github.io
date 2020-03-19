import { firebase } from "../utils/firebase";

export default {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    isAdmin: state => {
      return !!state.user.claims?.admin;
    },
    isSignedIn: state => {
      return !!state.user.jwtToken;
    }
  },
  actions: {
    signOut({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => commit("setUser", {}))
        .then(() => location.reload());
    },
    githubSignIn({ commit }) {
      const github = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(github)
        .then(({ user }) =>
          user
            .getIdTokenResult(true)
            .then(it => ({ ...user, claims: it.claims, jwtToken: it.token }))
        )
        .then(user => commit("setUser", user))
        .then(() => location.reload());
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = {
        claims: user.claims,
        jwtToken: user.jwtToken,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid
      };
    }
  }
};
