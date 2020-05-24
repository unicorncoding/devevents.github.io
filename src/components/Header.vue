<template>
  <div>
    <div role="navigation" aria-label="main navigation">
      <div class="container">
        <section class="section">
          <div class="columns is-vcentered is-mobile">
            <div class="column is-narrow">
              <h1
                class="title is-size-4 is-size-6-mobile"
                style="letter-spacing: -2px"
              >
                <span class="has-text-white-ter" style="white-space:nowrap"
                  >dev<span class="has-text-success">.</span
                  ><span class="has-text-weight-normal">events</span></span
                >
                >
              </h1>
            </div>
            <div class="column is-narrow">
              <span class="has-text-white" href="#"></span>
            </div>
            <div class="column is-narrow">
              <router-link
                class="has-text-white-ter is-size-7-mobile"
                :class="{ 'has-text-weight-bold': !$route.params.cfp }"
                :to="{ name: 'confs' }"
                >Conferences</router-link
              >
            </div>
            <div class="column is-narrow">
              <router-link
                class="has-text-white-ter is-size-7-mobile"
                :class="{ 'has-text-weight-bold': $route.params.cfp }"
                :to="{ name: 'confs', params: { cfp: 'cfp' } }"
                >CFPs</router-link
              >
            </div>
            <!-- <div class="column is-narrow">
              <router-link
                class="has-text-white-ter is-size-7-mobile"
                :class="{ 'has-text-weight-bold': $route.name === 'training' }"
                :to="{ name: 'training' }"
                >Training</router-link
              >
            </div> -->
            <div class="column" v-if="isSignedIn">
              <div class="columns is-mobile is-pulled-right">
                <div class="column is-narrow is-hidden-mobile">
                  <span class="has-text-light is-size-7">
                    <font-awesome-icon :icon="['far', 'heart']" />
                    &nbsp;
                    <span class="has-text-weight-bold">{{ karma }}</span></span
                  >
                </div>
                <div class="column is-narrow">
                  <div class="dropdown is-hoverable is-right">
                    <div class="dropdown-trigger">
                      <figure
                        class="image is-24x24"
                        v-if="user.photoURL"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                      >
                        <img class="is-rounded" :src="user.photoURL" />
                      </figure>
                      <avatar
                        v-else
                        :username="username"
                        :size="24"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                      ></avatar>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <div class="dropdown-item">
                          <p>
                            You have <strong>{{ karma }}</strong> karma points.
                          </p>
                        </div>
                        <hr class="dropdown-divider" />
                        <a class="dropdown-item" @click="signOut()">log out</a>
                      </div>
                    </div>
                  </div>
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
import Avatar from "vue-avatar";
import { mapState, mapGetters, mapActions } from "vuex";
import mixins from "@/mixins/navigation";
export default {
  mixins: mixins,
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
  components: { Login, Avatar }
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
