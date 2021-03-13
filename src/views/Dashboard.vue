<template>
  <v-container>
    <v-row>
      <v-col lg="6">
        <LineChart :chart-data="temperatureDataSet" :options="options" />
      </v-col>
    </v-row>
    <!--    <div class="d-flex align-content-center">-->
    <!--      <v-progress-circular color="primary" indeterminate />-->
    <!--    </div>-->
  </v-container>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
export default {
  name: "Dashboard",
  components: { LineChart },

  data() {
    return {
      temperatureDataSet: null,
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
              ticks: {
                fontColor: "white"
              }
            }
          ]
        }
      }
    };
  },

  created() {
    this.$store.dispatch("measurements/fetchMeasurements").then(() => {
      this.fillData();
    });
  },

  methods: {
    fillData() {
      this.temperatureDataSet = {
        datasets: [
          {
            label: "temperature",
            data: this.temperature,
            fill: false,
            borderColor: "#2196F3",
            pointBackgroundColor: "#2196F3"
          }
        ]
      };
    }
  },

  computed: {
    temperature: function() {
      return this.$store.getters["measurements/getMeasurements"];
    },
    isLoading: function() {
      return this.$store.getters["measurements/getLoading"];
    }
  }
};
</script>

<style></style>
