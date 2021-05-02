import { setHours, setMinutes, setSeconds } from "date-fns";
import { mapGetters } from "vuex";

export const chartDataMixin = {
  data() {
    return {
      chartsData: [{}, {}, {}, {}, {}, {}],
      focusSwitch: []
    };
  },

  mounted() {
    this.fillFocus();
  },

  watch: {
    measurements: {
      deep: true,

      handler() {
        this.fillData();
      }
    }
  },

  methods: {
    handleFocus(id) {
      this.focusSwitch.forEach(chartID => {
        const chart = this.$refs[chartID][0];
        if (id === chartID) chart.focus();
        else chart.unFocus();
      });
    },

    stripToDate(date) {
      date = setHours(date, 0);
      date = setMinutes(date, 0);
      date = setSeconds(date, 0);

      return date;
    },

    fillFocus() {
      this.measurements.forEach((measurement, index) => {
        this.focusSwitch[index] = this.getID(measurement.name);
      });
    },

    fillData() {
      this.measurements.forEach((measurement, index) => {
        this.chartsData[index] = {
          id: this.getID(measurement.name),
          datasets: [
            {
              label: measurement.name,
              data: measurement.data,
              fill: false,
              backgroundColor: this.getColors(measurement.name),
              borderColor: this.getColors(measurement.name)
            }
          ]
        };
      });
    },

    getColors(name) {
      switch (name) {
        case "Temperature":
          return "#FF9800";
        case "Movement":
          return "#F44336";
        case "Humidity":
          return "#2196F3";
        case "Air Pressure":
          return "#673AB7";
        case "Luminosity":
          return "#FFEB3B";
        case "Heat index":
          return "#009688";
        default:
          return "#fff";
      }
    },

    getID(name) {
      switch (name) {
        case "Temperature":
          return "temperature";
        case "Movement":
          return "movement";
        case "Humidity":
          return "humidity";
        case "Air Pressure":
          return "airPressure";
        case "Luminosity":
          return "luminosity";
        case "Heat index":
          return "heatIndex";
        default:
          return "temperature";
      }
    }
  },

  computed: {
    ...mapGetters("measurements", ["measurements"]),

    isLoading: function() {
      return this.$store.getters["measurements/getLoading"];
    }
  }
};
