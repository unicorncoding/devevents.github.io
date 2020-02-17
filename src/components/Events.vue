<template>
  <div>
    <Header>
      <Continents />
      <Papers />
    </Header>
    <div class="container">
      <section
        class="section is-size-1 is-size-5-mobile has-text-grey has-text-centered"
        v-if="noEvents"
      >
        ¯\_(ツ)_/¯ <br />There are no events matching your criteria. Try
        adjusting or
        <router-link :to="{ path: '/' }">resetting</router-link> your search
        criteria.
      </section>
      <div class="columns" v-else>
        <div class="column is-one-third">
          <section class="section">
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
                  <img :src="prettyIcon(event.topicCode)" />
                </figure>
              </div>
              <div class="column">
                <h2 class="title is-5 is-uppercase">
                  <a
                    class="has-text-dark"
                    rel="nofollow"
                    target="_blank"
                    :href="event.url"
                    >{{ event.name }}
                  </a>
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
                <div class="column" v-if="more">
                  <a
                    class="button is-small is-pulled-left"
                    @click="moreEvents()"
                    >Show more</a
                  >
                </div>
                <div class="column">
                  <span class="is-size-7 is-pulled-right">
                    <Stats />
                  </span>
                </div>
              </div>
            </nav>
          </section>
        </div>
      </div>
    </div>
    <PopupMessage />
  </div>
</template>

<script>
import { prettyIcon } from "@/utils/topics";
import { formatRange, formatCfp } from "@/utils/dates";
import navigationMixins from "@/mixins/navigation";
import filteringMixins from "@/mixins/filtering";

import { mapState, mapActions } from "vuex";
import Topics from "./Topics";
import Continents from "./Continents";
import Countries from "./Countries";
import PopupMessage from "./PopupMessage";
import Header from "./Header";
import Stats from "./Stats";
import Papers from "./Papers";

export default {
  components: {
    PopupMessage,
    Header,
    Continents,
    Countries,
    Topics,
    Papers,
    Stats
  },
  mixins: [...filteringMixins, ...navigationMixins],
  created() {
    this.fetchEvents().then(() => this.$emit("updateHead"));
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
    formatRange,
    formatCfp,
    prettyIcon,
    ...mapActions(["fetchEvents", "moreEvents"])
  },
  computed: {
    ...mapState(["events", "topics", "more", "noEvents"])
  }
};
</script>
<style scoped lang="scss">
a {
  color: #42b983;
}
</style>
