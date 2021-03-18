<template>
  <v-container>
    <v-row>
      <v-col>
        <header class="d-flex flex-row justify-center align-center mx-n2">
          <v-btn icon class="mx-2" @click="prev()">
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn>
          <h1 class="mx-2">{{ getDate }}</h1>
          <v-btn icon class="mx-2" @click="next()" :disabled="nextDisabled">
            <v-icon>mdi-arrow-right-circle</v-icon>
          </v-btn>
        </header>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6" lg="4">
        <LineChart
          :chart-data="heatIndexDataSet"
          title="Heat Index"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col md="6" lg="4">
        <LineChart
          :chart-data="temperatureDataSet"
          title="Temperature"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col md="6" lg="4">
        <LineChart
          :chart-data="movementDataSet"
          title="Movement"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col md="6" lg="4">
        <LineChart
          :chart-data="luminosityDataSet"
          title="Luminosity"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col md="6" lg="4">
        <LineChart
          :chart-data="airPressureDataSet"
          title="Air pressure"
          :min="min"
          :max="max"
        />
      </v-col>
      <v-col md="6" lg="4">
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
import { parseISO, isToday, addDays, format } from "date-fns";
import { chartDataMixin } from "@/helpers/chartDataMixin";

export default {
  name: "Day",
  components: { LineChart },

  mixins: [chartDataMixin],

  data() {
    return {
      date: new Date(),
      min: new Date(),
      max: addDays(new Date(), 1)
    };
  },

  created() {
    this.date = parseISO(this.$route.params.date);
    this.fetchData();
  },

  watch: {
    date: function() {
      this.fetchData();
    }
  },

  methods: {
    formatDate(day) {
      return format(day, "yyyy-MM-dd");
    },

    prev() {
      let date = addDays(this.date, -1);

      this.$router.push("/day/" + this.formatDate(date));
      this.date = date;
    },

    next() {
      let date = addDays(this.date, 1);

      if (isToday(date)) return;

      this.$router.push("/day/" + this.formatDate(date));
      this.date = date;
    },

    async fetchData() {
      await this.$store.dispatch(
        "measurements/getDay",
        this.$route.params.date
      );

      this.min = this.stripToDate(this.date);
      this.max = addDays(this.min, 1);

      this.fillData();
    }
  },

  computed: {
    nextDisabled: function() {
      const nextDate = addDays(this.date, 1);
      return isToday(nextDate);
    },
    getDate: function() {
      return format(parseISO(this.$route.params.date), "yyyy-MM-dd");
    }
  }
};
</script>

<style></style>
