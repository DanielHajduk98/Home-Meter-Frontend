<template>
  <v-container>
    <v-row>
      <v-col lg="6">
        <LineChart :chart-data="heatIndexDataSet" :options="options" />
      </v-col>
      <v-col lg="6">
        <LineChart :chart-data="temperatureDataSet" :options="options" />
      </v-col>
      <v-col lg="6">
        <LineChart :chart-data="movementDataSet" :options="options" />
      </v-col>
      <v-col lg="6">
        <LineChart :chart-data="luminosityDataSet" :options="options" />
      </v-col>
      <v-col lg="6">
        <LineChart :chart-data="airPressureDataSet" :options="options" />
      </v-col>
      <v-col lg="6">
        <LineChart :chart-data="humidityDataSet" :options="options" />
      </v-col>
    </v-row>
    <!--    <div class="d-flex align-content-center">-->
    <!--      <v-progress-circular color="primary" indeterminate />-->
    <!--    </div>-->
  </v-container>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import { mapGetters } from "vuex";
import { parseISO } from "date-fns";

export default {
  name: "Dashboard",
  components: { LineChart },

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
      },

      options: {
        parsing: {
          xAxisKey: "created_at",
          yAxisKey: "temperature"
        },
        legend: {
          labels: {
            fontColor: "white"
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white"
              }
            }
          ],
          xAxes: [
            {
              type: "time",
              time: {
                unit: "minute",
                displayFormats: {
                  second: "HH:mm:ss",
                  minute: "HH:mm"
                }
              },
              ticks: {
                fontColor: "white"
              }
            }
          ]
        }
      }
    };
  },

  watch: {
    "$route.path": function() {
      this.fetchData();
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      let date = this.$route.params.date;

      if (date) {
        await this.$store.dispatch("measurements/getDay", parseISO(date));
      } else {
        await this.$store.dispatch("measurements/getToday");
      }

      this.fillData();
    },

    fillData() {
      this.temperatureDataSet = {
        datasets: [
          {
            label: "Temperature",
            data: this["measurements/temperature"],
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
            data: this["measurements/movement"],
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
            data: this["measurements/humidity"],
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
            data: this["measurements/air_pressure"],
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
            data: this["measurements/luminosity"],
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
            data: this["measurements/heatIndex"],
            fill: false,
            borderColor: "#009688",
            pointBackgroundColor: "#009688"
          }
        ]
      };
    }
  },

  computed: {
    ...mapGetters([
      "measurements/temperature",
      "measurements/movement",
      "measurements/air_pressure",
      "measurements/humidity",
      "measurements/luminosity",
      "measurements/heatIndex"
    ]),

    isLoading: function() {
      return this.$store.getters["measurements/getLoading"];
    }
  }
};
</script>

<style></style>
