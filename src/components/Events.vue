<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4">
        <div class="dropdown" :class="{ 'is-active': active['continent'] }">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggle('continent')">
                <span class="icon">
                  <i class="fas fa-globe-europe"></i>
                </span>              
              <span>{{continents[continent]}}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a href="#" class="dropdown-item" v-for="(title, code) in continents" :key="code" @click="narrowEventsByContinent(code); toggle('continent')">
                <span>{{title}} </span>
                <span class="tag"> {{Math.floor(Math.random() * Math.floor(150))}}</span>
              </a>
            </div>
          </div>
        </div>      
        <div class="dropdown">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Any country</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a href="#" class="dropdown-item" v-for="(title, code) in continents" :key="code">
                <span>{{title}} </span>
                <span class="tag"> {{Math.floor(Math.random() * Math.floor(150))}}</span>
              </a>
            </div>
          </div>
        </div>            
      </div>
      <div class="column is-8">
        <section v-for="event in events" :key="event.name + event.startDate" style="padding: 10px">
          <!-- <div class="column"> -->
            <div class="columns is-mobile">
              <div class="column is-3">
                <span class="is-size-6 has-text-weight-bold">
                  {{ format(event.startDate, event.endDate) }}
                </span>
                <br />
                <a
                  class="has-text-grey is-size-7"
                  :href="event.cfpUrl"
                  v-if="event.cfpUrl"
                >
                  {{ formatCfp(event.cfpEndDate) }}
                </a>
              </div>
              <div class="column is-narrow">
                <figure class="image is-32x32">
                  <img :src="icon(event.topic)" />
                </figure>
              </div>
              <div class="column">
                <h2 class="title is-5 is-uppercase">
                  <a class="has-text-dark" href="#">{{ event.name }} </a>
                </h2>
                <h3 class="subtitle is-6">
                  <a href="#">{{ topic(event.topic) }}</a>
                  {{ event.category }} in <a href="#">{{ event.city }}</a
                  >, <a href="#">{{ event.country }}</a>
                </h3>
              </div>
            </div>
          <!-- </div> -->
        </section>
        <br>
        <nav class="has-text-centered">
          <div class="columns">
            <div class="column" v-if="hasMore">
              <a class="button is-small is-pulled-left" @click="moreEvents()">Show more</a>
            </div>
            <div class="column">
              <span class="is-size-7 is-pulled-right">showing {{ shown }} out of {{ total }} events</span>
            </div>
          </div>
        </nav>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import { geekify } from "@/utils/utils";
import { mapState, mapActions } from "vuex";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default {
  created() {
    this.fetchEvents();
  },
  data: function () {
    return {
      "active": {
        "continent": false
      }
    }
  },  
  methods: {
    toggle: function(popup) {
      this.active[popup] = !this.active[popup];
    },
    icon: function(topic) {
      const moreInfo = geekify(topic);
      return moreInfo ? moreInfo.icon : "";
    },
    topic: function(topic) {
      const moreInfo = geekify(topic);
      const capitalize = it => it.charAt(0).toUpperCase() + it.slice(1);
      return moreInfo ? moreInfo.topic : capitalize(topic);
    },
    formatCfp: function(cfpDate) {
      const cfp = dayjs(cfpDate);
      if (cfp.diff(dayjs(), "days") > 0) {
        return dayjs(cfpDate).fromNow(true) + " to submit a talk";
      }
      return "";
    },
    format: function(startDate, endDate) {
      const fmtWithYearIfNeeded = (date, pattern) => {
        const thisYear = date.year() === dayjs().year();
        if (thisYear) {
          return date.format(pattern);
        } else {
          return date.format(pattern + " YYYY");
        }
      };
      const start = dayjs(startDate);
      const oneDayEvent = !endDate || endDate === startDate;
      if (oneDayEvent) {
        return fmtWithYearIfNeeded(start, "MMM D");
      } else {
        const end = dayjs(endDate);
        const sameMonth = start.month() == end.month();
        if (sameMonth) {
          return fmtWithYearIfNeeded(end, `MMM ${start.format("D")}-D`);
        } else {
          return (
            start.format("MMM D") + " - " + fmtWithYearIfNeeded(end, "MMM D")
          );
        }
      }
    },
    ...mapActions(["fetchEvents", "moreEvents", "narrowEventsByContinent"])
  },
  computed: mapState(["events", "total", "shown", "hasMore", "continent", "continents"])
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
