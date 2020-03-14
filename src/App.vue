<template>
  <div id="app">
    <notifications position="bottom" width="100%" :max="1" />
    <loading :active.sync="isLoading"></loading>
    <router-view />
  </div>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import axios from "axios";
import { mapState } from "vuex";
import { firebase } from "./utils/firebase";

export default {
  components: {
    Loading
  },
  computed: {
    isLoading() {
      return this.isFetching || this.isSigning;
    },
    ...mapState("auth", {
      jwtToken: state => state.user.jwtToken
    })
  },
  data() {
    return {
      isFetching: false,
      isSigning: true
    };
  },
  created() {
    this.enableInterceptor();
    this.enableAuthListener();
  },
  methods: {
    enableAuthListener() {
      firebase.auth().onAuthStateChanged(this.signInOrOut);
    },
    async signInOrOut(user) {
      const jwtToken = await user?.getIdToken();
      this.$store.dispatch("auth/autoSignIn", { ...user, jwtToken: jwtToken });
      this.isSigning = false;
    },
    httpError(e) {
      this.$notify({
        ignoreDuplicates: true,
        title: "Something went wrong while talking to the server:",
        type: "error",
        duration: -1,
        text: e
      });
    },
    enableInterceptor() {
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = this.jwtToken;
          this.isFetching = true;
          return config;
        },
        error => {
          this.isFetching = false;
          this.httpError(error);
          return Promise.reject(error);
        }
      );
      axios.interceptors.response.use(
        response => {
          this.isFetching = false;
          return response;
        },
        error => {
          this.isFetching = false;
          this.httpError(error);
          return Promise.reject(error);
        }
      );
    }
  }
};
</script>
<style lang="scss">
a {
  color: #4a4a4a;
}

a:hover {
  text-decoration: underline;
}

.tag {
  color: #7a7a7a !important;
  background-color: #fff !important;
  border: 1px solid #f5f5f5;
}
</style>
