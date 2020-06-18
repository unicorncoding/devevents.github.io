<template>
  <div>
    <Header />
    <header class="container">
      <section class="section">
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-half-desktop is-full-mobile has-text-centered-mobile"
          ></div>
          <div class="column is-half-desktop is-full-mobile">
            <Continents />
            <div class="is-pulled-right">
              <div class="select is-small" @change="sortingChanged()">
                <select
                  v-model="$store.state.sorting"
                  class="is-borderless has-background-white"
                >
                  <option value="newestFirst">Newest first</option>
                  <option value="cheapestFirst">Cheapest first</option>
                  <option value="startDate">Sort by date</option>
                </select>
              </div>
            </div>
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
          </div>
        </div>
      </section>
    </header>
    <div class="container">
      <section
        class="section is-size-1 is-size-5-mobile has-text-grey has-text-centered"
        v-if="noEvents"
      >
        ¯\_(ツ)_/¯ <br />There are no events matching your criteria. Try
        adjusting or
        <router-link
          :to="{
            params: {
              continent: $route.params.continent,
              country: undefined,
              topic: undefined
            }
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
              :key="event.id"
            >
              <JsonLd :event="event" />
              <div class="column is-one-quarter">
                <span
                  class="has-text-grey is-size-7"
                  v-if="$store.state.sorting === 'newestFirst'"
                >
                  <span>
                    added
                    {{ formatCreationDate(event.creationDate) }}
                  </span>
                  <br />
                </span>
                <time class="has-text-weight-bold is-size-7-mobile">
                  {{ formatRange(event.startDate, event.endDate) }}
                  <span
                    class="has-text-grey is-size-7 is-relative"
                    style="top: -5px"
                  >
                    {{ year(event.startDate) }}
                  </span>
                </time>
                <br />
              </div>
              <div class="column is-narrow">
                <figure class="image is-32x32">
                  <img
                    :src="'/icons/topics/' + event.topics[0] + '.png'"
                    :alt="event.topic"
                    class="icon"
                  />
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
                  <span v-if="isAdmin">
                    <a class="tag is-borderless" @click="deleteEvent(event.id)">
                      <font-awesome-icon icon="times" class="has-text-danger" />
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
                  <ManyTopics :topics="event.topics" />
                  conference
                  <span v-if="!isOnline"
                    >in
                    {{
                      event.city +
                        (event.stateCode ? `, ${event.stateCode}` : "")
                    }},
                    <router-link
                      :to="route('events', { country: event.countryCode })"
                    >
                      {{ event.country }}
                    </router-link>
                  </span>
                </h3>
                <h3 class="title is-7 has-text-grey-light">
                  <span v-if="event.free === true">
                    FREE
                  </span>
                  <span v-if="event.free === false && event.localPrice">
                    {{ event.localPrice.curr }}
                    {{ event.localPrice.from }}
                    {{
                      !event.localPrice.to ||
                      event.localPrice.from === event.localPrice.to
                        ? ""
                        : ` — ${event.localPrice.to}`
                    }}
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
    <Footer v-if="doneFetching" />
  </div>
</template>

<script>
import { formatRange, formatCfp, formatCreationDate } from "@/utils/dates";
import navigationMixins from "@/mixins/navigation";
import filteringMixins from "@/mixins/filtering";
import dayjs from "dayjs";

import { mapState, mapActions, mapGetters } from "vuex";
import Topics from "./Topics";
import Continents from "./Continents";
import ManyTopics from "./ManyTopics";
import Countries from "./Countries";
import Header from "./Header";
import PlusButton from "./PlusButton";
import PagingStats from "./PagingStats";
import JsonLd from "./JsonLd";
import Footer from "./Footer";

export default {
  components: {
    Header,
    Continents,
    Countries,
    Topics,
    ManyTopics,
    PagingStats,
    PlusButton,
    JsonLd,
    Footer
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
            " conferences in " +
            this.locationName() +
            ` ${this.years()}`
          : "Online " +
            (this.topicName() ? this.topicName() : "developer") +
            " conferences" +
            ` ${this.years()}`
      };
    }
  },
  methods: {
    year(date) {
      return dayjs(date).year();
    },
    years() {
      const yearNow = dayjs().year();
      const yearNext = dayjs()
        .add(1, "year")
        .year();
      return `${yearNow}/${yearNext}`;
    },
    sortingChanged() {
      this.fetchEvents();
    },
    categoryVisibilityChanged(categoriesVisible) {
      this.categoriesVisible = categoriesVisible;
    },
    toggleCategories() {
      this.forceShowCategories = !this.forceShowCategories;
    },
    formatRange,
    formatCreationDate,
    formatCfp,
    ...mapActions(["fetchEvents", "moreEvents", "deleteEvent"])
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
