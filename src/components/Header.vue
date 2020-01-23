<template>
  <header class="container">
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
              <slot />
          </div>
        </div>
      </div>
    </section>
  </header>
</template>