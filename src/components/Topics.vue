<template>
  <div class="columns is-multiline is-gapless">
    <div
      v-for="topic in topics"
      :key="topic.code"
      class="topic column is-full"
      :class="{ 'is-active': isActive(topic.code) }"
    >
      <router-link class="has-text-primary" :to="hover(topic.code)">
        {{ topic.name }}
      </router-link>
      &nbsp;
      <router-link
        :to="hover(topic.code)"
        class="has-text-danger"
        v-if="isActive(topic.code)"
      >
        <font-awesome-icon icon="times" />
      </router-link>
      <span v-else class="tag is-light">{{ topic.count }}</span>
    </div>
  </div>
</template>
<script>
import { topicsOrdered } from "../utils/topics";
import { mapState } from "vuex";
import mixins from "@/mixins/navigation";
export default {
  mixins,
  methods: {
    isActive(topic) {
      return topic === this.$route.params.topic;
    },
    hover(topic) {
      if (this.isActive(topic)) {
        return this.route("confs", { topic: undefined });
      } else {
        return this.route("confs", { topic });
      }
    }
  },
  computed: mapState({
    topics: state =>
      topicsOrdered
        .filter(({ code }) => state.topics[code])
        .map(({ code, name }) => ({ code, name, count: state.topics[code] }))
  })
};
</script>
<style scoped lang="scss">
.column {
  margin-bottom: 0.3em !important;
}

.topic {
  &.is-active {
    .icon {
      visibility: visible !important;
    }
    font-weight: bold;
  }
}
</style>
