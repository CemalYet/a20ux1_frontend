<template>
  <v-app v-bind:class="{ summerColor: isSummer, fallColor: isFall, winterColor: isWinter, springColor: isSpring }">
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
import seasonThemeChanger from "@/layouts/seasonThemeChanger";

export default {
  name: "defaultLayout",

  data: () => ({
    isSummer: false,
    isFall: false,
    isWinter: false,
    isSpring: false,
  }),

  mounted() {
    this.changeTheme();
  },

  methods:{
    changeTheme(){
      let resolvedTheme = seasonThemeChanger();
      this.isSummer = resolvedTheme.isSummer;
      this.isFall = resolvedTheme.isFall;
      this.isWinter = resolvedTheme.isWinter;
      this.isSpring = resolvedTheme.isSpring;
    }
  },

  watch: {
    '$route'() {
      this.changeTheme();
    }
  },
}
</script>

<style scoped>
@import "seasonTheme.css";
</style>