<template>
  <v-app>
    <Navbar />
    <v-main style="position: relative">
      <router-view />
      <v-overlay
        :absolute="true"
        :value="isLoading"
        :class="{ 'loader--true': isLoading }"
        color="overlay"
      >
        <v-progress-circular
          width="10"
          :size="100"
          color="white"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: { Navbar },

  watch: {
    isLoading: function(newValue) {
      if (newValue) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }
  },

  beforeCreate() {
    this.$vuetify.theme.dark = true;
  },

  computed: {
    isLoading: function() {
      return this.$store.getters["loader/isLoading"];
    }
  }
};
</script>

<style lang="scss">
html {
  overflow-y: auto !important;
}

#app {
  background-color: #616161;
  color: white;
}

body.no-scroll {
  overflow: hidden;
}

.loader--true {
  height: calc(100vh - 50px) !important;
}
</style>
