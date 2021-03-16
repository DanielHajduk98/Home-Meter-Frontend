<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: { Navbar },

  beforeCreate() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
html {
  overflow-y: auto !important;
}

#app {
  background-color: #616161;
  color: white;
}
</style>
