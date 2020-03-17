import lazyAxios from "../utils/axios";
import api from "./api";
import router from "../router";

export default {
  namespaced: true,
  state: {
    validationErrors: [],
    globalError: undefined,
    topics: [],
    countries: []
  },
  actions: {
    async createNew({ commit }, event) {
      const axios = await lazyAxios();
      const goToNewEvent = () => {
        router.push({
          name: "events",
          params: {
            continent: router.currentRoute.params.continent,
            country: event.countryCode,
            topic: event.topicCode
          }
        });
      };
      return axios
        .post(`${api}/events/new`, event)
        .then(() => goToNewEvent())
        .catch(err => commit("creationFailed", err.response));
    },
    async fetchInfo({ commit }) {
      const axios = await lazyAxios();
      return axios
        .get(`${api}/events/new/prepare`)
        .then(response => commit("infoFetched", response.data));
    }
  },
  mutations: {
    creationFailed(state, { data, status }) {
      state.validationErrors = [];
      state.globalError = undefined;
      if (status === 422) {
        state.validationErrors = data;
      }
      if (status === 409) {
        state.globalError = data;
      }
    },
    infoFetched(state, data) {
      state.topics = data.topics;
      state.countries = data.countries;
    }
  }
};
