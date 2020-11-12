<template>
  <v-app-bar
      fixed
      color="white"
      elevation="1"
  >

    <!--Hamburger menu-->
    <v-app-bar-nav-icon @click.stop="toggleDrawer">
      <v-icon large color=var(--dark-color)>mdi-menu</v-icon>
      <v-badge color="red" :content="this.$store.getters.getNotifications"></v-badge>
    </v-app-bar-nav-icon>

    <!-- Page title -->
    <v-spacer></v-spacer>
    <v-toolbar-title id="Title">snAPP</v-toolbar-title>
    <v-spacer></v-spacer>

    <!--Profile icon-->
    <v-btn icon>
      <v-icon large color=var(--dark-color)>mdi-account-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "navBar",

  methods:{
    toggleDrawer(){
      this.$store.commit("toggleDrawer");
    }
  }

}
</script>

<style scoped>

</style>