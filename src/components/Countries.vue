<template>
  <div class="columns is-multiline is-gapless">
    <div
      class="topic column is-full"
      :class="{ 'is-active': isActive(country.code) }"
      v-for="country in countries"
      :key="country.code"
    >
      <img :src="icon(country.code)" />
      <router-link class="has-text-primary" :to="hover(country.code)">{{
        country.name
      }}</router-link>
      &nbsp;
      <router-link
        :to="hover(country.code)"
        class="has-text-danger"
        v-if="isActive(country.code)"
      >
        <font-awesome-icon icon="times" />
      </router-link>
      <span v-else class="tag">{{ country.count }}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import mixins from "@/mixins/navigation";

export default {
  mixins: mixins,
  computed: {
    ...mapState(["countries"])
  },
  methods: {
    isActive(country) {
      return country == this.$route.params.country;
    },
    hover(country) {
      if (this.isActive(country)) {
        return this.route("events", { country: undefined });
      } else {
        return this.route("events", { country: country });
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
  filter: grayscale(40%) opacity(50%);
}

.tag {
  color: #7a7a7a;
  background-color: #fff;
  border: 1px solid #f5f5f5;
}

.topic {
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
