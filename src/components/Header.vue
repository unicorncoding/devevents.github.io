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
                  <router-link :to="{ path: '/' }"
                    >dev<span class="has-text-success">.</span
                    >events</router-link
                  >
                </h1>
              </div>
              <div class="column is-narrow is-hidden-touch">
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
