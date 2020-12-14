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
    <v-toolbar-title id="Title">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <!--Profile icon-->
    <router-view name="buttonRight"></router-view>
    <router-view name="buttonNextToRight"></router-view>

  </v-app-bar>
</template>

<script>
import hamburgerButton from "@/components/hamburgerButton";
export default {
  name: "navBar",

  props: {
    title: String
  },

  components:{
    // eslint-disable-next-line vue/no-unused-components
    hamburgerButton
  }

}
</script>

<style scoped>

</style>