<template>
  <v-app-bar app color="primary" dark height="50">
    <div class="d-flex align-center"></div>

    <v-spacer></v-spacer>

    <v-btn to="/" color="primary" class="mr-2">
      <span class="mr-2">Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn v-bind="attrs" v-on="on" color="primary">
          <span class="mr-2">Calendar</span>
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item link :to="'/month/' + month">
          <v-list-item-title>month</v-list-item-title>
        </v-list-item>

        <v-list-item link :to="'/year/' + year">
          <v-list-item-title>year</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",

  data() {
    return {
      month: new Date(),
      year: new Date()
    };
  },

  created() {
    const today = new Date();
    const month = today.getMonth() + 1;

    this.month = today.getFullYear() + "-" + (month <= 9 ? "0" + month : today);
    this.year = today.getFullYear();
  }
};
</script>

<style scoped></style>
