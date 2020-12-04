<template>
  <v-bottom-navigation
      fixed
      grow
      extended>
    <v-btn color="white" :ripple="false">
      <v-icon large color=var(--main-color)>mdi-shield-star-outline</v-icon>
    </v-btn>

    <v-btn color=var(--dark-color) :ripple="false" @click.native="goToCamera">
      <v-icon x-large color="white">mdi-camera-plus-outline</v-icon>
    </v-btn>
    <v-btn color="white" :ripple="false" @click.native="goToMap">
      <v-icon large color=var(--main-color)>mdi-map-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "bottomNavBar",

  methods:{
    goToCamera(){
      this.$router.push({path:'snap'})
    },
    goToMap(){
      this.$router.push({path:'map'})
    },
  }
}
</script>

<style scoped>

</style>