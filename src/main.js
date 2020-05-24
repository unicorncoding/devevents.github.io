import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "firebaseui/dist/firebaseui.css";

import "intersection-observer";

import Notifications from "vue-notification";
Vue.use(Notifications);

import VueObserveVisibility from "vue-observe-visibility";
Vue.use(VueObserveVisibility);

import VueHead from "vue-head";
Vue.use(VueHead);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

import { sync } from "vuex-router-sync";
sync(store, router);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTimes,
  faCheck,
  faRss,
  faInfoCircle,
  faEye,
  faEyeSlash,
  faSquare,
  faCheckSquare
} from "@fortawesome/free-solid-svg-icons";

import {
  faHeart,
  faCircle,
  faCheckCircle,
  faEnvelope,
  faCalendarCheck
} from "@fortawesome/free-regular-svg-icons";
import {
  faGithub,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faPlus,
  faTimes,
  faCheck,
  faCircle,
  faSquare,
  faCheckSquare,
  faCheckCircle,
  faEye,
  faEyeSlash,
  faInfoCircle,
  faCalendarCheck,
  faRss,
  faEnvelope,
  faHeart,
  faGithub,
  faTwitter,
  faInstagram
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

require("./main.scss");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
