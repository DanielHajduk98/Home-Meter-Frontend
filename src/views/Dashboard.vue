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
            heatIndex.length !== 0 ? heatIndex[heatIndex.length - 1].y : ""
          }}°C
        </div>
      </v-col>

      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon color="#FF9800" size="100" class="ma-n1">
          mdi-thermometer
        </v-icon>
        <div class="text-center">
          Temperature:
          {{
            temperature.length !== 0
              ? temperature[temperature.length - 1].y
              : ""
          }}°C
        </div>
      </v-col>

      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon color="#F44336" size="100" class="ma-n1"> mdi-run-fast </v-icon>
        <div class="text-center">
          Movement:
          {{ movement.length !== 0 ? movement[movement.length - 1].y : "" }}
        </div>
      </v-col>

      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon color="#FFEB3B" size="100" class="ma-n1">
          mdi-lightbulb
        </v-icon>
        <div class="text-center">
          Luminosity:
          {{
            luminosity.length !== 0 ? luminosity[luminosity.length - 1].y : ""
          }}
          lx
        </div>
      </v-col>
      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon color="#673AB7" size="100" class="ma-n1">
          mdi-arrow-collapse-vertical
        </v-icon>
        <div class="text-center">
          air_pressure:
          {{
            air_pressure.length !== 0
              ? air_pressure[air_pressure.length - 1].y
              : ""
          }}
          hPa
        </div>
      </v-col>

      <v-col sm="2" class="d-flex flex-column justify-center align-center">
        <v-icon color="#2196F3" size="100" class="ma-n1">
          mdi-water
        </v-icon>
        <div class="text-center">
          Humidity:
          {{ humidity.length !== 0 ? humidity[humidity.length - 1].y : "" }}%
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <LineChart
          :chart-data="heatIndexDataSet"
          @dblclick.native="$refs.hiChart.test()"
          ref="hiChart"
          title="Heat Index"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col cols="12">
        <LineChart
          @dblclick.native="$refs.temperatureChart.test()"
          ref="temperatureChart"
          :chart-data="temperatureDataSet"
          title="Temperature"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col cols="12">
        <LineChart
          @dblclick.native="$refs.movementChart.test()"
          ref="movementChart"
          :chart-data="movementDataSet"
          title="Movement"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col cols="12">
        <LineChart
          @dblclick.native="$refs.luminosityChart.test()"
          ref="luminosityChart"
          :chart-data="luminosityDataSet"
          title="Luminosity"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col cols="12">
        <LineChart
          @dblclick.native="$refs.airPressureChart.test()"
          ref="airPressureChart"
          :chart-data="airPressureDataSet"
          title="Air pressure"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col cols="12">
        <LineChart
          @dblclick.native="$refs.humidityChart.test()"
          ref="humidityChart"
          :chart-data="humidityDataSet"
          title="Humidity"
          :min="min"
          :max="max"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import { addDays } from "date-fns";
import { chartDataMixin } from "@/helpers/chartDataMixin";

export default {
  name: "Dashboard",
  components: { LineChart },

  mixins: [chartDataMixin],

  data() {
    return {
      min: new Date(),
      max: addDays(new Date(), 1)
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.min = this.stripToDate(new Date());
      this.max = addDays(this.min, 1);

      await this.$store.dispatch("measurements/getMeasurements", {});

      this.fillData();
    }
  },

  computed: {
    getHeatIndexStatus: function() {
      const heatIndex =
        this.heatIndex.length !== 0
          ? this.heatIndex[this.heatIndex.length - 1].y
          : "";

      if (26 <= heatIndex && heatIndex <= 32) {
        console.log("asdf");
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
