<template>
  <v-app>
    <!--Bar at the top of the page-->
    <router-view name="appBar"></router-view>

    <!--Navigation menu on the left side-->
    <router-view name="navDrawer"></router-view>

    <!--Page-->
    <v-main id="main">
      <br/>
      <br/>


      <!--Grid of Leaves-->
      <router-view name="pageContent"></router-view>

      <br/>
      <br/>

      <!--Navigation menu at the bottom-->
      <router-view name="bottomNavBar"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/components/appBar";
import navDrawer from "@/components/navDrawer";

export default {
  name: "defaultLayout",

  components: {
    // eslint-disable-next-line vue/no-unused-components
    appBar,
    // eslint-disable-next-line vue/no-unused-components
    navDrawer
  },
}
</script>

<style scoped>

</style>