import Vue from "vue";
import Vuex from "vuex";
import axios from "../utils/axios";

import auth from "./auth";
import creation from "./creation";
import api from "./api";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({ key: "devevents", paths: ["auth"] })],
  modules: {
    creation: creation,
    auth: auth
  },
  state: {
    continents: {
      EU: "Europe",
      AM: "Americas",
      AS: "Asia",
      AF: "Africa",
      OC: "Oceania"
    },
    countries: [],
    countryName: undefined,
    more: false,
    noEvents: false,
    events: [],
    topics: [],
    topicName: undefined,
    stats: {
      total: 0,
      shown: 0
    },
    pages: 0,
    cursor: "",
    country: ""
  },
  actions: {
    moreEvents({ commit, state, rootState }) {
      const jwtToken = rootState.auth.user.jwtToken;
      return axios(jwtToken)
        .get(`${api}/events/search`, {
          params: {
            ...{ start: state.cursor },
            ...state.route.params
          }
        })
        .then(response =>
          commit("eventsFetched", { data: response.data, merge: true })
        );
    },
    fetchEvents({ commit, state, rootState }) {
      const jwtToken = rootState.auth.user.jwtToken;
      return axios(jwtToken)
        .get(`${api}/events/search`, {
          params: state.route.params
        })
        .then(response => commit("eventsFetched", { data: response.data }));
    }
  },
  mutations: {
    eventsFetched(state, { data, merge = false }) {
      const [events, meta] = data;
      state.events = merge ? state.events.concat(events) : events;
      state.topics = meta.topics;
      state.countries = meta.countries;
      state.countryName = meta.countryName;
      state.topicName = meta.topicName;
      state.stats.total = meta.total;
      state.stats.shown = state.events.length;
      state.noEvents = state.events.length == 0;
      state.more = meta.more;
      state.cursor = meta.cursor;
    }
  }
});
