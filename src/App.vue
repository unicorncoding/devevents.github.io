<template>
  <div id="app">
    <notifications position="bottom" width="100%" :max="1" />
    <loading :active.sync="isFetching"></loading>
    <router-view />
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapState } from "vuex";

export default {
  components: {
    Loading
  },
  computed: {
    ...mapState(["doneFetching"]),
    ...mapState("fetching", { isFetching: state => state.isFetching })
  }
};
</script>
<style lang="scss">
a:hover {
  text-decoration: underline;
}
</style>
