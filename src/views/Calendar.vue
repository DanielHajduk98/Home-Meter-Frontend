<template>
  <v-container>
    <v-row>
      <v-col>
        <header class="d-flex flex-row justify-center align-center mx-n2">
          <v-btn icon class="mx-2" @click="prev()">
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn>
          <h1 class="mx-2">{{ getMonth }}</h1>
          <v-btn icon class="mx-2" @click="next()" :disabled="nextDisabled">
            <v-icon>mdi-arrow-right-circle</v-icon>
          </v-btn>
        </header>
      </v-col>
    </v-row>

    <div class="calendar">
      <div
        class="day"
        :class="{ 'day--today': dayIsToday(day) }"
        v-for="(day, index) in calendar"
        :key="index"
      >
        <router-link
          v-if="day && !isAfterToday(day)"
          :to="dayIsToday(day) ? '/' : '/day/' + formatDate(day)"
          class="day__content"
        >
          {{ day.getDate() }}
        </router-link>
        <div v-else class="day__content">
          {{ day ? day.getDate() : "" }}
        </div>
      </div>
    </div>

    <v-row class="mt-4">
      <v-col
        v-for="(chartData, index) in chartsData"
        :key="index"
        cols="12"
        class="py-2"
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
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  eachDayOfInterval,
  isSameMonth,
  startOfISOWeek,
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
      min: new Date(),
      max: new Date(),
      calendar: []
    };
  },

  async created() {
    const date = this.$route.params.date + "-01";

    this.min = this.stripToDate(startOfMonth(this.selectedMonth));
    this.max = this.stripToDate(addDays(endOfMonth(this.selectedMonth), 1));

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

      this.min = this.stripToDate(startOfMonth(this.selectedMonth));
      this.max = this.stripToDate(addDays(endOfMonth(this.selectedMonth), 1));
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

      matrix.map(weekDay =>
        eachDayOfInterval({
          start: startOfISOWeek(weekDay),
          end: endOfISOWeek(weekDay)
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

.day {
  position: relative;
  border: 1px solid black;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  &--today {
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
