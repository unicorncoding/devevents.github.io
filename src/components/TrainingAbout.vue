<template>
  <div class="training-about">
    <JsonLd :course="course" />
    <Header />
    <section class="hero is-medium is-black">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1 has-text-weight-normal">
            {{ course.title }}
          </h1>
          <h2 class="subtitle">
            {{ course.subtitle }}
          </h2>
          <FiveStars />
          <br /><br />
          <div class="buttons">
            <button class="button is-link" @click="scrollIntoView('offers')">
              Book now
            </button>
            <button class="button is-outlined" @click="scrollIntoView('info')">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="info section grad">
      <div class="container">
        <div class="content is-medium" v-html="course.html" />
      </div>
    </section>
    <section class="section" v-if="course.recommendations">
      <div class="container">
        <h1 class="title">What people say?</h1>
        <div class="columns is-multiline">
          <div
            class="column is-one-third"
            v-for="recommendation in course.recommendations"
            v-bind:key="recommendation.title"
          >
            <div class="box is-shadowless is-borderless">
              <div class="columns is-multiline">
                <div class="column is-narrow">
                  <figure class="image is-32x32">
                    <img
                      class="is-rounded"
                      :src="recommendation.head"
                      :alt="'Face of an endorser named ' + recommendation.title"
                    />
                  </figure>
                </div>
                <div class="column has-text-weight-bold">
                  {{ recommendation.title }}
                </div>
                <div class="column is-full">
                  "{{ recommendation.text }}"
                  <FiveStars />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="offers section is-large grad">
      <div class="container">
        <h1 class="title">Upcoming Masterclass</h1>
        <h2 class="subtitle">
          The price will increase as the training approaches. Enroll today.
        </h2>
        <Offers :course="course" />
      </div>
    </section>

    <div
      class="trainer"
      :style="'background-image: url(' + course.trainer.background + ')'"
    >
      <section class="section is-large">
        <div class="container has-text-centered has-text-white">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <h1 class="is-1 title has-text-white-ter has-text-weight-normal ">
                {{ course.trainer.title }}
              </h1>
              <br />
              <h2
                class="subtitle has-text-weight-bold has-text-white-ter is-uppercase"
              >
                Consultant, Trainer, Speaker
                <a class="has-text-white" :href="course.trainer.twitter">
                  <font-awesome-icon
                    :icon="['fab', 'twitter']"
                    title="Link to Twitter profile"
                  />
                </a>
                &nbsp;
                <a class="has-text-white" :href="course.trainer.linkedin">
                  <font-awesome-icon
                    :icon="['fab', 'linkedin']"
                    title="Link to LinkedIn profile"
                  />
                </a>
              </h2>
              <p class="is-space-preline" v-html="course.trainer.about" />
              <hr />
              <blockquote v-if="course.trainer.quote">
                "{{ course.trainer.quote }}"
              </blockquote>
              <img
                v-if="course.trainer.signature"
                class="is-pulled-right"
                alt="Signature of the trainer"
                style="width: 70px; filter: invert(100%)"
                :src="course.trainer.signature"
              />
              <br />
              <br />
              <button class="button is-outlined" @click="toggleVideo()">
                Watch {{ trainersName() }} in action
              </button>
              <div class="modal" :class="{ 'is-active': videoOpen }">
                <div class="modal-background"></div>
                <div class="modal-content">
                  <div class="videoWrapper">
                    <iframe
                      :src="
                        'https://www.youtube-nocookie.com/embed/' +
                          course.trainer.videoId +
                          '?modestbranding=1&showinfo=0&rel=0'
                      "
                    />
                  </div>
                </div>
                <button
                  @click="toggleVideo()"
                  class="modal-close is-large"
                  aria-label="close"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <footer class="footer has-background-black">
      <div class="container">
        <font-awesome-icon :icon="['far', 'envelope']" />
        &nbsp;
        <a class="has-text-white" href="mailto:hello@dev.events"
          >hello@dev.events</a
        >
        <br />
        <font-awesome-icon :icon="['fab', 'telegram-plane']" />
        &nbsp;
        <a class="has-text-white" href="https://t.me/eduardsi"
          >+371 288 14 170 (Telegram)</a
        >
        <div class="has-text-centered has-text-grey-light">
          © DevCapital OÜ, 12194848, J. Koorti tn 16-20, Tallinn, Estonia
          <br />
          All rights reserved.
          <br />
          2015 – {{ new Date().getFullYear() }}.
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import Header from "./Header";
import Offers from "./Offers";
import FiveStars from "./FiveStars";
import JsonLd from "./TrainingJsonLd";
import mixins from "@/mixins/navigation";
import { courseByCodename } from "../courses";
export default {
  mixins,
  data: () => {
    return {
      videoOpen: false,
      course: undefined
    };
  },
  created() {
    const codename = this.$route.params.codename;
    this.course = courseByCodename(codename);
  },
  methods: {
    toggleVideo() {
      this.videoOpen = !this.videoOpen;
      const html = document.documentElement;
      if (this.videoOpen) {
        html.classList?.add("is-clipped");
      } else {
        html.classList?.remove("is-clipped");
      }
    },
    trainersName() {
      return this.course.trainer.title.split(" ")[0];
    }
  },
  head: {
    title: function() {
      return {
        separator: "|",
        complement: "Training and certification course",
        inner: `${this.course.title} by ${this.course.trainer.title}`
      };
    }
  },
  components: { Header, FiveStars, Offers, JsonLd }
};
</script>
<style lang="scss" scoped>
@import "bulma/sass/utilities/_all";

$light-text: hsl(0, 0%, 45%);

.grad {
  background: linear-gradient(60deg, #f2f3f4 50%, #fafbfc 50%);
}

.trainer {
  margin-top: 0 !important;
  background-position: center center;
  background-size: cover;
  background-attachment: scroll;
  background-color: rgba(0, 0, 0, 0.65);
  background-blend-mode: darken;
}

.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}

.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.content::v-deep {
  h1 {
    margin: 1em 0;
  }
  hr {
    margin: 50px 0;
    background: none;
  }

  p {
    color: $light-text;
  }

  h1,
  h2,
  h3,
  h4 {
    letter-spacing: -1px !important;
  }
  ul {
    list-style-type: none;
  }
  ul li {
    color: $light-text;
  }
  ul li:before {
    content: "✔️";
    font-weight: 900;
    display: inline-block;
    margin-left: -1.3em;
    width: 1.3em;
  }
}
@include desktop {
  .container {
    padding: 0 150px;
  }
  .trainer {
    // fixed doesn't work on iPads
    // https://stackoverflow.com/questions/24154666/background-size-cover-not-working-on-ios
    background-attachment: fixed !important;
  }
}
</style>
