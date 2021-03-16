import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/day"
  },
  {
    path: "/day",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue")
  },
  {
    path: "/day/:date",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue")
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/Calendar.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
