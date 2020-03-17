export default {
  namespaced: true,
  state: {
    isFetching: false
  },
  actions: {
    inProgress({ commit }) {
      commit("fetching", true);
    },
    done({ commit }) {
      commit("fetching", false);
    }
  },
  mutations: {
    fetching(state, fetching) {
      state.isFetching = fetching;
    }
  }
};
