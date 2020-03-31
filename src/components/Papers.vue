<template>
  <span>
    <router-link v-if="!$route.params.cfp" :to="route('events', { cfp: 'cfp' })"
      ><font-awesome-icon :icon="['far', 'circle']" /> with cfp</router-link
    >
    <router-link
      v-if="$route.params.cfp"
      :to="route('events', { cfp: undefined })"
      ><font-awesome-icon :icon="['far', 'check-circle']" /> with
      cfp</router-link
    >
  </span>
</template>
<script>
import mixins from "@/mixins/navigation";
export default {
  mixins: mixins
};
</script>
<style lang="scss" scoped>
span {
  margin-left: 0.5em;
}
a {
  color: #42b983;
}
</style>
