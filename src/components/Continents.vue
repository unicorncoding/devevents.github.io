<template>
  <div class="tabs is-centered is-fullwidth is-size-7-mobile">
    <ul>
      <li
        v-for="(name, code) in continents"
        :key="code"
        :class="{ 'is-active': code == $route.params.continent }"
      >
        <router-link
          :to="{
            name: 'events',
            params: { continent: code, cfp: $route.params.cfp }
          }"
        >
          {{ name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["continents"])
  }
};
</script>
<style scoped lang="scss">
.is-active a {
  color: #42b983 !important;
  border-color: #42b983 !important;
  font-weight: bold;
}
</style>
