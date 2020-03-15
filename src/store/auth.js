import { firebase } from "../utils/firebase";

export default {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
    isSignedIn: state => {
      return !!state.user.jwtToken;
    }
  },
  actions: {
    autoSignIn({ commit }, user) {
      commit("setUser", user);
    },
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
          user.getIdToken(true).then(tkn => ({ ...user, jwtToken: tkn }))
        )
        .then(user => commit("setUser", user))
        .then(() => location.reload());
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = {
        jwtToken: user.jwtToken,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid
      };
    }
  }
};
