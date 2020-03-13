import { firebase } from "../utils/firebase"

export default {
  namespaced: true,
  state: {
    user: undefined
  },
  actions: {
    autoSignIn ({commit}, payload) {
      commit('setUser', payload);
    },      
    signOut() {
      firebase.auth().signOut();
      location.reload();
    },    
    githubLogin() {
      const github = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(github)
        .then(() => location.reload())
        .catch(error => console.warn(error.message));      
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  }
}