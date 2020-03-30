<template>
  <div id="app">
    <notifications position="bottom" width="100%" :max="1" />
    <loading :active.sync="isFetching"></loading>
    <router-view />
    <footer class="footer" v-if="doneFetching">
      <div class="content has-text-centered">
        Developed at night by
        <a
          class="has-text-black"
          href="https://instagram.com/coding_unicorn"
          rel="nofollow"
          >Coding Unicorn</a
        >
        under caffeine. No ads, open source. <br /><br />
        <a
          href="https://github.com/unicorncoding/devevents-web/issues"
          rel="nofollow"
        >
          <i class="fab fa-github"></i>
          report an issue
        </a>
        <a
          style="margin-left: 1em"
          href="mailto:hello@dev.events"
          rel="nofollow"
        >
          <i class="far fa-envelope"></i>
          email me
        </a>
        <a
          style="margin-left: 1em"
          href="https://instagram.com/coding_unicorn"
          rel="nofollow"
        >
          <i class="fab fa-instagram"></i>
          follow me
        </a>
      </div>
    </footer>
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
