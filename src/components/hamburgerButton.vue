<template>
  <v-app-bar-nav-icon @click.stop="toggleDrawer">
    <v-icon large color=var(--dark-color)>mdi-menu</v-icon>
    <v-badge color="red" :content="this.$store.getters.getNotifications"></v-badge>
  </v-app-bar-nav-icon>
</template>

<script>
export default {
  name: "hamburgerButton",

  methods:{
    toggleDrawer(){
      this.$store.commit("toggleDrawer");
    }
    
  }
}
</script>

<style scoped>

</style>