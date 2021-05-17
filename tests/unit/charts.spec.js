import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Vuex from "vuex";
import "jest-canvas-mock";
import Chart from "../../src/components/Chart";
import { chartDataMixin } from "../../src/helpers/chartDataMixin";

const localVue = createLocalVue();
localVue.use(Vuex);

const testComponent = {
  template: `
    <div>
      <chart 
        v-for="(chartData, index) in chartsData"
        :key="index"
        @click.native="handleFocus(chartData.id)"
        :range="range" 
        :chart-data="chartsData[index]"
        :ref="chartsData[index].id" />
    </div>
    `,

  components: { Chart },
  mixins: [chartDataMixin],
  data() {
    return {
      range: {
        min: 1621030143000,
        max: 1621040140000
      }
    };
  },
  created() {
    this.fillData();
  }
};

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
      }
    }
  }
});

describe("Charts", () => {
  let wrapper;
  let chartTemp;
  let chartMovement;

  beforeEach(() => {
    wrapper = mount(testComponent, {
      store,
      localVue,
      stubs: {
        RouterLink: RouterLinkStub
      }
    });

    chartTemp = wrapper.findComponent({ ref: "temperature" });
    chartMovement = wrapper.findComponent({ ref: "movement" });
  });

  it("should create charts from chartsData", async () => {
    expect(chartTemp.exists()).toBe(true);
    expect(chartMovement.exists()).toBe(true);
  });

  it("should start charts with pan enabled and zoom disabled", async () => {
    expect(chartTemp.vm.$data._chart.options.plugins.zoom.zoom.enabled).toEqual(
      false
    );
    expect(chartTemp.vm.$data._chart.options.plugins.zoom.pan.enabled).toEqual(
      true
    );
    expect(
      chartMovement.vm.$data._chart.options.plugins.zoom.zoom.enabled
    ).toEqual(false);
    expect(
      chartMovement.vm.$data._chart.options.plugins.zoom.pan.enabled
    ).toEqual(true);
  });

  it("should toggle zoom on click on the same chart", async () => {
    chartTemp.trigger("click");
    expect(chartTemp.vm.$data._chart.options.plugins.zoom.zoom.enabled).toEqual(
      true
    );
    chartTemp.trigger("click");
    expect(chartTemp.vm.$data._chart.options.plugins.zoom.zoom.enabled).toEqual(
      false
    );
  });

  it("should disable zoom on clicking other chart", async () => {
    chartTemp.trigger("click");
    expect(chartTemp.vm.$data._chart.options.plugins.zoom.zoom.enabled).toEqual(
      true
    );
    expect(
      chartMovement.vm.$data._chart.options.plugins.zoom.zoom.enabled
    ).toEqual(false);

    chartMovement.trigger("click");
    expect(chartTemp.vm.$data._chart.options.plugins.zoom.zoom.enabled).toEqual(
      false
    );
    expect(
      chartMovement.vm.$data._chart.options.plugins.zoom.zoom.enabled
    ).toEqual(true);
  });
});
