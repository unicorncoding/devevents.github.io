<template>
  <div class="columns is-mobile is-multiline">
    <div
      class="column is-full"
      v-for="continent in continents"
      :key="continent.code"
    >
      <div>
        <h3 class="title is-5 is-uppercase">{{ continent.name }}</h3>
        <div
          class="country"
          v-for="country in countriesBy(continent.code)"
          :key="country.code"
        >
          <img :src="icon(country)" />
          <router-link :to="newLocation(country.code)">{{ country.name }}</router-link>
          &nbsp;
          <span class="tag">{{country.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import mixins from "@/mixins/navigation";

export default {
  mixins: mixins,
  created() {
    this.fetchLocations();
  },
  methods: {
    icon(country) {
      const code = country.code.substr(3, 2).toLowerCase();
      return (
        "//cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/" +
        code +
        ".svg"
      );
    },
    countriesBy(continent) {
      return this.countries.filter(it => it.code.startsWith(continent));
    },
    ...mapActions(["fetchLocations"])
  },
  computed: {
    ...mapState(["continent", "continents", "countries"])
  }
};
</script>
<style scoped lang="scss">
.country {
  margin-bottom: 0.5em;
  img {
    height: 0.7em;
    margin-right: 5px;
    filter: grayscale(40%);
  }
}
.country {
  a:hover {
    color: black !important;
    cursor: pointer;
    filter: none;
  }
}
</style>
