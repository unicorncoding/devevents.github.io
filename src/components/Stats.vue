<template>
  <span class="is-pulled-right is-size-7">
    {{ what }}
    <span v-if="!isOnline">
      in
      {{ where }}
    </span>
    <slot />
    <div class="has-text-right is-hidden-mobile">
      <br />
      <CalendarLink />
      <br />
      <RssLink />
    </div>
  </span>
</template>
<script>
import { mapState } from "vuex";
import RssLink from "./RssLink";
import CalendarLink from "./CalendarLink";
import mixins from "@/mixins/filtering";
export default {
  mixins: mixins,
  components: { RssLink, CalendarLink },
  props: {
    numbers: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    where() {
      return this.locationName();
    },
    what() {
      const topic = this.topicName();
      return `${topic} events`;
    },
    ...mapState(["isOnline", "stats", "countries", "continents", "topics"])
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
