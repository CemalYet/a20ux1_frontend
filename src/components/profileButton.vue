<template>
  <v-btn
      icon
      @click.native="goToProfile">
    <v-icon large color=var(--dark-color)>mdi-account-outline</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "profileButton",

  methods:{
    goToProfile(){
      this.$router.push({path: `/profile/${this.getLoggedInUserData[0].userId}`})
    }
  },

  computed:{
    getLoggedInUserData(){
      return this.$store.getters.getLoggedInUserData;
    }
  }
}
</script>

<style scoped>

</style>