<template>
  <v-app>
    <!--Bar at the top of the page-->
    <v-app-bar
        fixed
        color="white"
        elevation="1"
    >
      <!--Back button-->
      <v-btn icon>
        <v-icon large color=var(--dark-color)>mdi-arrow-left</v-icon>
      </v-btn>

      <!--Page title-->
      <v-spacer></v-spacer>
      <v-toolbar-title id="Title">Share</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <!--Page-->
    <v-main id="main">
      <br/>
      <br/>
      <br/>

      <h1>Welcome to the share page!</h1>

      <!--Navigation menu at the bottom-->
      <v-bottom-navigation
          fixed
          grow
          extended>
        <v-btn text :ripple="false">
          Cancel
        </v-btn>
        <v-btn text :ripple="false">
          Confirm
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    group: null,
    userData: null,
  }),
};
</script>

<style>
@import '../styles.css';

#main {
  background-image: url(../leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}
</style>