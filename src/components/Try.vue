<template>
  <div id="app">
    <h1>Camera</h1>
    <div><video ref="video" id="video" width="640" height="480" autoplay></video></div>
    <div id="button">
      <v-btn @click='capture' class="mx-2" fab dark color="indigo">
      <v-icon dark>mdi-camera</v-icon>
    </v-btn>
      <v-btn @click='stopCameraStream' class="mx-2" fab dark color="indigo">
        <v-icon dark>mdi-camera</v-icon>
      </v-btn>
    </div>
    <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
    <ul>
      <li v-for="c in captures" :key="c.id">
        <img v-bind:src="c" height="100" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Try',
  data() {
    return {
      video: {},
      canvas: {},
      captures: []
    }
  },
  mounted() {
    this.video = this.$refs.video;
    navigator.mediaDevices.getUserMedia({ video: true })
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
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #F0F0F0;
}
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 35px;
}
#video{
  text-align: center;
}

#video {
  background-color: #000000;
}
#canvas {
  display: none;
  box-shadow:4px 4px 12px 0px transparentize($color:#171717,$amount:0.75)
}
li {
  display: inline;
  padding: 5px;
}
</style>