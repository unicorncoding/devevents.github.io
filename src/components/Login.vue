<template>
  <div>
    <a
      class="has-text-light is-size-7"
      @click="active = true && signIn('#firebaseui-auth-container')"
      >login</a
    >
    <div class="modal" v-bind:class="{ 'is-active': active }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <section id="firebaseui-auth-container"></section>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="active = false"
      ></button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data: function() {
    return {
      active: false
    };
  },
  methods: {
    ...mapActions("auth", ["signIn"])
  }
};
</script>
