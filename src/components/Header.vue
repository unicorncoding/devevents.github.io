<template>
  <div>
    <div role="navigation" aria-label="main navigation">
      <div class="container">
        <section class="section">
          <div class="columns is-vcentered is-gapless">
            <div class="column is-narrow">
              <h1 class="title is-size-5">
                <router-link
                  class="has-text-white-ter"
                  :to="{
                    name: 'events',
                    params: { continent: $route.params.continent }
                  }"
                  >dev<span class="has-text-success">.</span>events</router-link
                >
              </h1>
            </div>
          </div>
        </section>
      </div>
    </div>
    <header class="container">
      <section class="section">
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-half-desktop is-full-mobile has-text-centered-mobile"
          ></div>
          <div class="column is-half-desktop is-full-mobile">
            <slot />
          </div>
        </div>
      </section>
    </header>
  </div>
</template>
<style lang="scss" scoped>
h1 {
  font-family: "Ubuntu", sans-serif;
}
.has-text-success {
  color: #42b983;
}
div[role="navigation"] {
  padding: 1em;
  background-color: #363636;
  border-bottom: 1px solid hsl(0, 0%, 96%);
  .container {
    margin-top: 0;
    margin-bottom: 0;
  }
  section {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
