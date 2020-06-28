<template>
  <div class="columns is-multiline">
    <div class="column" v-for="offer in course.offers" v-bind:key="offer.name">
      <div class="box has-text-centered">
        <h1 class="title is-5">{{ offer.name }}</h1>
        <h2 class="subtitle is-6">{{ offer.date }}</h2>
        € {{ offer.price }}
        <span class="is-striked">{{
          Math.round(offer.price + (offer.price * 20) / 100)
        }}</span>
        <br />
        <h2 class="subtitle has-text-grey-dark is-size-7">
          <span>{{ offer.priceHint }}</span>
        </h2>
        <button v-if="offer.soldOut" disabled class="button is-link">
          Sold out
        </button>
        <a v-else class="button is-link" :href="bookingLink(course, offer)"
          >Book now</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  methods: {
    bookingLink(course, offer) {
      return (
        offer.bookingLink ||
        `https://form.jotform.com/201642020219036?training=${course.title}&offer=${offer.name}`
      );
    }
  }
};
</script>
