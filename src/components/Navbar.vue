<template>
  <v-app-bar app color="primary" dark height="50">
    <div class="d-flex align-center"></div>

    <v-spacer></v-spacer>

    <v-btn to="/" color="primary" class="mr-2">
      <span class="mr-2">Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>
    <v-btn :to="'/month/' + date" color="primary">
      <span class="mr-2">Calendar</span>
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      date: new Date()
    };
  },

  created() {
    const month = this.date.getMonth() + 1;
    this.date =
      this.date.getFullYear() + "-" + (month <= 9 ? "0" + month : month);
  }
};
</script>

<style scoped></style>
