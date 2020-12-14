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

  mounted() {
    let createSeasonResolver = require('date-season')
    let seasonNorth = createSeasonResolver()
    let date = new Date()
    if (seasonNorth(date) === 'Summer') {
      console.log(seasonNorth(date))
      this.isSummer=true;
    }
    if (seasonNorth(date) === 'Fall') {
      console.log(seasonNorth(date))
      this.isFall=true;
    }
    if (seasonNorth(date) === 'Winter') {
      console.log(seasonNorth(date))
      this.isWinter=true;
    }
    if (seasonNorth(date) === 'Spring') {
      console.log(seasonNorth(date))
      this.isSpring=true;
    }
  }
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