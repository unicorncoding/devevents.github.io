import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const api = "http://localhost:5555";

export default new Vuex.Store({
  state: {
    isLoading: false,
    continents: [],
    countries: [],
    hasMore: false,
    noEvents: false,
    events: [],
    stats: {
      country: undefined,
      total: 0,
      shown: 0
    },
    pages: 0,
    cursor: "",
    country: ""
  },
  actions: {
    moreEvents({ commit, state }) {
      return axios
        .get(`${api}/events/search`, {
          params: {
            ...{ start: state.cursor }, ...state.route.params,
          }
        })
        .then(response =>
          commit("eventsFetched", { data: response.data, merge: true })
        );
    },
    fetchLocations({ commit }) {
      return axios
        .get(`${api}/locations/search`)
        .then(response => commit("locationsFetched", response.data));
    },
    fetchEvents({ commit, state }) {
      return axios
        .get(`${api}/events/search`, {
          params: state.route.params
        })
        .then(response => commit("eventsFetched", { data: response.data }));
    }
  },
  mutations: {
    locationsFetched(state, data) {
      const [continents, countries] = data;
      continents.sort((it, that) => that.count - it.count);
      countries.sort((it, that) => it.name.localeCompare(that.name));
      state.continents = continents;
      state.countries = countries;
    },
    eventsFetched(state, { data, merge = false }) {
      const [events, meta] = data;
      const info = meta.info;
      state.events = merge ? state.events.concat(events) : events;
      state.stats.total = meta.total;
      state.stats.shown = state.events.length;
      state.noEvents = state.events.length == 0;
      state.hasMore = info.moreResults != "NO_MORE_RESULTS";
      state.cursor = info.endCursor;
    }
  }
});
