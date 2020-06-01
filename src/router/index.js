import Vue from "vue";
import VueRouter from "vue-router";
import Events from "../components/Events";
import ConferenceInfo from "../components/ConferenceInfo";
import NewEvent from "../components/NewEvent";

Vue.use(VueRouter);

const routes = [
  {
    path: "/new",
    name: "new",
    component: NewEvent
  },
  {
    path: "/conference/:id",
    name: "conf",
    component: ConferenceInfo
  },
  {
    path:
      "/:cfp(cfp)?/:continent([A-Z]{2})/:country([A-Z]{2})?/:topic([a-z]+)?",
    caseSensitive: true,
    name: "confs",
    component: Events
  },
  {
    path: "/",
    redirect: "/AM"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
