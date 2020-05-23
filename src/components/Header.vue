<template>
  <div>
    <div role="navigation" aria-label="main navigation">
      <div class="container">
        <section class="section">
          <div class="columns is-vcentered is-gapless is-mobile">
            <div class="column">
              <h1 class="title is-size-4" style="letter-spacing: -2px">
                <router-link
                  class="has-text-white"
                  :to="{
                    name: 'events',
                    params: { continent: $route.params.continent }
                  }"
                  >dev<span class="has-text-success">.</span
                  ><span class="has-text-weight-normal"
                    >events</span
                  ></router-link
                >
              </h1>
            </div>
            <div class="column" v-if="isSignedIn">
              <div class="columns is-mobile is-pulled-right">
                <div class="column is-narrow">
                  <figure class="image is-24x24">
                    <img class="is-rounded" :src="user.photoURL" />
                  </figure>
                </div>
                <div class="column is-narrow">
                  <span class="has-text-light is-size-7">
                    {{ username }}
                    <span class="has-text-weight-bold"
                      >({{ karma }})</span
                    ></span
                  >
                </div>
                <div class="column is-narrow">
                  <a class="has-text-light is-size-7" @click="signOut()"
                    >log out</a
                  >
                </div>
              </div>
            </div>
            <div class="column has-text-right" v-else>
              <Login />
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
<script>
import Login from "../components/Login";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("karma", ["fetch"]),
    ...mapActions("auth", ["signOut"])
  },
  created() {
    this.fetch();
  },
  computed: {
    ...mapGetters("auth", ["isSignedIn", "isAdmin", "username"]),
    ...mapState("karma", {
      karma: state => state.karma
    }),
    ...mapState("auth", {
      user: state => state.user
    })
  },
  components: { Login }
};
</script>
<style lang="scss" scoped>
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
