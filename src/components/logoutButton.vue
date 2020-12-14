<template>
  <v-btn
      icon
      @click.native="logOut">
    <v-icon medium color=var(--dark-color)>mdi-logout</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "logoutButton",

  methods:{
    logOut(){
      this.$store.dispatch('logOut');
      this.$router.push({path: '/login'});
    }
  }
}
</script>

<style scoped>

</style>