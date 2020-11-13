<template>
  <div class="columns is-multiline is-gapless">
    <div
      class="country column is-full"
      :class="{ 'is-active': isActive(country.code) }"
      v-for="country in countries"
      :key="country.code"
    >
      <img :src="icon(country.code)" :alt="country.code" />
      <router-link
        class="has-text-primary"
        :to="hover(country.code, country.continent)"
        >{{ country.name }}</router-link
      >
      &nbsp;
      <router-link
        :to="hover(country.code, country.continent)"
        class="has-text-danger"
        v-if="isActive(country.code)"
      >
        <font-awesome-icon icon="times" />
      </router-link>
      <span v-else class="tag is-light">{{ country.count }}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import mixins from "@/mixins/navigation";

export default {
  mixins,
  computed: {
    ...mapState(["countries"])
  },
  methods: {
    isActive(country) {
      return country == this.$route.params.country;
    },
    hover(country, continent) {
      if (this.isActive(country)) {
        const params = { ...this.$route.params, country: undefined };
        return { params };
      } else {
        const params = { ...this.$route.params, country, continent };
        return { params };
      }
    },
    icon(country) {
      return (
        "//cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/" +
        country.toLowerCase() +
        ".svg"
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.column {
  margin-bottom: 0.3em !important;
}

img {
  height: 0.7em;
  margin-right: 5px;
  filter: opacity(50%);
}

.country {
  &.is-active {
    img {
      filter: none;
    }
    .icon {
      visibility: visible !important;
    }
    font-weight: bold;
  }
}
</style>
