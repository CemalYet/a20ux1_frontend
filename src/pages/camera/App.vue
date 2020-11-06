<template>
  <v-app>
    <!--Bar at the top of the page-->
    <v-app-bar
        hide-on-scroll
        absolute
        color="white"
        scroll-target="#scrolling-techniques-4"
        elevation="1"
    >

      <!--Hamburger menu-->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon large color=var(--dark-color)>mdi-menu</v-icon>
        <v-badge color="red" :content="notifications"></v-badge>
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

    <!--Page-->
    <v-main>
      <br/>
      <br/>

      <!--Camera-->
      <v-container>
        <div id="app">
          <h1>Camera</h1>
          <v-container>
            <v-layout justify-center >
              <v-card  shaped flat>
            <video ref="video" id="video"  :width="getWidth" :height="getHeight" autoplay></video>
              </v-card>
            </v-layout>
          </v-container>
          <div id="button">
            <v-btn @click='capture' class="mx-2" fab dark color=var(--dark-color) :ripple="false">
              <v-icon x-large color="white">mdi-camera-outline</v-icon>
            </v-btn>
          </div>
          <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
          <v-layout row wrap>
             <v-flex xs12 sm6 md4 lg3 v-for="c in captures" :key="c.id" >
               <v-card shaped flat class="text-xs-center ma-3">
                 <v-img v-bind:src="c" height="200" >
                 </v-img>
               </v-card>
              </v-flex>
          </v-layout>




        </div>
      </v-container>
      <br/>
      <br/>

      <!--Navigation menu on the left side-->
      <v-navigation-drawer
          v-model="drawer"
          fixed
          temporary
      >
        <v-list
            nav
            dense
        >
          <!--Avatar + name-->
          <v-list-item two-line>
            <v-list-item-avatar size="70">
              <v-img :src="avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>Seppe Fleerackers</v-list-item-title>
              <v-list-item-subtitle>@seppe.f</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <!--Menu options-->
          <v-list-item link :ripple="false">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-tree-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Discoveries</v-list-item-title>
          </v-list-item>
          <v-list-item link :ripple="false">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-account-plus-outline</v-icon>
              <v-badge color="red" :content="notifications" overlap></v-badge>
            </v-list-item-icon>
            <v-list-item-title>Friends</v-list-item-title>
          </v-list-item>
          <v-list-item link :ripple="false">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-shield-star-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Badges</v-list-item-title>
          </v-list-item>
          <v-list-item link :ripple="false">
            <v-list-item-icon>
              <v-icon large color=var(--main-color)>mdi-map-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Map</v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- Settings button-->
        <template v-slot:append>
          <div class="pa-2">
            <v-btn text :ripple="false">
              <v-icon large color=var(--main-color) left>mdi-cog-outline</v-icon>
              Settings
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <!--Navigation menu at the bottom-->
      <v-bottom-navigation
          fixed
          grow
          extended>
        <v-btn color="white" :ripple="false">
          <v-icon large color=var(--main-color)>mdi-shield-star-outline</v-icon>
        </v-btn>
        <v-btn color="white" :ripple="false">
          <v-icon large color=var(--main-color)>mdi-map-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({

      video: {},
      canvas: {},
      captures: [],
      drawer: false,
      group: null,
      notifications: 2,
      avatar: "https://scontent-bru2-1.xx.fbcdn.net/v/t31.0-8/27907755_964224010401572_4566376548678829171_o.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=2wrEVoQrdBkAX9MBLOP&_nc_ht=scontent-bru2-1.xx&oh=81c5c254570b087bda35d1ced5624cac&oe=5FC6E541",
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
  computed :{
    getWidth() {
      if(this.$vuetify.breakpoint.mobile){
        return 426
      } else {
        return 640
      }

    },
    getHeight() {
      if(this.$vuetify.breakpoint.mobile){
        return 320
      } else {
        return 480
      }
    }
  },
  mounted() {
    const constraints = (window.constraints = {
      audio: false,
      video: { facingMode: "environment" }
    });
    this.video = this.$refs.video;
    navigator.mediaDevices.getUserMedia(constraints)
        .then(mediaStream => {
          this.mediaStream = mediaStream
          this.video.srcObject = mediaStream
          this.video.play()
        })

  },
  methods: {
    capture() {
      this.canvas = this.$refs.canvas;
      let context = this.canvas.getContext("2d")
      context .drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(this.canvas.toDataURL("image/png"));

      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      return imageCapture.takePhoto().then(blob => {
        console.log(blob)
      })
    },
    stopCameraStream() {
      let tracks = this.$refs.video.srcObject.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    },

  }
}
</script>

<style>
@import '../styles.css';

#app {
  text-align: center;
  color: #2c3e50;
}
#video{
  text-align: center;
}

#video {
  background-color: #000000;
}
#canvas {
  display: none;

}
li {
  display: inline;
  padding: 5px;
}
</style>