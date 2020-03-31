<template>
  <router-link
    v-if="isSignedIn"
    :to="{ path: 'new', append: true }"
    class="button has-background-success has-text-white"
  >
    <font-awesome-icon icon="plus" />
  </router-link>
  <a
    v-else
    class="button has-background-success has-text-white"
    @click="loginNeeded()"
  >
    <font-awesome-icon icon="plus" />
  </a>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    loginNeeded() {
      this.$notify({
        ignoreDuplicates: true,
        title: "Operation is not permitted. Please login first.",
        type: "error",
        duration: -1
      });
    }
  },
  computed: {
    ...mapGetters("auth", ["isSignedIn"])
  }
};
</script>
<style lang="scss" scoped>
.button:hover {
  text-decoration: none;
}
.button {
  background-color: #42b983 !important;
  position: fixed;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  box-shadow: -6px 6px 22px -12px rgb(153, 116, 116);
  padding: 10px 16px;
  font-size: 18px;
  border-radius: 99px;
  border: 0;
}
</style>
