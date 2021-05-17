<template>
  <v-container>
    <v-row>
      <v-col>
        <header class="d-flex flex-row justify-center align-center mx-n2">
          <v-btn
            ref="btn-prev"
            x-large
            icon
            class="mx-2 btn-prev"
            @click.native="prev()"
          >
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn>
          <h1 ref="calendar-header" class="mx-2 calendar-header">
            {{ getMonth }}
          </h1>
          <v-btn
            ref="btn-next"
            x-large
            icon
            class="mx-2 btn-next"
            @click.native="next()"
            :disabled="nextDisabled"
          >
            <v-icon>mdi-arrow-right-circle</v-icon>
          </v-btn>
        </header>
        {{ new Date() }}
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col cols="12" sm="10" xl="6" class="calendar">
        <div
          class="calendar-node"
          :class="{
            'calendar-node--current': dayIsToday(day),
            'calendar-node--available': day && !isAfterToday(day)
          }"
          v-for="(day, index) in calendar"
          :key="index"
        >
          <router-link
            v-if="day && !isAfterToday(day)"
            :to="dayIsToday(day) ? '/' : '/day/' + formatDate(day)"
            class="calendar-node__content"
          >
            {{ day.getDate() }}
          </router-link>
          <div v-else class="calendar-node__content">
            {{ day ? day.getDate() : "" }}
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="pa-0 d-none d-sm-block mt-sm-5">
        <hr class="mt-5 mb-4" />
      </v-col>

      <v-col
        v-for="(chartData, index) in chartsData"
        :key="index"
        cols="12"
        class="py-5"
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
import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  eachDayOfInterval,
  isSameMonth,
  endOfISOWeek,
  isToday,
  format,
  isAfter,
  parseISO,
  addMonths,
  addDays
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
      selectedMonth: new Date(),
      calendar: []
    };
  },

  async created() {
    const date = this.$route.params.date + "-01";
    this.selectedMonth = parseISO(date);
    await this.fetchData();
    this.createMatrix();
  },

  watch: {
    "$route.params.date": async function() {
      const date = this.$route.params.date + "-01";
      this.selectedMonth = parseISO(date);

      await this.fetchData();
      this.createMatrix();
    }
  },

  methods: {
    async fetchData() {
      await this.$store.dispatch("measurements/getMeasurements", {
        date: this.formatDate(this.selectedMonth),
        scale: "month"
      });

      this.range = {
        min: this.stripToDate(startOfMonth(this.selectedMonth)),
        max: this.stripToDate(addDays(endOfMonth(this.selectedMonth), 1))
      };
    },

    formatDate(day) {
      return format(day, "yyyy-MM-dd");
    },

    dayIsToday(day) {
      return isToday(day);
    },

    isAfterToday(day) {
      return isAfter(day, this.today);
    },

    createMatrix() {
      let calendar = [];

      const matrix = eachWeekOfInterval(
        {
          start: startOfMonth(this.selectedMonth),
          end: endOfMonth(this.selectedMonth)
        },
        { weekStartsOn: 1 }
      );

      matrix.map(week =>
        eachDayOfInterval({
          start: week,
          end: endOfISOWeek(week)
        }).map(day => {
          if (isSameMonth(this.selectedMonth, day)) {
            calendar.push(day);
          } else {
            calendar.push(null);
          }
        })
      );

      this.calendar = calendar;
    },

    prev() {
      let selectedMonth = addMonths(this.selectedMonth, -1);
      this.$router.push("/month/" + format(selectedMonth, "yyyy-MM"));
    },

    next() {
      let selectedMonth = addMonths(this.selectedMonth, 1);
      this.$router.push("/month/" + format(selectedMonth, "yyyy-MM"));
    }
  },

  computed: {
    getMonth: function() {
      return format(this.selectedMonth, "MMMM yyyy");
    },

    nextDisabled: function() {
      return isSameMonth(this.selectedMonth, this.today);
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid black;
}
</style>
