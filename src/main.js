import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Notifications from "vue-notification";
Vue.use(Notifications);

import { sync } from "vuex-router-sync";
sync(store, router);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
