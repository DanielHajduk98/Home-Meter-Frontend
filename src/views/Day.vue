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
      <v-col
        v-for="(chart, index) in chartsData"
        :key="index"
        md="6"
        lg="4"
        class="py-2"
      >
        <apexchart
          height="450"
          type="line"
          :ref="chart.options.chart.id"
          :options="chart.options"
          :series="chart.series"
        ></apexchart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { parseISO, isToday, addDays, format } from "date-fns";
import { chartDataMixin } from "@/helpers/chartDataMixin";

export default {
  name: "Day",

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
    "$route.params.date": function() {
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
      await this.$store.dispatch("measurements/getMeasurements", {
        date: this.$route.params.date
      });

      this.min = this.stripToDate(this.date);
      this.max = addDays(this.min, 1);
      this.setOptions();

      this.fillData();
    }
  },

  computed: {
    nextDisabled: function() {
      const nextSelect = addDays(this.date, 1);
      return isToday(nextSelect);
    },
    getDate: function() {
      return format(parseISO(this.$route.params.date), "yyyy-MM-dd");
    }
  }
};
</script>

<style></style>
