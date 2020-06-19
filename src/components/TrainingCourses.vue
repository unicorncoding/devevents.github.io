<template>
  <div>
    <Header />
    <section class="hero is-medium is-black">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1 has-text-weight-normal">
            Training courses for professional software engineers.
          </h1>
          <h2 class="subtitle">
            Learn from experts. Earn a certificate. Boost your career.
          </h2>
          <span class="has-text-warning">
            <font-awesome-icon icon="star" />
            <font-awesome-icon icon="star" />
            <font-awesome-icon icon="star" />
            <font-awesome-icon icon="star" />
            <font-awesome-icon icon="star" />
          </span>
          <br /><br />
          <div class="buttons">
            <button class="button is-link" @click="scrollIntoView('courses')">
              See courses
            </button>
            <a
              class="button is-outlined"
              href="mailto:hello@dev.events?subject=Become a trainer"
              >Become a trainer</a
            >
          </div>
          <br />
        </div>
      </div>
    </section>
    <section
      class="courses section container"
      v-for="course in courses"
      v-bind:key="course.title"
    >
      <div class="columns is-multiline is-mobile">
        <div class="column is-full">
          <h1 class="course title is-1 has-text-weight-normal">
            <router-link
              class="has-text-black"
              :to="{ name: 'course', params: { codename: course.codename } }"
            >
              {{ course.title }}
            </router-link>
          </h1>
          <h2 class="subtitle">{{ course.subtitle }}</h2>
          <span class="tags">
            <span
              class="tag is-medium"
              v-for="tag in course.tags"
              v-bind:key="tag"
              >{{ tag }}</span
            >
          </span>
        </div>
        <div class="column is-one-third">
          <div class="columns">
            <div class="column is-narrow">
              <figure class="image is-96x96">
                <img class="is-rounded" :src="course.trainer.avatar" />
              </figure>
            </div>
            <div class="column">
              <h1 class="title is-5">
                {{ course.trainer.title }}
              </h1>
              <h2 class="subtitle is-size-6">
                {{ course.trainer.subtitle }}
              </h2>
            </div>
          </div>
        </div>
        <div class="column">
          <p class="is-size-5">
            {{ course.tldr }}
            <strong
              ><router-link
                class="is-link"
                :to="{ name: 'course', params: { codename: course.codename } }"
                >More...</router-link
              ></strong
            >
          </p>
        </div>
      </div>

      <Offers :course="course" />

      <hr />
    </section>
    <footer class="footer has-background-black">
      <div class="container">
        <h1 class="title has-text-centered has-text-white">FAQ</h1>
        <div class="columns is-variable is-8 has-text-centered is-multiline">
          <div class="column is-one-third">
            <h1 class="title is-4 has-text-weight-normal has-text-white">
              How do you choose the trainers?
            </h1>
            <p class="is-size-6 has-text-grey-light">
              We only work with trainers who can deliver practical, impactful,
              and high-energy workshops. All our trainers are industry experts
              with at least 360 hours of training experience.
            </p>
          </div>
          <div class="column is-one-third">
            <h1 class="title is-4 has-text-weight-normal has-text-white">
              Will I get a certificate?
            </h1>
            <p class="is-size-6 has-text-grey-light">
              For every completed training, you earn a verifiable certificate
              from our accredited European training center. After completing
              Scrum certification training, you get an additional certificate
              from Scrum Alliance or Scrum.org.
            </p>
          </div>
          <div class="column is-one-third">
            <h1 class="title is-4 has-text-weight-normal has-text-white">
              Can I get a discount?
            </h1>
            <p class="is-size-6 has-text-grey-light">
              We already negotiated the best prices and discounts with all our
              trainers, so you don't have to. Transparent and fixed prices
              guarantee that you never pay more than others.
            </p>
          </div>
          <div class="column is-one-third">
            <h1 class="title is-4 has-text-weight-normal has-text-white">
              What's the maximum group size for private training?
            </h1>
            <p class="is-size-6 has-text-grey-light">
              20 people is the maximum.
            </p>
          </div>
          <div class="column is-one-third">
            <h1 class="title is-4 has-text-weight-normal has-text-white">
              Does private training price include the speaker's travel expenses?
            </h1>
            <p class="is-size-6 has-text-grey-light">
              Yes, the price includes travel and accommodation expenses within
              EU.
            </p>
          </div>
        </div>
        <hr class="has-background-black-ter" />
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
import mixins from "@/mixins/navigation";
import Header from "./Header";
import Offers from "./Offers";
import { courses } from "../courses";
export default {
  mixins,
  data: () => {
    return {
      courses
    };
  },
  components: { Header, Offers }
};
</script>
<style lang="scss" scoped></style>
