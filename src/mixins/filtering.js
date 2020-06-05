import { topics } from "../utils/topics";
const mixin = {
  methods: {
    topicName() {
      const topic = topics[this.$route.params.topic];
      return topic ? topic.name : "";
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
