import { mount, createLocalVue } from "@vue/test-utils";
import Calendar from "../../src/views/Calendar";
import Vuex from "vuex";
import Vuetify from "vuetify";
import "jest-canvas-mock";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    measurements: {
      namespaced: true,
      state: {
        measurements: [
          {
            name: "Measurement",
            data: [
              {
                x: 1621030143000,
                y: 20
              }
            ]
          }
        ],
        error: ""
      },
      getters: {
        measurements: state => state.measurements
      },
      actions: {
        // eslint-disable-next-line no-unused-vars
        getMeasurements({ commit }, { date = null, scale = "day" }) {}
      }
    }
  }
});

const $route = {
  path: "/month/2077-01",
  params: {
    date: "2077-01"
  }
};

describe("Calendar", () => {
  // eslint-disable-next-line no-unused-vars
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("Month is changed after btn click", () => {
    const wrapper = mount(Calendar, {
      mocks: {
        $route
      },
      store,
      localVue,
      vuetify
    });
    const header = wrapper.findComponent({ ref: "calendar-header" });

    expect(header.text()).toContain("January 2077");
  });
});
