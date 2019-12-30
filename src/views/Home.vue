<template>
  <div class="home">
    <header class="header">
      <section class="section">
        <div class="container">
          <div class="columns">
            <div class="column is-half has-text-centered-mobile">
              <a href="/"
                ><h1 class="title is-size-5-mobile">
                  dev<span class="has-text-success">.</span>events
                </h1></a
              >
            </div>
            <div class="column is-half">
              <a class="button is-pulled-right">
                <span class="icon">
                  <i class="fa fa-plus"></i>
                </span>
                <span>Add Event</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </header>
    <Events />
    <!-- <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Developed at night by
          <a
            href="https://instagram.com/coding_unicorn"
            rel="noreferrer"
            target="_blank"
            >Coding Unicorn</a
          >
          under caffeine. No ads, open source.
        </p>
      </div>
      <div class="columns is-centered is-mobile">
        <div class="column is-narrow">
          <div class="buttons has-text-centered">
            <a
              rel="noreferrer"
              href="https://instagram.com/coding_unicorn"
              target="_blank"
              class="button"
            >
              <span class="icon is-small"
                ><i class="fab fa-instagram"></i
              ></span>
              <span>Follow me</span></a
            >
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script>
import Events from "@/components/Events.vue";

export default {
  name: "home",
  components: {
    Events
  }
};
</script>
