<template>
  <v-app>
    <v-main v-bind:class="{ summer: isSummer, fall: isFall, winter: isWinter, spring: isSpring }">
      <router-view name="map"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "mapLayout",

  data: () => ({
    isSummer: false,
    isFall: false,
    isWinter: false,
    isSpring: false,
  }),

  methods: {
    changeTheme() {
      {
        let theme = this.$store.getters.getTheme;
        if (theme === "Seasons") {
          let createSeasonResolver = require('date-season')
          let seasonNorth = createSeasonResolver()
          let date = new Date()
          if (seasonNorth(date) === 'Summer') {
            this.isSummer=true;
            this.isFall=false;
            this.isWinter=false;
            this.isSpring=false;
          }
          if (seasonNorth(date) === 'Fall') {
            this.isFall=true;
            this.isSummer=false;
            this.isWinter=false;
            this.isSpring=false;
          }
          if (seasonNorth(date) === 'Winter') {
            this.isWinter=true;
            this.isSummer=false;
            this.isFall=false;
            this.isSpring=false;
          }
          if (seasonNorth(date) === 'Spring') {
            this.isSpring=true;
            this.isSummer=false;
            this.isFall=false;
            this.isWinter=false;
          }
        }
        if (theme === "Summer") {
          this.isSummer=true;
          this.isFall=false;
          this.isWinter=false;
          this.isSpring=false;
        }
        if (theme === "Fall") {
          this.isFall=true;
          this.isSummer=false;
          this.isWinter=false;
          this.isSpring=false;
        }
        if (theme === "Winter") {
          this.isWinter=true;
          this.isSummer=false;
          this.isFall=false;
          this.isSpring=false;
        }
        if (theme === "Spring") {
          this.isSpring=true;
          this.isSummer=false;
          this.isFall=false;
          this.isWinter=false;
        }
      }
    }
  },

  mounted() {
    this.changeTheme();
  },

  watch: {
    '$route'() {
      this.changeTheme();
    }
  },
}
</script>

<style scoped>

.summer {
  background-image: url(../summer.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
  background-size: 100vh;
}

.fall {
  background-image: url(../fall.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
  background-size: 100vh;
}

.winter {
  background-image: url(../winter.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
  background-size: 100vh;
}

.spring {
  background-image: url(../spring.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
  background-size: 100vh;
}

@media (min-width: 900px) {
  .summer {
    background-size: auto;
  }
  .fall {
    background-size: auto;
  }
  .winter {
    background-size: auto;
  }
  .spring {
    background-size: auto;
  }

}
</style>