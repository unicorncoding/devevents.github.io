<template>
  <span>
    <span v-for="(topic, index) in topics" v-bind:key="topic">
      <span v-if="topics.length !== 1 && index === topics.length - 1">
        and
      </span>
      <router-link :class="classes" :to="route('confs', { topic })">{{
        topicName(topic)
      }}</router-link>
      <span v-if="topics.length !== 2 && index !== topics.length - 1">, </span>
    </span>
  </span>
</template>
<script>
import navigationMixins from "@/mixins/navigation";
import { topics } from "../utils/topics";
export default {
  mixins: navigationMixins,
  props: {
    classes: {
      default: () => "",
      type: String
    },
    topics: {
      default: () => [],
      type: Array
    }
  },
  methods: {
    topicName(code) {
      const topic = topics[code];
      return topic ? topic.name : "";
    }
  }
};
</script>
