<template>
  <v-app>
    <v-main v-bind:class="{ summer: isSummer, fall: isFall, winter: isWinter, spring: isSpring }">
      <router-view name="map"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import seasonThemeChanger from "@/layouts/seasonThemeChanger";
export default {
  name: "mapLayout",

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