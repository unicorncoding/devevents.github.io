<template>
  <div class="conference-about has-background-black" v-if="event">
    <div>
      <Header />
      <section class="hero is-black">
        <div class="hero-body">
          <div class="container">
            <div class="columns" style="align-items: flex-end; !important">
              <div class="column">
                <div class="columns is-mobile">
                  <div class="column is-narrow">
                    <figure class="image is-96x96" v-if="event.twitter">
                      <img
                        class="is-rounded"
                        style="border: 3px solid white"
                        :src="'https://twitter-avatar.now.sh/' + event.twitter"
                      />
                    </figure>
                    <avatar
                      v-else
                      :username="event.name"
                      :size="128"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                    ></avatar>
                  </div>
                  <div class="column">
                    <h1 class="title is-3 has-text-weight-normal">
                      {{ event.name }}
                    </h1>
                    <h2 class="subtitle" style="margin-bottom: 10px">
                      <span v-if="event.countryCode === 'ON'">
                        Online
                      </span>
                      <ManyTopics :topics="event.topics" /> conference
                      <span v-if="event.countryCode !== 'ON'">
                        in {{ event.city }}, {{ event.country }}</span
                      >
                      <br />
                      <time class="has-text-weight-bold is-size-6">
                        {{ formatRange(event.startDate, event.endDate) }}
                        {{ year(event.startDate) }}
                      </time>
                    </h2>
                    <br />
                    <div class="buttons">
                      <AddToCalendar :event="event" />
                      <ShareButtons :event="event" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="column has-text-centered has-text-right-desktop">
                <span class="has-text-grey">Website: </span>
                <a
                  style="margin-right: 1.5em"
                  class="has-text-white"
                  rel="nofolllow"
                  target="_blank"
                  :href="event.url"
                  >{{ noProtocol(event.url) }}</a
                >
                <span v-if="event.twitter" class="has-text-grey"
                  >Twitter:
                </span>
                <a
                  rel="nofolllow"
                  class="has-text-white"
                  target="_blank"
                  :href="'https://twitter.com/' + event.twitter"
                  >@{{ event.twitter }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="iframe-wrapper is-relative" v-if="event.previewAvailable">
      <loading
        background-color="#000000"
        color="#ffffff"
        :height="250"
        :width="250"
        :is-full-page="false"
        :active="!frameLoaded"
      ></loading>
      <iframe
        sandbox="allow-same-origin allow-popups allow-scripts"
        :src="normalized(event.url)"
        @load="iframeLoaded"
      />
    </div>
    <div v-else>
      <section
        class="has-text-white section is-size-1 is-size-3-mobile has-text-centered"
      >
        ¯\_(ツ)_/¯ <br /><br />Preview is not available. <br />Visit
        conference's website directly:
        <br />
        <br />
        <a
          class="button is-large is-link is-outlined"
          :href="event.url"
          rel="nofollow"
          target="_blank"
          >Website</a
        >
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
.conference-about {
  height: 100vh;
}
.iframe-wrapper {
  height: 1200px;
  width: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
<script>
import normalizeUrl from "normalize-url";
import dayjs from "dayjs";
import Avatar from "vue-avatar";
import lazyAxios from "../utils/axios";
import Header from "./Header";
import ShareButtons from "./ShareButtons";
import AddToCalendar from "./AddToCalendar";
import Loading from "vue-loading-overlay";
import ManyTopics from "./ManyTopics";

import { formatRange } from "@/utils/dates";
export default {
  data: () => {
    return {
      frameLoaded: false,
      event: undefined
    };
  },
  created() {
    const id = this.$route.params.id;
    lazyAxios()
      .then(axios => axios.get(`/events/fetch/${id}`))
      .then(({ data }) => (this.event = data))
      .then(() => this.$emit("updateHead"));
  },
  head: {
    title: function() {
      return {
        separator: "|",
        complement: "dev.events",
        inner: this.event ? this.event.name : ""
      };
    }
  },
  methods: {
    normalized(url) {
      return normalizeUrl(url, { forceHttps: true });
    },
    noProtocol(url) {
      return normalizeUrl(url, { stripProtocol: true });
    },
    iframeLoaded() {
      this.frameLoaded = true;
    },
    year(date) {
      return dayjs(date).year();
    },
    formatRange
  },
  components: {
    Header,
    Avatar,
    ManyTopics,
    Loading,
    AddToCalendar,
    ShareButtons
  }
};
</script>
