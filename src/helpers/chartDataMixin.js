import { setHours, setMinutes, setSeconds } from "date-fns";
import { mapGetters } from "vuex";

export const chartDataMixin = {
  data() {
    return {
      chartsData: [
        {
          options: {},
          series: [{ data: [] }]
        },
        {
          options: {},
          series: [{ data: [] }]
        },
        {
          options: {},
          series: [{ data: [] }]
        },
        {
          options: {},
          series: [{ data: [] }]
        },
        {
          options: {},
          series: [{ data: [] }]
        },
        {
          options: {},
          series: [{ data: [] }]
        }
      ]
    };
  },

  created() {
    this.fillData();
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
        this.chartsData[index].options = {
          xaxis: {
            min: this.min,
            max: this.max
          },
          colors: this.getColors(measurement.name)
        };

        this.chartsData[index].series = [
          {
            name: measurement.name,
            data: measurement.data
          }
        ];
      });
    },

    getColors(name) {
      switch (name) {
        case "Temperature":
          return ["#FF9800"];
        case "Movement":
          return ["#F44336"];
        case "Humidity":
          return ["#2196F3"];
        case "Air Pressure":
          return ["#673AB7"];
        case "Luminosity":
          return ["#FFEB3B"];
        case "Heat index":
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
