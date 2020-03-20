import lazyAxios from "../utils/axios";
import api from "./api";

export default {
  namespaced: true,
  state: {
    karma: 0
  },
  actions: {
    inc({ commit }) {
      commit("karmaInc");
    },
    async fetch({ commit }) {
      const axios = await lazyAxios();
      return axios
        .get(`${api}/karma/`)
        .then(response => commit("karmaFetched", response.data));
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
