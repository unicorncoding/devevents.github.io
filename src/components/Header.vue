<template>
  <header class="container">
    <section class="section">
      <div class="container">
        <div class="columns is-multiline is-mobile">
          <div
            class="column is-half-desktop is-full-mobile has-text-centered-mobile"
          >
            <a href="/"
              ><h1 class="title is-size-5-mobile">
                dev<span class="has-text-success">.</span>events
              </h1></a
            >
          </div>
          <div class="column is-half-desktop is-full-mobile">
            <slot />
          </div>
        </div>
      </div>
    </section>
  </header>
</template>
