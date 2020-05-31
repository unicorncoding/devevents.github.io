<template>
  <div class="columns is-multiline is-gapless" v-if="false">
    <div class="price column is-full" v-if="isActive()">
      <router-link
        class="has-text-primary has-text-weight-bold"
        :to="{ query: { freeOnly: undefined } }"
        >Free events</router-link
      >
      &nbsp;
      <router-link
        :to="{ query: { freeOnly: undefined } }"
        class="has-text-danger"
      >
        <font-awesome-icon icon="times" />
      </router-link>
    </div>
    <div class="price column is-full" v-else>
      <router-link class="has-text-primary" :to="{ query: { freeOnly: true } }"
        >Free events</router-link
      >
      &nbsp;
      <span class="tag is-light">{{ free }}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  methods: {
    isActive() {
      return !!this.$route.query.freeOnly;
    }
  },
  computed: {
    ...mapState(["free"])
  }
};
</script>
