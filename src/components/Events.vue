<template>
  <div>
    <router-view></router-view>
    <Header>
      <Continents />
      <Stats :class="{ 'is-invisible': !doneFetching }">
        <Papers />
      </Stats>
      <div class="is-pulled-left">
        <div class="is-hidden-tablet is-size-7">
          <a
            class="has-text-grey"
            @click="toggleCategories()"
            v-if="categoriesVisible"
          >
            <font-awesome-icon icon="eye-slash" />
            Hide categories
          </a>
        </div>
        <div class="is-hidden-tablet is-size-7">
          <a
            class="has-text-grey"
            @click="toggleCategories()"
            v-if="!categoriesVisible"
            ><font-awesome-icon icon="eye" /> Show categories
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
            <Countries v-if="!isOnline" />
          </section>
        </div>
        <div class="column is-two-thirds">
          <section class="section">
            <div
              class="columns is-mobile"
              v-for="event in events"
              :key="event.startDate + event.url"
            >
              <JsonLd :event="event" />
              <div class="column is-one-quarter">
                <span class="has-text-weight-bold is-size-7-mobile">
                  {{ formatRange(event.startDate, event.endDate) }}
                </span>
                <br />
                <a
                  rel="nofollow noopener noreferrer"
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
                  <router-link
                    :to="route('events', { topic: event.topicCode })"
                  >
                    <img
                      :src="prettyIcon(event.topicCode)"
                      :alt="event.topic"
                    />
                  </router-link>
                </figure>
              </div>
              <div class="column">
                <h2 class="title is-5">
                  <a
                    class="has-text-dark is-uppercase"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    :href="event.url"
                    >{{ event.name }}</a
                  >
                  <span v-if="event.pending && !isAdmin">
                    <span class="tag is-borderless">
                      <font-awesome-icon
                        icon="info-circle"
                        class="has-text-warning"
                      />
                      Awaiting confirmation
                    </span>
                  </span>
                  <span v-if="event.pending && isAdmin">
                    <a class="tag is-borderless" @click="confirm(event.id)">
                      <font-awesome-icon
                        icon="check"
                        class="has-text-success"
                      />
                      Confirm
                    </a>
                    <a class="tag is-borderless" @click="reject(event.id)">
                      <font-awesome-icon icon="times" class="has-text-danger" />
                      Reject
                    </a>
                  </span>
                  <span v-if="event.top" class="tag is-borderless is-uppercase">
                    <font-awesome-icon
                      :icon="['far', 'heart']"
                      class="has-text-danger"
                    />
                    Top
                  </span>
                </h2>
                <h3 class="subtitle is-6">
                  <router-link
                    :to="route('events', { topic: event.topicCode })"
                    >{{ event.topic }}</router-link
                  >
                  {{ event.category }}

                  <span v-if="!isOnline"
                    >in {{ event.city }},
                    <router-link
                      :to="route('events', { country: event.countryCode })"
                    >
                      {{ event.country }}
                    </router-link>
                  </span>
                </h3>
              </div>
            </div>
          </section>
          <section class="section">
            <nav class="has-text-centered">
              <div class="columns">
                <div class="column is-size-7">
                  <div class="has-text-left">
                    <PagingStats v-if="doneFetching" class="is-pulled-right" />
                    <a v-if="more" class="button is-small" @click="moreEvents()"
                      >Show more</a
                    >
                  </div>
                </div>
              </div>
            </nav>
          </section>
        </div>
      </div>
      <PlusButton />
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
import JsonLd from "./JsonLd";

export default {
  components: {
    Header,
    Continents,
    Countries,
    Topics,
    Papers,
    PagingStats,
    PlusButton,
    JsonLd,
    Stats,
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
        inner: !this.isOnline
          ? (this.topicName() ? this.topicName() : "Developer") +
            " conferences, meetups, and training in " +
            this.locationName()
          : "Online " +
            (this.topicName() ? this.topicName() : "developer") +
            " conferences, meetups, and training"
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
    ...mapActions(["fetchEvents", "moreEvents"]),
    ...mapActions("admin", ["confirm", "reject"])
  },
  computed: {
    ...mapGetters("auth", ["isAdmin"]),
    ...mapState([
      "isOnline",
      "events",
      "topics",
      "more",
      "noEvents",
      "doneFetching"
    ])
  }
};
</script>
<style scoped lang="scss">
.tag {
  position: relative;
  top: -1px;
  svg {
    margin-right: 0.3em;
  }
  font-weight: normal;
  background-color: #fff;
}
</style>
