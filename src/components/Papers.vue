<template>
  <div class="field is-pulled-right is-size-7">
    <router-link v-if="!$route.params.cfp" :to="route('events', { cfp: 'cfp' })" class="has-text-grey">
      call for papers
    </router-link>
    <router-link v-else :to="route('events', { cfp: undefined })" class="has-text-grey">
      <i class="fas fa-times has-text-danger"></i>
      call for papers
    </router-link>    
  </div>
</template>
<script>
import mixins from "@/mixins/navigation";
export default {
  mixins: mixins
}
</script>
