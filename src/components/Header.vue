<template>
  <header class="container">
    <section class="section">
      <div class="container">
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-half-desktop is-full-mobile has-text-centered-mobile"
          >
            <div class="columns is-vcentered">
              <div class="column is-narrow">
                <h1 class="title is-size-5-mobile">
                  <a href="/"
                    >dev<span class="has-text-success">.</span>events</a
                  >
                </h1>
              </div>
              <div class="column is-narrow">
                <a
                  class="icon"
                  href="https://github.com/unicorncoding/devevents-web"
                  rel="nofollow"
                  target="_blank"
                >
                  <i class="fab fa-github"></i>
                </a>
                <a
                  class="icon"
                  href="https://twitter.com/dev_events"
                  rel="nofollow"
                  target="_blank"
                >
                  <i class="fab fa-twitter"></i>
                </a>
                <a href="mailto:hello@dev.events">
                  <span class="icon">
                    <i class="far fa-envelope"></i>
                  </span>
                </a>                
                <a class="icon" @click="copyRssLink()">
                  <i class="fas fa-rss"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="column is-half-desktop is-full-mobile">
            <slot />
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    copyRssLink() {
      const rssLink = "https://dev.events/api/events/rss" + this.$route.fullPath;
      this.$copyText(rssLink).then(
        () => {
          this.$notify({
            ignoreDuplicates: true,
            title: "Copied",
            type: "success",
            text: rssLink
          });
        },
        () => {
          this.$notify({
            ignoreDuplicates: true,
            title: "Unable to copy the link",
            type: "error",
            duration: -1,
            text: rssLink
          });
        }
      );
    }
  }
};
</script>
