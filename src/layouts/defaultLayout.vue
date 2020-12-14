<template>
  <v-app>
    <!--Bar at the top of the page-->
    <router-view name="appBar"></router-view>

    <!--Navigation menu on the left side-->
    <router-view name="navDrawer"></router-view>

    <!--Page-->
    <v-main v-bind:class="{ summer: isSummer, fall: isFall, winter: isWinter, spring: isSpring }">
      <br/>
      <br/>


      <!--Grid of Leaves-->
      <router-view name="pageContent"></router-view>

      <!--Navigation menu at the bottom-->
      <router-view name="bottomNavBar"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/components/appBar";
import navDrawer from "@/components/navDrawer";

export default {
  name: "defaultLayout",

  data: () => ({
    isSummer: false,
    isFall: false,
    isWinter: false,
    isSpring: false,
  }),

  components: {
    // eslint-disable-next-line vue/no-unused-components
    appBar,
    // eslint-disable-next-line vue/no-unused-components
    navDrawer
  },

  mounted() {
    let createSeasonResolver = require('date-season')
    let seasonNorth = createSeasonResolver()
    let date = new Date()
    if (seasonNorth(date) === 'Summer') {
      this.isSummer=true;
    }
    if (seasonNorth(date) === 'Fall') {
      this.isFall=true;
    }
    if (seasonNorth(date) === 'Winter') {
      this.isWinter=true;
    }
    if (seasonNorth(date) === 'Spring') {
      this.isSpring=true;
    }
  }
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