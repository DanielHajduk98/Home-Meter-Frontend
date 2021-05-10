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
        v-for="(chartData, index) in chartsData"
        :key="index"
        md="6"
        lg="4"
        class="py-2"
      >
        <h3 class="text-center">
          {{ chartData.title }}
        </h3>
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
import { addDays, format, isToday, parseISO } from "date-fns";
import { chartDataMixin } from "@/helpers/chartDataMixin";
import Chart from "../components/Chart";

export default {
  name: "Day",
  components: { Chart },
  mixins: [chartDataMixin],

  data() {
    return {
      date: new Date()
    };
  },

  async created() {
    this.date = parseISO(this.$route.params.date);

    const min = this.stripToDate(this.date);
    this.range = {
      min: min,
      max: addDays(min, 1)
    };

    console.log(this.range.min);
    console.log(this.range.max);

    await this.fetchData();
  },

  watch: {
    "$route.params.date": async function() {
      this.date = parseISO(this.$route.params.date);

      await this.fetchData();
    }
  },

  methods: {
    formatDate(day) {
      return format(day, "yyyy-MM-dd");
    },

    prev() {
      let date = addDays(this.date, -1);

      this.$router.push("/day/" + this.formatDate(date));
    },

    next() {
      let date = addDays(this.date, 1);

      if (isToday(date)) return;

      this.$router.push("/day/" + this.formatDate(date));
    },

    async fetchData() {
      await this.$store.dispatch("measurements/getMeasurements", {
        date: this.$route.params.date
      });

      const min = this.stripToDate(this.date);
      this.range = {
        min: min,
        max: addDays(min, 1)
      };

      console.log(this.range.max);
    }
  },

  computed: {
    nextDisabled: function() {
      const nextSelect = addDays(this.date, 1);
      return isToday(nextSelect);
    },

    getDate: function() {
      return format(this.date, "yyyy-MM-dd");
    }
  }
};
</script>

<style></style>
