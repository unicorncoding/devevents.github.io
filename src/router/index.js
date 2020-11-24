import Vue from "vue";
import VueRouter from "vue-router";
import Events from "../components/Events";
import TrainingCourses from "../components/TrainingCourses";
import TrainingAbout from "../components/TrainingAbout";
import EventAbout from "../components/EventAbout";
import NewEvent from "../components/NewEvent";
import EditEvent from "../components/EditEvent";

Vue.use(VueRouter);

const routes = [
  {
    path: "/new",
    name: "new",
    component: NewEvent
  },
  {
    path: "/courses",
    name: "courses",
    component: TrainingCourses
  },
  {
    path: "/courses/:codename",
    name: "course",
    component: TrainingAbout
  },
  {
    path: "/:continent([A-Z]{2})?/:country([A-Z]{2})?/:topic([a-z0-9]+)?",
    caseSensitive: true,
    name: "confs",
    component: Events
  },
  {
    path: "/conferences/:id/edit",
    name: "edit",
    component: EditEvent
  },
  {
    path: "/conferences/:id",
    name: "conf",
    component: EventAbout
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
