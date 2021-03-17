<template>
  <v-container>
    <v-row>
      <v-col lg="6">
        <LineChart
          :chart-data="heatIndexDataSet"
          title="Heat Index"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col lg="6">
        <LineChart
          :chart-data="temperatureDataSet"
          title="Temperature"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col lg="6">
        <LineChart
          :chart-data="movementDataSet"
          title="Movement"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col lg="6">
        <LineChart
          :chart-data="luminosityDataSet"
          title="Luminosity"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col lg="6">
        <LineChart
          :chart-data="airPressureDataSet"
          title="Air pressure"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col lg="6">
        <LineChart
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
import { parseISO, addDays } from "date-fns";
import { chartDataMixin } from "@/helpers/chartDataMixin";

export default {
  name: "Day",
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
      let date = this.$route.params.date;

      this.min = this.stripToDate(parseISO(this.$route.params.date));
      this.max = addDays(this.min, 1);

      await this.$store.dispatch("measurements/getDay", date);

      this.fillData();
    }
  }
};
</script>

<style></style>
