<template>
  <v-app-bar
      fixed
      color="white"
      elevation="1"
  >

    <!--left button menu-->
    <router-view name="buttonLeft"></router-view>

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
import hamburgerButton from "@/components/hamburgerButton";
export default {
  name: "navBar",

  components:{
    // eslint-disable-next-line vue/no-unused-components
    hamburgerButton
  }

}
</script>

<style scoped>

</style>