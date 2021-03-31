import { setHours, setMinutes, setSeconds } from "date-fns";
import { mapGetters } from "vuex";

export const chartDataMixin = {
  data() {
    return {
      chartsData: [
        {
          options: {
            chart: {
              id: "heatIndex"
            }
          },
          series: [{ data: [] }]
        },
        {
          options: {
            chart: {
              id: "temperature"
            }
          },
          series: [{ data: [] }]
        },
        {
          options: {
            chart: {
              id: "movement"
            }
          },
          series: [{ data: [] }]
        },
        {
          options: {
            chart: {
              id: "luminosity"
            }
          },
          series: [{ data: [] }]
        },
        {
          options: {
            chart: {
              id: "airPressure"
            }
          },
          series: [{ data: [] }]
        },
        {
          options: {
            chart: {
              id: "humidity"
            }
          },
          series: [{ data: [] }]
        }
      ]
    };
  },

  created() {
    this.fillData();
  },

  mounted() {
    this.setOptions();
  },

  watch: {
    measurements: function() {
      console.log("watch");
      this.fillData();
    }
  },

  methods: {
    stripToDate(date) {
      date = setHours(date, 0);
      date = setMinutes(date, 0);
      date = setSeconds(date, 0);

      return date;
    },

    fillData() {
      this.measurements.forEach((measurement, index) => {
        this.chartsData[index].series = [
          {
            name: measurement.name,
            data: measurement.data
          }
        ];
      });
    },

    setOptions() {
      this.chartsData.forEach(chart => {
        const id = chart.options.chart.id;
        this.$refs[id][0].updateOptions({
          title: {
            text: id
          },
          colors: this.getColors(id),
          xaxis: {
            min: Date.parse(this.min),
            max: Date.parse(this.max)
          }
        });
      });
    },

    getColors(name) {
      switch (name) {
        case "temperature":
          return ["#FF9800"];
        case "movement":
          return ["#F44336"];
        case "humidity":
          return ["#2196F3"];
        case "airPressure":
          return ["#673AB7"];
        case "luminosity":
          return ["#FFEB3B"];
        case "heatIndex":
          return ["#009688"];
        default:
          return ["#fff"];
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
