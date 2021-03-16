<template>
  <v-app-bar app color="primary" dark height="50">
    <div class="d-flex align-center"></div>

    <v-spacer></v-spacer>

    <v-btn to="/" color="primary" class="mr-2">
      <span class="mr-2">Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>
    <v-btn to="/calendar" color="primary">
      <span class="mr-2">Calendar</span>
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped></style>
