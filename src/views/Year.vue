<template>
  <v-container>
    <v-row>
      <v-col>
        <header class="d-flex flex-row justify-center align-center mx-n2">
          <v-btn icon class="mx-2" @click="prev()">
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn>
          <h1 class="mx-2">{{ getYear }}</h1>
          <v-btn icon class="mx-2" @click="next()" :disabled="nextDisabled">
            <v-icon>mdi-arrow-right-circle</v-icon>
          </v-btn>
        </header>
      </v-col>
    </v-row>

    <v-row class="calendar">
      <v-col
        cols="6"
        sm="4"
        lg="3"
        v-for="(month, index) in calendar"
        :key="index"
      >
        <div class="month" :class="{ 'month--current': month.isCurrent }">
          <router-link
            v-if="month.isAfter"
            :to="'/month/' + formatDate(month.date)"
            class="month__content"
          >
            {{ month.monthName }}
          </router-link>
          <div v-else class="month__content">
            {{ month.monthName }}
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col
        v-for="(chartData, index) in chartsData"
        :key="index"
        cols="12"
        class="py-2"
      >
        <Chart
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
  height: 90vh;
}

.month {
  position: relative;
  border: 1px solid black;
  height: 100%;

  &--current {
    background-color: var(--v-primary-base);
  }

  &__content {
    color: var(--v-text-base) !important;
    text-decoration: none;

    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
