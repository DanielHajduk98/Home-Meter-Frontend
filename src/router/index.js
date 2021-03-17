import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue")
  },
  {
    path: "/day/:date",
    name: "Day",
    component: () => import("../views/Day.vue")
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () => import("../views/Calendar.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
