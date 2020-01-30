const mixin = {
  methods: {
    topicName() {
      const state = this.$store.state;
      const params = this.$route.params;
      const info = state.topics.find(it => it.code === params.topic);
      return info ? info.name : "";
    },
    locationName() {
      const state = this.$store.state;
      const params = this.$route.params;
      const country = state.countries.find(it => it.code == params.country);
      const continentName = state.continents[params.continent];
      return country ? country.name : continentName;
    }
  }
};

export default [mixin];
