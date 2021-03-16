<template>
  <v-container>
    <div class="calendar">
      <div
        class="day"
        :class="{ 'day--today': DayIsToday(day) }"
        v-for="(day, index) in calendar"
        :key="index"
      >
        <router-link
          v-if="day"
          :to="'/day/' + formatDate(day)"
          class="day__content"
        >
          {{ day.getDate() }}
        </router-link>
      </div>
    </div>
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
  format
} from "date-fns";

export default {
  name: "Calendar",

  data() {
    return {
      today: new Date(),
      calendar: []
    };
  },

  mounted() {
    this.createMatrix();
  },

  methods: {
    formatDate(day) {
      return format(day, "yyyy-MM-dd");
    },

    DayIsToday(day) {
      return isToday(day);
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
