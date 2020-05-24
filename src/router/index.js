import Vue from "vue";
import VueRouter from "vue-router";
import Events from "../components/Events";
import NewEvent from "../components/NewEvent";

Vue.use(VueRouter);

const routes = [
  {
    path: "/:cfp(cfp)?/:continent([A-Z]{2})/:country([A-Z]{2})?/:topic(\\w+)?",
    name: "confs",
    component: Events,
    children: [
      {
        path: "new",
        component: NewEvent
      }
    ]
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
