<template>
  <span>
    showing
    {{ what }}
    <span v-if="where">
      in
      <img :src="icon()">
      <span> {{ where }} </span>
      <router-link class="delete is-small" :to="{ name: 'events', params: {...$route.params, ...{ country: undefined, continent: undefined } } }"></router-link>
    </span>
    <span v-else>
      worldwide
    </span>
  </span>
</template>
<script>
import { mapState } from "vuex";
export default {
  methods: {
    icon() {
      const { country } = this.route.params;
      return (
        "//cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/" +
        country.toLowerCase() +
        ".svg"
      );
    },
  },
  computed: {
    where() {
      const { continent, country } = this.route.params;
      if (!continent || !country) {
        return "";
      }
      const location = continent + "/" + country;
      const match = this.countries.find(it => it.code == location);
      return match ? match.name : "";
    },
    what() {
      const stats = this.stats;
      if (stats.total == 1) return "a single event";
      if (stats.shown == stats.total) return "all events";
      else return `${stats.shown} out of ${stats.total} events`;
    },
    ...mapState(["route", "stats", "countries"])
  }
};
</script>
<style scoped lang="scss">
  img  {
    height: 0.7em; 
    margin-left: 5px;
    margin-right: 2px;
  }
</style>