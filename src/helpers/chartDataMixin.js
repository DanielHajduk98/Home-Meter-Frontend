import { setHours, setMinutes, setSeconds } from "date-fns";
import { mapGetters } from "vuex";

export const chartDataMixin = {
  data() {
    return {
      temperatureDataSet: {
        datasets: [{}]
      },
      movementDataSet: {
        datasets: [{}]
      },
      humidityDataSet: {
        datasets: [{}]
      },
      airPressureDataSet: {
        datasets: [{}]
      },
      luminosityDataSet: {
        datasets: [{}]
      },
      heatIndexDataSet: {
        datasets: [{}]
      }
    };
  },

  methods: {
    stripToDate(date) {
      date = setHours(date, 0);
      date = setMinutes(date, 0);
      date = setSeconds(date, 0);

      return date;
    },

    fillData() {
      this.temperatureDataSet = {
        datasets: [
          {
            label: "Temperature",
            data: this.temperature,
            fill: false,
            borderColor: "#FF9800",
            pointBackgroundColor: "#FF9800"
          }
        ]
      };
      this.movementDataSet = {
        datasets: [
          {
            label: "Movement",
            data: this.movement,
            fill: false,
            borderColor: "#F44336",
            pointBackgroundColor: "#F44336"
          }
        ]
      };
      this.humidityDataSet = {
        datasets: [
          {
            label: "Humidity",
            data: this.humidity,
            fill: false,
            borderColor: "#2196F3",
            pointBackgroundColor: "#2196F3"
          }
        ]
      };
      this.airPressureDataSet = {
        datasets: [
          {
            label: "Air pressure",
            data: this.air_pressure,
            fill: false,
            borderColor: "#673AB7",
            pointBackgroundColor: "#673AB7"
          }
        ]
      };
      this.luminosityDataSet = {
        datasets: [
          {
            label: "Luminosity",
            data: this.luminosity,
            fill: false,
            borderColor: "#FFEB3B",
            pointBackgroundColor: "#FFEB3B"
          }
        ]
      };
      this.heatIndexDataSet = {
        datasets: [
          {
            label: "Heat index",
            data: this.heatIndex,
            fill: false,
            borderColor: "#009688",
            pointBackgroundColor: "#009688"
          }
        ]
      };
    }
  },

  computed: {
    ...mapGetters("measurements", [
      "temperature",
      "movement",
      "air_pressure",
      "humidity",
      "luminosity",
      "heatIndex"
    ]),

    isLoading: function() {
      return this.$store.getters["measurements/getLoading"];
    }
  }
};
