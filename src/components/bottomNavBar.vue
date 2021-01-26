<template>
  <v-bottom-navigation
      fixed
      grow
      extended>
    <v-btn color="white" :ripple="false" @click.native="goToBadges()">
      <v-icon large color=var(--main-color)>mdi-medal-outline</v-icon>
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
  data: () => ({
    userId:null
  }),

  mounted() {
    this.userId=this.$store.getters.getLoggedInUserData[0].userId
  },
  methods:{
    goToCamera(){
      this.$router.push({path:'snap'})
    },
    goToMap(){
      this.$router.push({path:'map'})
    },
    goToBadges(){
      if(typeof(this.userId)!=='undefined'){
        this.$router.push({path: `/profile/${this.userId}?tab=badges`})}
    }
  }
}
</script>