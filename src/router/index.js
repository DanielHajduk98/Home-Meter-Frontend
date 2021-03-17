import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      store.commit("loader/setLoading", true, { root: true });
      next();
    }
  },
  {
    path: "/day/:date",
    name: "Day",
    component: () => import("../views/Day.vue"),
    beforeEnter: (to, from, next) => {
      store.commit("loader/setLoading", true, { root: true });
      next();
    }
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
