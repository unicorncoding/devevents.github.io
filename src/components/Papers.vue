<template>
  <span>
    <router-link v-if="!$route.params.cfp" :to="route('events', { cfp: 'cfp' })"
      ><i class="far fa-circle"></i> with cfp</router-link
    >
    <router-link
      v-if="$route.params.cfp"
      :to="route('events', { cfp: undefined })"
      ><i class="far fa-check-circle"></i> with cfp</router-link
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
