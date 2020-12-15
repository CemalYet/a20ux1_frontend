<template>
  <router-view name="layout"
               v-bind:class="{ summer: isSummer, fall: isFall, winter: isWinter, spring: isSpring }"></router-view>
</template>

<script>
export default {
  name: 'App',

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
};
</script>

<style>
@import 'styles.css';

.summer {
  --light-color: #bef67a;
  --main-color: #8bc34a;
  --dark-color: #5a9216;
}

.fall {
  --light-color: #ffd149;
  --main-color: #ffa000;
  --dark-color: #c67100;
}

.winter {
  --light-color: #39796b;
  --main-color: #004d40;
  --dark-color: #00251a;
}

.spring {
  --light-color: #80e27e;
  --main-color: #4caf50;
  --dark-color: #087f23;
}

</style>