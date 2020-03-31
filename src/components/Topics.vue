<template>
  <div class="columns is-multiline is-gapless">
    <div
      v-for="topic in topics"
      :key="topic.code"
      class="topic column is-full"
      :class="{ 'is-active': isActive(topic.code) }"
    >
      <router-link class="has-text-primary" :to="hover(topic.code)">{{
        topic.name
      }}</router-link>
      &nbsp;
      <router-link
        :to="hover(topic.code)"
        class="has-text-danger"
        v-if="isActive(topic.code)"
      >
        <font-awesome-icon icon="times" />
      </router-link>
      <span v-else class="tag">{{ topic.count }}</span>
    </div>
  </div>
</template>
<script>
import { prettyIcon } from "@/utils/topics";
import { mapState } from "vuex";
import mixins from "@/mixins/navigation";
export default {
  mixins: mixins,
  methods: {
    prettyIcon,
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

.tag {
  color: #7a7a7a;
  background-color: #fff;
  border: 1px solid #f5f5f5;
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
