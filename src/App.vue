<template>
  <router-view name="layout"></router-view>
</template>

<script>

//import axios from 'axios'


export default {
  name: 'App',


  mounted() {
    //this.$store.dispatch('fetchUserData'),
  },


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