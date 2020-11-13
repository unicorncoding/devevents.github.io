<template>
  <div class="tabs is-centered is-fullwidth is-size-7-mobile">
    <ul>
      <li :class="{ 'is-active': !$route.params.continent }">
        <router-link :to="{ params: { continent: undefined } }"
          >World</router-link
        >
      </li>
      <li
        v-for="(name, code) in continents"
        :key="code"
        :class="{ 'is-active': code == $route.params.continent }"
      >
        <router-link
          :to="{
            params: { continent: code, country: undefined }
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
  color: #4a4a4a !important;
  border-color: #4a4a4a !important;
  font-weight: bold;
}
</style>
