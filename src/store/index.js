import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import measurements from "./module/measurements.module";

export default new Vuex.Store({
  modules: {
    measurements
  }
});
