<template>
  <v-container>
    <v-row>
      <v-col>
        <header class="d-flex flex-row justify-center align-center mx-n2">
          <v-btn x-large icon class="mx-2" @click="prev()">
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn>
          <h1 class="mx-2 calendar-header">{{ getYear }}</h1>
          <v-btn
            x-large
            icon
            class="mx-2"
            @click="next()"
            :disabled="nextDisabled"
          >
            <v-icon>mdi-arrow-right-circle</v-icon>
          </v-btn>
        </header>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="12" sm="10" xl="7" class="calendar calendar--yearly">
        <div
          :key="index"
          v-for="(month, index) in calendar"
          class="calendar-node"
          :class="{ 'calendar-node--current': month.isCurrent }"
        >
          <router-link
            v-if="month.isAfter"
            :to="'/month/' + formatDate(month.date)"
            class="calendar-node__content"
          >
            {{ month.monthName }}
          </router-link>
          <div v-else class="calendar-node__content">
            {{ month.monthName }}
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-xl-5">
      <v-col cols="12" class="pa-0 d-none d-sm-block mt-sm-5">
        <hr class="mt-5 mb-4" />
      </v-col>

      <v-col
        v-for="(chartData, index) in chartsData"
        :key="index"
        cols="12"
        class="py-5"
      >
        <Chart
          @click.native="handleFocus(chartData.id)"
          @dblclick.native="$refs[chartData.id][0].resetZoom()"
          :ref="chartData.id"
          :chart-data="chartData"
          :min="min"
          :max="max"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  isToday,
  format,
  isAfter,
  parseISO,
  addYears,
  isSameYear,
  isThisMonth,
  differenceInCalendarMonths
} from "date-fns";
import { chartDataMixin } from "@/helpers/chartDataMixin";
import Chart from "../components/Chart";

export default {
  name: "Calendar",
  components: { Chart },
  mixins: [chartDataMixin],

  data() {
    return {
      today: new Date(),
      selectedYear: new Date(),
      min: new Date(),
      max: new Date(),
      calendar: []
    };
  },

  async created() {
    const date = this.$route.params.year + "-01-01";
    this.selectedYear = parseISO(date);

    this.min = startOfYear(this.selectedYear);
    this.max = endOfYear(this.selectedYear);

    await this.fetchData();
    this.createMatrix();
  },

  watch: {
    "$route.params.year": async function() {
      const year = this.$route.params.year + "-01-01";
      this.selectedYear = parseISO(year);

      await this.fetchData();
      this.createMatrix();
    }
  },

  methods: {
    formatDate(date) {
      return format(date, "yyyy-MM");
    },

    async fetchData() {
      await this.$store.dispatch("measurements/getMeasurements", {
        date: format(this.selectedYear, "yyyy-MM-dd"),
        scale: "year"
      });

      this.min = startOfYear(this.selectedYear);
      this.max = endOfYear(this.selectedYear);
    },

    dayIsToday(day) {
      return isToday(day);
    },

    isAfterToday(day) {
      return isAfter(day, this.today);
    },

    createMatrix() {
      let calendar = [];

      const matrix = eachMonthOfInterval({
        start: startOfYear(this.selectedYear),
        end: endOfYear(this.selectedYear)
      });

      matrix.map(month => {
        calendar.push({
          date: month,
          monthName: format(month, "MMMM"),
          isCurrent: isThisMonth(month),
          isAfter: differenceInCalendarMonths(month, this.today) <= 0
        });
      });

      this.calendar = calendar;
    },

    prev() {
      let selectedYear = addYears(this.selectedYear, -1);

      this.$router.push("/year/" + format(selectedYear, "yyyy"));
    },

    next() {
      let selectedYear = addYears(this.selectedYear, 1);

      this.$router.push("/year/" + format(selectedYear, "yyyy"));
    }
  },

  computed: {
    getYear: function() {
      return format(this.selectedYear, "yyyy");
    },

    nextDisabled: function() {
      return isSameYear(this.selectedYear, this.today);
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid black;

  @media (min-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 450px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
