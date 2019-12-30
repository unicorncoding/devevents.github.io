import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const continents = {
  "": "Any continent",
  "AF": "Africa",
  "AN": "Antarctica",
  "AS": "Asia",
  "EU": "Europe",
  "NA": "North America",
  "OC": "Oceania",
  "SA": "South America"
};

export default new Vuex.Store({
  state: {
    continents: continents,
    hasMore: false,
    events: [],
    total: 0,
    shown: 0,
    pages: 0,
    cursor: '',
    continent: ''
  },
  actions: {
    narrowEventsByContinent({ dispatch, commit }, continent) {
      commit("narrowByContinent", continent);
      return dispatch('fetchEvents')
    },
    moreEvents({ commit, state }) {
      return axios
        .get(
          "https://us-central1-devevents.cloudfunctions.net/api/web/events-fetch",
          { params: { start: state.cursor, continent: state.continent } }
        )
        .then(response => commit("eventsFetched", { data: response.data, merge: true }))
        .catch(error => console.log(error));
    },
    fetchEvents({ commit, state }) {
      return axios
        .get(
          "https://us-central1-devevents.cloudfunctions.net/api/web/events-fetch",
          { params: { continent: state.continent } }
        )
        .then(response => commit("eventsFetched", { data: response.data }))
        .catch(error => console.log(error));
    }
  },
  mutations: {
    narrowByContinent(state, continent) {
      state.continent = continent;
    },
    eventsFetched(state, { data, merge = false }) {
      const [events, meta] = data;
      const info = meta.info;
      state.events = merge ? state.events.concat(events) : events;
      state.shown = state.events.length;
      state.total = meta.total;
      state.hasMore = info.moreResults != "NO_MORE_RESULTS"
      state.cursor = info.endCursor;
    }
  }
});
