import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import {
  parseISO,
  isValid,
  isBefore,
  isToday,
  startOfMonth,
  differenceInCalendarDays,
  differenceInCalendarYears
} from "date-fns";

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
      const date = parseISO(to.params.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isValid(date) && isBefore(date, today)) {
        store.commit("loader/setLoading", true, { root: true });
        next();
      } else if (isToday(date)) {
        next("/");
      } else {
        next("/404");
      }
    }
  },
  {
    path: "/month/:date",
    name: "Calendar",
    component: () => import("../views/Calendar.vue"),
    beforeEnter: (to, from, next) => {
      const date = parseISO(to.params.date + "-01");

      if (
        isValid(date) &&
        differenceInCalendarDays(date, startOfMonth(new Date())) <= 0
      ) {
        store.commit("loader/setLoading", true, { root: true });
        next();
      } else {
        next("/404");
      }
    }
  },
  {
    path: "/year/:year",
    name: "Calendar",
    component: () => import("../views/Year.vue"),
    beforeEnter: (to, from, next) => {
      const year = parseISO(to.params.year + "-01" + "-01");

      if (isValid(year) && differenceInCalendarYears(year, new Date()) <= 0) {
        store.commit("loader/setLoading", true, { root: true });
        next();
      } else {
        next("/404");
      }
    }
  },
  {
    path: "/404"
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const scrollBehavior = () => {
  return { x: 0, y: 0 };
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: scrollBehavior
});

export default router;
