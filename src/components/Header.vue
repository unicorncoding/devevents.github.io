<template>
  <div>
    <div
      role="navigation"
      class="has-background-black"
      aria-label="main navigation"
    >
      <div class="container">
        <section class="section">
          <div class="columns is-vcentered is-mobile">
            <div class="column is-narrow">
              <router-link :to="{ path: '/' }">
                <h1
                  class="title is-size-4 is-size-6-mobile"
                  style="letter-spacing: -2px"
                >
                  <span class="has-text-white-ter has-text-nowrap"
                    >dev<span class="has-text-success">.</span
                    ><span class="has-text-weight-normal">events</span></span
                  >
                </h1>
              </router-link>
            </div>
            <div class="column is-narrow">
              <span class="has-text-white" href="#"></span>
            </div>
            <div class="column is-narrow">
              <router-link
                class="has-text-white-ter is-size-7-mobile"
                :class="{
                  'has-text-weight-bold':
                    $route.name === 'confs' || $route.name === 'conf'
                }"
                :to="{ path: '/' }"
                >Conferences</router-link
              >
            </div>
            <div class="column is-narrow">
              <router-link
                class="has-text-white-ter is-size-7-mobile"
                :class="{
                  'has-text-weight-bold':
                    $route.name === 'courses' || $route.name === 'course'
                }"
                :to="{ name: 'courses' }"
                >Training &amp; certification</router-link
              >
            </div>
            <div class="column" v-if="isSignedIn">
              <div class="columns is-mobile is-pulled-right">
                <div class="column is-narrow">
                  <div class="dropdown is-hoverable is-right">
                    <div class="dropdown-trigger">
                      <figure
                        class="image is-24x24"
                        v-if="user.photoURL"
                        aria-haspopup="true"
                        aria-controls="user-menu"
                      >
                        <img
                          class="is-rounded"
                          alt="Your avatar"
                          :src="user.photoURL"
                        />
                      </figure>
                      <avatar
                        v-else
                        :username="username"
                        :size="24"
                        aria-haspopup="true"
                        aria-controls="user-menu"
                      ></avatar>
                    </div>
                    <div
                      class="dropdown-menu user-menu"
                      id="user-menu"
                      role="menu"
                    >
                      <div class="dropdown-content">
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
  </div>
</template>
<script>
import Login from "../components/Login";
import Avatar from "vue-avatar";
import { mapState, mapGetters, mapActions } from "vuex";
import mixins from "@/mixins/navigation";
export default {
  mixins,
  methods: {
    ...mapActions("auth", ["signOut"])
  },
  created() {},
  computed: {
    ...mapGetters("auth", ["isSignedIn", "isAdmin", "username"]),
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
  // border-bottom: 1px solid hsl(0, 0%, 96%);
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
