<template>
  <span>
    {{ what }}
    in
    {{ where }}
    {{ cfp }}
  </span>
</template>
<script>
import { mapState } from "vuex";
import mixins from "@/mixins/filtering";
export default {
  mixins: mixins,
  computed: {
    where() {
      return this.locationName();
    },
    cfp() {
      const cfp = this.$route.params.cfp;
      return cfp ? " with call for papers" : "";
    },
    what() {
      const stats = this.stats;
      const topic = this.topicName();
      if (stats.total == 1) return `a single ${topic} event`;
      if (stats.total == 0) return `no ${topic} events`;
      if (stats.shown == stats.total) return `${stats.shown} ${topic} events`;
      else
        return `showing ${stats.shown} out of ${stats.total} ${topic} events`;
    },
    ...mapState(["stats", "countries", "continents", "topics"])
  }
};
</script>
<style scoped lang="scss">
img {
  height: 0.7em;
  margin-left: 5px;
  margin-right: 2px;
}
</style>
