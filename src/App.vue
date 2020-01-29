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

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false
    };
  },
  created() {
    this.enableInterceptor();
  },
  methods: {
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
          this.isLoading = true;
          return config;
        },
        error => {
          this.isLoading = false;
          this.httpError(error);
          return Promise.reject(error);
        }
      );
      axios.interceptors.response.use(
        response => {
          this.isLoading = false;
          return response;
        },
        error => {
          this.isLoading = false;
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
