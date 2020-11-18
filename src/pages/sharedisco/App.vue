<template>
  <v-app>
    <v-app-bar
        fixed
        color="white"
        elevation="1">

      <!-- Arrow back -->
      <v-app-bar-nav-icon>
        <v-icon large color=var(--dark-color)>mdi-keyboard-backspace</v-icon>
      </v-app-bar-nav-icon>

      <!-- Title: Share -->
      <v-spacer></v-spacer>
      <v-toolbar-title id="Title">Share</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
      </v-btn>

    </v-app-bar>


    <v-main id="main">
      <br>
      <br>
      <br>

      <div class="content">
        <div class="middlecontainer">
          <div class="center">
            <div class="img">
              <v-img height="350" :src="discovery[0].photoPath"></v-img>
            </div>
            <div class="share">
              <p class="subtitle"> Share discovery </p>
              <v-divider color=var(--dark-color) ></v-divider>
              <!-- NOT IMPLEMENTED YET: actually sharing on social media, but I think it can be done with vue-social-sharing -->
              <div class="icons">
                <v-btn icon>
                  <v-icon large color=var(--dark-color)>mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon large color=var(--dark-color)>mdi-instagram</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon large color=var(--dark-color)>mdi-twitter</v-icon>
                </v-btn>
              </div>

            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App.vue",

  data: () => ({
    discovery: null
  }),

  mounted() {
    axios.get('/public/discovery/getDiscoInfo').then(response => (this.discovery = response["data"]))
  }
}
</script>

<style scoped>
@import '../styles.css';

#Title {
  font-family: 'Merriweather', serif;
  font-size: 35px;
  color: var(--dark-color);
}

.content {
  height: 100%;
}

#main {
  background-image: url(leaves.png);
  background-color: rgba(255, 255, 255, 0.4);
  background-blend-mode: lighten;
  background-repeat: repeat;
  background-position: center;
}

.middlecontainer {
  width: 350px;
  height: 100%;
  margin: auto;
}

.img {
  margin: auto;
  width: 350px;
  height: 350px;
  display: flex;
  justify-content: flex-end;
  padding: 3px;
}

.center {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.subtitle {
  font-family: 'Merriweather', serif;
  font-size: 20px;
  color: var(--dark-color);
  text-align: center;
}

.icons {
  display: flex;
  justify-content: center;
  padding: 5px 5px 5px 5px;
}

.share {
  padding-top: 20px;
}

</style>