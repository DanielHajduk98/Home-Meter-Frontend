<template>
  <v-container>
    <v-row class="mb-5">
      <v-col col="12" tag="header">
        <h1 class="text-center">Today's measurements</h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              @click.native="$vuetify.goTo($refs.heatIndex[0])"
              v-bind="attrs"
              v-on="on"
              :color="getHeatIndexStatus.color"
              size="100"
              class="ma-n1"
            >
              {{ getHeatIndexStatus.icon }}
            </v-icon>
          </template>
          <span
            >The heat index (HI) is an index that combines air temperature and
            <br />
            relative humidity, in shaded areas, to posit a human-perceived
            <br />
            equivalent temperature.</span
          >
        </v-tooltip>
        <div class="text-center">
          Heat index:
          {{
            measurements.length && measurements[0].data.length !== 0
              ? measurements[0].data[measurements[0].data.length - 1].y
              : ""
          }}°C
        </div>
      </v-col>

      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon
          @click.native="$vuetify.goTo($refs.temperature[0])"
          color="#FF9800"
          size="100"
          class="ma-n1"
        >
          mdi-thermometer
        </v-icon>
        <div class="text-center">
          Temperature:
          {{
            measurements.length && measurements[1].data.length !== 0
              ? measurements[1].data[measurements[1].data.length - 1].y
              : ""
          }}°C
        </div>
      </v-col>

      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon
          @click.native="$vuetify.goTo($refs.movement[0])"
          color="#F44336"
          size="100"
          class="ma-n1"
        >
          mdi-run-fast
        </v-icon>
        <div class="text-center">
          Movement:
          {{
            measurements.length && measurements[2].data.length !== 0
              ? measurements[2].data[measurements[2].data.length - 1].y
              : ""
          }}
        </div>
      </v-col>

      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon
          @click.native="$vuetify.goTo($refs.luminosity[0])"
          color="#FFEB3B"
          size="100"
          class="ma-n1"
        >
          mdi-lightbulb
        </v-icon>
        <div class="text-center">
          Luminosity:
          {{
            measurements.length && measurements[3].data.length !== 0
              ? measurements[3].data[measurements[3].data.length - 1].y
              : ""
          }}
          lx
        </div>
      </v-col>
      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon
          @click.native="$vuetify.goTo($refs.airPressure[0])"
          color="#673AB7"
          size="100"
          class="ma-n1"
        >
          mdi-arrow-collapse-vertical
        </v-icon>
        <div class="text-center">
          air_pressure:
          {{
            measurements.length && measurements[4].data.length !== 0
              ? measurements[4].data[measurements[4].data.length - 1].y
              : ""
          }}
          hPa
        </div>
      </v-col>

      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon
          @click.native="$vuetify.goTo($refs.humidity[0])"
          color="#2196F3"
          size="100"
          class="ma-n1"
        >
          mdi-water
        </v-icon>
        <div class="text-center">
          Humidity:
          {{
            measurements.length && measurements[5].data.length !== 0
              ? measurements[5].data[measurements[5].data.length - 1].y
              : ""
          }}%
        </div>
      </v-col>
    </v-row>

    <hr class="my-5" />

    <v-row
      class="my-n2 pt-5"
      v-for="(chartData, index) in chartsData"
      :key="index"
    >
      <v-col cols="12" class="py-5">
        <Chart
          @click.native="handleFocus(chartData.id)"
          @dblclick.native="$refs[chartData.id][0].resetZoom()"
          :ref="chartData.id"
          :chart-data="chartData"
          :range="range"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { chartDataMixin } from "@/helpers/chartDataMixin";
import { addDays } from "date-fns";
import Chart from "../components/Chart";

export default {
  name: "Dashboard",
  components: { Chart },
  mixins: [chartDataMixin],

  created() {
    const today = this.stripToDate(new Date());

    this.range = {
      min: today,
      max: addDays(today, 1)
    };

    this.fetchData();
  },

  methods: {
    async fetchData() {
      await this.$store.dispatch("measurements/getMeasurements", {});
    }
  },

  computed: {
    getHeatIndexStatus: function() {
      if (!this.measurements.length) {
        return { icon: "mdi-emoticon", color: "#4CAF50" };
      }
      const heatIndex =
        this.measurements[0].data.length !== 0
          ? this.measurements[0].data[this.measurements[0].data.length - 1].y
          : "";

      if (26 <= heatIndex && heatIndex <= 32) {
        return { icon: "mdi-emoticon-neutral", color: "#FFEE58" };
      } else if (32 < heatIndex && heatIndex <= 41) {
        return { icon: "mdi-emoticon-confused", color: "#FFC107" };
      } else if (41 < heatIndex && heatIndex <= 54) {
        return { icon: "mdi-emoticon-sad", color: "#EF6C00" };
      } else if (heatIndex > 54) {
        return { icon: "mdi-emoticon-frown", color: "#B71C1C" };
      }

      return { icon: "mdi-emoticon", color: "#4CAF50" };
    }
  }
};
</script>

<style></style>
