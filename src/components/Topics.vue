<template>
  <div class="columns is-multiline is-gapless">
    <div
      v-for="topic in topics"
      :key="topic.code"
      class="topic column is-full"
      :class="{ 'is-active': isActive(topic.code) }"
    >
      <router-link class="has-text-primary" :to="hover(topic.code)">
        {{ name(topic.code) }}
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
import { topics } from "../utils/topics";
import { mapState } from "vuex";
import mixins from "@/mixins/navigation";
export default {
  mixins: mixins,
  methods: {
    name(code) {
      const topic = topics[code];
      return topic ? topic.name : "";
    },
    isActive(topic) {
      return topic == this.$route.params.topic;
    },
    hover(topic) {
      if (this.isActive(topic)) {
        return this.route("events", { topic: undefined });
      } else {
        return this.route("events", { topic: topic });
      }
    }
  },
  computed: {
    ...mapState(["topics"])
  }
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
