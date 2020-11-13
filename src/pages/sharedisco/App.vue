<template>
  <v-app>
    <v-app-bar
        fixed
        color="white"
        elevation="1">

      <!-- Arrow back -->
      <v-app-bar-nav-icon>
        <v-icon large color="#00251A">mdi-keyboard-backspace</v-icon>
      </v-app-bar-nav-icon>

      <!-- Title: Share -->
      <v-spacer></v-spacer>
      <v-toolbar-title id="Title">Share</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
      </v-btn>

    </v-app-bar>


    <v-main>
      <br>
      <br>
      <br>

      <div class="content">
        <div class="middlecontainer">
          <div class="center">
            <div class="img">

            </div>
            <div class="share">
              <p class="subtitle"> Share discovery </p>
              <v-divider color="00251A" ></v-divider>
              <div class="icons">
                <v-btn icon>
                  <v-icon large color="#00251A">mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon large color="#00251A">mdi-instagram</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon large color="#00251A">mdi-twitter</v-icon>
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
export default {
name: "App.vue"
}
</script>

<style scoped>

#Title {
  font-family: 'Merriweather', serif;
  font-size: 35px;
  color: var(--dark-color);
}

.content {
  height: 100%;
}

.middlecontainer {
  width: 350px;
  height: 100%;
  margin: auto;
}

.img {
  margin: auto;
  background-color: coral;
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

</style>