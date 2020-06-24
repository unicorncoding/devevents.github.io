<template>
  <div class="conference-about has-background-black-bis" v-if="event">
    <div>
      <Header />
      <section class="hero is-black">
        <div class="hero-body">
          <div class="container">
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
                  <ManyTopics :topics="event.topics" /> conference in
                  {{ event.city }}, {{ event.country }}
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
        </div>
      </section>
    </div>
    <div class="iframe-wrapper is-relative">
      <loading
        background-color="#000000"
        :height="250"
        :width="250"
        :is-full-page="false"
        :active="!frameLoaded"
      ></loading>
      <iframe :src="normalized(event.url)" @load="iframeLoaded" />
    </div>
  </div>
</template>
<style scoped lang="scss">
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
      .then(({ data }) => (this.event = data));
  },
  methods: {
    normalized(url) {
      return normalizeUrl(url, { forceHttps: true });
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
