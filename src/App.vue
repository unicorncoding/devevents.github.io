<template>
  <div id="app">
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
  mounted() {
    this.enableInterceptor();
  },
  methods: {
    enableInterceptor() {
      axios.interceptors.request.use(
        config => {
          this.isLoading = true;
          return config;
        },
        error => {
          this.isLoading = false;
          return Promise.reject(error);
        }
      );
      axios.interceptors.response.use(
        response => {
          this.isLoading = false;
          return response;
        },
        function(error) {
          this.isLoading = false;
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
