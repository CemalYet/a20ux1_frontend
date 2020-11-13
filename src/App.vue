<template>
  <v-app>
    <!--Bar at the top of the page-->
    <router-view name="appBar"></router-view>

    <!--Navigation menu on the left side-->
    <router-view name="navDrawer"></router-view>

    <!--Page-->
    <v-main id="main">
      <br/>
      <br/>
      <br/>

      <!--Grid of Leaves-->
      <router-view name="pageContent"></router-view>

      <br/>
      <br/>

      <!--Navigation menu at the bottom-->
      <router-view name="bottomNavBar"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/components/appBar";
import navDrawer from "@/components/navDrawer";
//import axios from 'axios'


export default {
  name: 'App',

  data: () => ({
    group: null,
  }),

  watch: {
    group() {
      this.$store.commit("drawerFalse")
    },
  },

  components: {
    // eslint-disable-next-line vue/no-unused-components
    appBar,
    // eslint-disable-next-line vue/no-unused-components
    navDrawer
  },

  /*
  mounted() {
    this.$store.dispatch('fetchUserData'),
    axios.get('/public/feedcontroller/getDiscoveries').then(response => (this.discoveries = response["data"])),
    axios.get('/public/feedcontroller/getUserData').then(response => (this.userData = response["data"]))
  },

   */
};
</script>

<style>
@import 'styles.css';

#main {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}

</style>