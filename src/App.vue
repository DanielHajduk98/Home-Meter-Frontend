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
          width="5"
          :size="100"
          color="white"
          indeterminate
        ></v-progress-circular>
      </v-overlay>

      <v-container class="fab-container">
        <v-fade-transition>
          <v-btn
            v-if="scrollPosition >= 700"
            @click="scrollToTop"
            class="fab"
            color="primary"
            elevation="2"
            fab
          >
            <v-icon>mdi-arrow-up-bold</v-icon>
          </v-btn>
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: { Navbar },

  data() {
    return {
      scrollPosition: null
    };
  },

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

  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },

  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },

    scrollToTop() {
      this.$vuetify.goTo(0);
    }
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
  overflow-y: hidden !important;
  height: 100vh;
}

.loader--true {
  height: calc(100vh - 50px) !important;
}

.fab-container {
  position: sticky;
  bottom: 0;
  right: 0;
  display: flex;
  pointer-events: none;
  justify-content: flex-end;

  & > .fab {
    pointer-events: auto;
  }
}

.v-main__wrap {
  position: relative;
}
</style>
