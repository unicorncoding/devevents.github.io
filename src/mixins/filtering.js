const mixin = {
  methods: {
    topicName() {
      const state = this.$store.state;
      const topicName = state.topicName;
      return topicName || "";
    },
    locationName() {
      const state = this.$store.state;
      const params = this.$route.params;
      const country = state.countryName;
      const continentName = state.continents[params.continent];
      return country || continentName || "";
    }
  }
};

export default [mixin];
