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
    signOut() {
      firebase.auth().signOut();
      // location.reload();
    },
    githubSignIn() {
      const github = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(github)
        .catch(error => console.warn(error.message));
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  }
};
