<template>
  <v-container>
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
  isAfter
} from "date-fns";
import LineChart from "@/components/Charts/LineChart";
import { chartDataMixin } from "@/helpers/chartDataMixin";

export default {
  name: "Calendar",
  components: { LineChart },
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

  created() {
    this.fetchData();
  },

  mounted() {
    this.createMatrix();
  },

  methods: {
    async fetchData() {
      await this.$store.dispatch("measurements/getMeasurements", {
        date: this.formatDate(this.selectedMonth),
        scale: "month"
      });

      this.min = this.stripToDate(startOfMonth(this.selectedMonth));
      this.max = this.stripToDate(endOfMonth(this.selectedMonth));

      this.fillData();
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
          start: startOfMonth(this.today),
          end: endOfMonth(this.today)
        },
        { weekStartsOn: 1 }
      );

      matrix.map(weekDay =>
        eachDayOfInterval({
          start: startOfISOWeek(weekDay),
          end: endOfISOWeek(weekDay)
        }).map(day => {
          if (isSameMonth(this.today, day)) {
            calendar.push(day);
          } else {
            calendar.push(null);
          }
        })
      );

      this.calendar = calendar;
    }
  }
};
</script>

<style lang="scss">
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
