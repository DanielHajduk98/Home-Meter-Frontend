import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      dark: {
        primary: colors.blueGrey.base,
        overlay: colors.grey.darken3,
        lightGrey: colors.grey.darken1,
        text: "#fff"
      }
    }
  }
});
