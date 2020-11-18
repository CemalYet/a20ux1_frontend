<template>
  <router-view name="layout"></router-view>
</template>

<script>

//import axios from 'axios'


export default {
  name: 'App',

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