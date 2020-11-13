<template>
  <v-container>
    <div id="app">
      <h1>Camera</h1>
      <v-container>
        <v-layout class="justify-center mr-xs-1" >
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
        <v-flex xs6 sm6 md4 lg3 v-for="c in captures" :key="c.id" >
          <v-card shaped flat class="text-xs-center ma-3">
            <v-img v-bind:src="c" height="200" >
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-container>

</template>

<script>
export default {
  name: "camera",

  data : () => ({
      video: {},
      canvas: {},
    captures: [],
  }),

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

<style scoped>

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