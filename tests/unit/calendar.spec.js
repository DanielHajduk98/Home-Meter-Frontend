import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
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
            name: "Temperature",
            data: [
              {
                x: 1621030143000,
                y: 20
              }
            ]
          },
          {
            name: "Movement",
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

const $router = {
  push: jest.fn()
};

let $route = {
  path: "/month/2000-01",
  params: {
    date: "2000-01"
  }
};

describe("Calendar", () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should push router to previous month on btn-prev click", async () => {
    const wrapper = mount(Calendar, {
      store,
      localVue,
      vuetify,
      mocks: {
        $route,
        $router
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    const btnPrev = wrapper.findComponent({ ref: "btn-prev" });

    expect(btnPrev.exists()).toBe(true);
    btnPrev.trigger("click");

    expect($router.push).toHaveBeenCalledWith("/month/1999-12");
  });

  it("should push router to next month on btn-next click", () => {
    const wrapper = mount(Calendar, {
      store,
      localVue,
      vuetify,
      mocks: {
        $route,
        $router
      },
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    const btnNext = wrapper.findComponent({ ref: "btn-next" });

    expect(btnNext.exists()).toBe(true);
    btnNext.trigger("click");

    expect($router.push).toHaveBeenCalledWith("/month/2000-02");
  });
});
