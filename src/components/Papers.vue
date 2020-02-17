<template>
  <span>
    <router-link
      v-if="!$route.params.cfp"
      :to="route('events', { cfp: 'cfp' })"
      :class="{ 'line-through': !$route.params.cfp }"
      >with call for papers</router-link
    >
    <router-link
      v-if="$route.params.cfp"
      :to="route('events', { cfp: undefined })"
      :class="{ 'line-through': !$route.params.cfp }"
      >with call for papers</router-link
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
a {
  color: #42b983;
}
.line-through {
  text-decoration: line-through;
}
</style>
