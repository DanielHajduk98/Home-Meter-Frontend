import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/pusher";
import VueApexCharts from "vue-apexcharts";

Vue.use(VueApexCharts);
window.Apex = {
  tooltip: {
    x: {
      format: "HH:mm dd/MM/yy"
    }
  },
  chart: {
    background: "transparent",
    animations: {
      enabled: false,
      easing: "easein"
    }
  },
  theme: {
    mode: "dark"
  },
  xaxis: {
    type: "datetime",
    labels: {
      datetimeUTC: false
    }
  }
};

Vue.component("apexchart", VueApexCharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
