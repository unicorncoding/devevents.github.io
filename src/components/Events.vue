<template>
  <div>
    <router-view></router-view>
    <Header>
      <Continents />
      <Stats>
        <Papers />
      </Stats>
      <div class="is-pulled-left">
        <div class="is-hidden-tablet is-size-7">
          <a
            class="has-text-grey"
            @click="toggleCategories()"
            v-if="categoriesVisible"
          >
            <i class="fas fa-eye-slash"></i>
            Hide categories
          </a>
        </div>
        <div class="is-hidden-tablet is-size-7">
          <a
            class="has-text-grey"
            @click="toggleCategories()"
            v-if="!categoriesVisible"
            ><i class="fa fa-eye"></i> Show categories
          </a>
        </div>
      </div>
    </Header>
    <div class="container">
      <section
        class="section is-size-1 is-size-5-mobile has-text-grey has-text-centered"
        v-if="noEvents"
      >
        ¯\_(ツ)_/¯ <br />There are no events matching your criteria. Try
        adjusting or
        <router-link
          :to="{
            name: 'events',
            params: { continent: $route.params.continent }
          }"
          >resetting</router-link
        >
        your search criteria.
      </section>
      <div class="columns" v-else>
        <div class="column is-one-third">
          <section
            class="section"
            :class="{ 'is-hidden-mobile': !forceShowCategories }"
            v-observe-visibility="categoryVisibilityChanged"
          >
            <Topics />
            <Countries />
          </section>
        </div>
        <div class="column is-two-thirds">
          <section class="section">
            <div
              class="columns is-mobile"
              v-for="event in events"
              :key="event.startDate + event.url"
            >
              <div class="column is-one-quarter">
                <span class="has-text-weight-bold">
                  {{ formatRange(event.startDate, event.endDate) }}
                </span>
                <br />
                <a
                  rel="nofollow"
                  target="_blank"
                  class="has-text-grey is-size-7"
                  :href="event.cfpUrl"
                  v-if="event.cfpEndDate"
                >
                  {{ formatCfp(event.cfpEndDate) }}
                </a>
              </div>
              <div class="column is-narrow">
                <figure class="image is-32x32">
                  <img :src="prettyIcon(event.topicCode)" :alt="event.topic" />
                </figure>
              </div>
              <div class="column">
                <h2 class="title is-5">
                  <a
                    class="has-text-dark is-uppercase"
                    rel="nofollow"
                    target="_blank"
                    :href="event.url"
                    >{{ event.name }}</a
                  >
                  <span v-if="event.pending" class="tag is-borderless">
                    <i class="fas fa-info-circle has-text-warning"></i>
                    Awaiting confirmation
                  </span>
                  <span v-if="event.top" class="tag is-borderless is-uppercase">
                    <i class="far fa-heart has-text-danger"></i>
                    Top
                  </span>
                </h2>
                <h3 class="subtitle is-6">
                  <router-link
                    :to="route('events', { topic: event.topicCode })"
                    >{{ event.topic }}</router-link
                  >
                  {{ event.category }} in {{ event.city }},
                  <router-link
                    :to="route('events', { country: event.countryCode })"
                  >
                    {{ event.country }}
                  </router-link>
                </h3>
              </div>
            </div>
          </section>
          <section class="section">
            <nav class="has-text-centered">
              <div class="columns">
                <div class="column is-size-7">
                  <div class="is-pulled-left has-text-left">
                    <PagingStats />
                    <br />
                    <br />
                    <a v-if="more" class="button is-small" @click="moreEvents()"
                      >Show more</a
                    >
                  </div>
                </div>
              </div>
            </nav>
          </section>
          <PlusButton v-if="isSignedIn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prettyIcon } from "@/utils/topics";
import { formatRange, formatCfp } from "@/utils/dates";
import navigationMixins from "@/mixins/navigation";
import filteringMixins from "@/mixins/filtering";

import { mapState, mapActions, mapGetters } from "vuex";
import Topics from "./Topics";
import Continents from "./Continents";
import Countries from "./Countries";
import Header from "./Header";
import Stats from "./Stats";
import PlusButton from "./PlusButton";
import PagingStats from "./PagingStats";
import Papers from "./Papers";

export default {
  components: {
    Header,
    Continents,
    Countries,
    Topics,
    Papers,
    PagingStats,
    PlusButton,
    Stats
  },
  mixins: [...filteringMixins, ...navigationMixins],
  created() {
    this.fetchEvents().then(() => this.$emit("updateHead"));
  },
  data: () => {
    return {
      categoriesVisible: true,
      forceShowCategories: false
    };
  },
  watch: {
    $route() {
      this.fetchEvents().then(() => this.$emit("updateHead"));
    }
  },
  head: {
    title: function() {
      return {
        separator: " ",
        complement: " ",
        inner: (this.topicName() || "dev") + " events in " + this.locationName()
      };
    }
  },
  methods: {
    categoryVisibilityChanged(categoriesVisible) {
      this.categoriesVisible = categoriesVisible;
    },
    toggleCategories() {
      this.forceShowCategories = !this.forceShowCategories;
    },
    formatRange,
    formatCfp,
    prettyIcon,
    ...mapActions(["fetchEvents", "moreEvents"])
  },
  computed: {
    ...mapGetters("auth", ["isSignedIn"]),
    ...mapState(["events", "topics", "more", "noEvents"])
  }
};
</script>
<style scoped lang="scss">
a {
  color: #42b983;
}

.tag {
  position: relative;
  top: -1px;
  i {
    margin-right: 0.3em;
  }
  font-weight: normal;
  color: #7a7a7a;
  background-color: #fff;
}
</style>
