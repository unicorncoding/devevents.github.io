import lazyAxios from "../utils/axios";

export default {
  namespaced: true,
  state: {
    karma: 0
  },
  actions: {
    inc({ commit }) {
      commit("karmaInc");
    },
    async fetch({ commit, rootGetters }) {
      const signedIn = rootGetters["auth/isSignedIn"];
      if (signedIn) {
        const axios = await lazyAxios();
        axios
          .get('/karma')
          .then(response => commit("karmaFetched", response.data));
      }
    }
  },
  mutations: {
    karmaInc(state) {
      state.karma = state.karma + 1;
    },
    karmaFetched(state, data) {
      state.karma = data;
    }
  }
};
