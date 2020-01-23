<template>
  <div>
    <Header>
      <div class="is-pulled-right">
        <Locations />
        <div class="field is-pulled-right">        
          <input class="is-checkradio is-small" type="checkbox" id="speakers" name="speakers" v-model="cfpMode">
          <label for="speakers" style="margin-right: 0; padding-right: 0">Speaking gigs</label>
        </div>      
      </div>
    </Header>
    <div class="container">
      <div class="columns">
        <div class="column is-one-third">
          <section class="section">     
            <div v-for="t in allTopics" :key="t" style="margin-bottom: 0.5em">
              <img :src="prettyIcon(t)" style="height:1em" />
              {{prettyTopic(t)}}
              <span class="tag">13</span>
            </div>            
          </section>
        </div>
        <div class="column is-two-thirds">
          <section class="section" v-if="noEvents">
            <img src="https://img.icons8.com/cute-clipart/512/000000/nothing-found.png"/>
          </section>
          <section class="section" v-else>
            <div
              class="columns is-mobile"
              v-for="event in events"
              :key="event.name + event.startDate + event.countryCode + event.topic"
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
                  v-if="event.cfpUrl"
                >
                  {{ formatCfp(event.cfpEndDate) }}
                </a>
              </div>
              <div class="column is-narrow">
                <figure class="image is-32x32">
                  <img :src="prettyIcon(event.topic)" />
                </figure>
              </div>
              <div class="column">
                <h2 class="title is-5 is-uppercase">
                  <a class="has-text-dark" rel="nofollow" target="_blank" :href="event.url">{{ event.name }} </a>
                </h2>
                <h3 class="subtitle is-6">
                  <a href="#">{{ prettyTopic(event.topic) }}</a>
                  {{ event.category }} in {{ event.city }}, 
                    <router-link
                      :to="newLocation(event.countryCode)"
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
                <div class="column" v-if="hasMore">
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
  </div>
</template>

<script>
import { prettyTopic, prettyIcon } from "@/utils/topics"
import { formatRange, formatCfp } from "@/utils/dates";
import mixins from "@/mixins/navigation";

import { mapState, mapActions } from "vuex";
import Locations from "./Locations";
import Header from "./Header";
import Stats from "./Stats";

export default {
  components: { Header, Locations, Stats },
  mixins: mixins,
  created() {
    this.fetchEvents();
  },
  watch: {
    $route: "fetchEvents"
  },
  methods: {
    formatRange,
    formatCfp,
    prettyTopic,
    prettyIcon,
    ...mapActions(["fetchEvents", "moreEvents"])
  },
  computed: {
    allTopics() {
      const topics = this.events.map(it => it.topic);
      const uniqueTopics = [...new Set(topics)]; 
      return uniqueTopics;
    },
    cfpMode: {
    get () {
      return this.$store.state.route.params.cfp;
    },
    set (cfpMode) {
      if (cfpMode) {
        const params = { ...this.$route.params, ...{ cfp: 'cfp' } }
        this.$router.push({ name: 'events', params: params })        
      } else {
        const params = { ...this.$route.params, ...{ cfp: undefined } }
        this.$router.push({ name: 'events', params: params })                
      }
    }
    },
    ...mapState([
      "events", 
      "hasMore",
      "noEvents"
    ])
  }
};
</script>
<style scoped lang="scss">
  a {
    color: #42b983;
  }
.switch[type=checkbox]:focus+label::after,
.switch[type=checkbox]:focus+label::before,
.switch[type=checkbox]:focus+label:after,
.switch[type=checkbox]:focus+label:before {
	outline: none;
}  
</style>
