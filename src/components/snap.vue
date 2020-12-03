<template>
  <v-container>
    <br>
    <!--Camera-->
    <v-container>
      <div class="mx-auto" style="max-width: 100%">
        <div style="text-align: center">
          <h3>You can add as many pictures until you are happy with your match.</h3>
        </div>
        <v-layout class="justify-center">
          <video
              ref="video"
              id="video"
              autoplay
          >
          </video>
        </v-layout>
        <canvas ref="canvas" id="canvas"></canvas>

        <!-- Camera button -->
        <v-row
            align="center"
            justify="space-around"
            class="py-3"
        >
          <v-btn
              class="mx-auto"
              @click="capture"
              color=var(--dark-color)
              align-center
              elevation="2"
              raised
              :ripple="false"
              height="55"
              width="100"
          >
            <v-icon x-large color="white">mdi-camera-plus-outline</v-icon>
          </v-btn>
        </v-row>
      </div>
    </v-container>

    <!--Picture carousel-->
    <v-container
        v-if="getInformationCards[0].title != null"
    >
      <div class="mx-auto" style="max-width: 100%">
        <div style="text-align: center">
          <h3>Click on a match to see more information and confirm the one you want to add to the discovery.</h3>
        </div>
        <v-row
            class="mx-auto"
            style="max-width: 800px"
        >
          <template v-for="(card, i) in getInformationCards">
            <v-col :key="i">
              <v-card id="card-outer">
                <v-progress-linear
                    :value=card.percentage
                    color=var(--dark-color)
                    class="mx-auto white--text"
                    height="24"
                >
                  {{ card.percentage }}%
                </v-progress-linear>
                <div class="d-flex flex-no-wrap justify-space-between card_wrapper">
                  <div id="card_text">
                    <h1 class="headline">{{card.title}}</h1>
                    <v-card-subtitle style="padding: 0; margin-left: 16px">
                      <p class="font-italic">
                        {{ card.subtitle }}
                      </p>
                    </v-card-subtitle>
                      <v-btn
                          id="info_button"
                          outlined
                          small
                          @click="getInformation(i)"
                      >
                        MORE INFORMATION
                      </v-btn>
                  </div>

                  <div class="image">
                  <v-avatar
                      size="125"
                      tile
                  >
                    <v-img :src="card.src"></v-img>
                  </v-avatar>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-responsive
                v-if="i+1 === 2"
                :key="`width-${i+1}`"
                width="100%"
            ></v-responsive>
          </template>
        </v-row>
      </div>
    </v-container>
    <v-snackbar
        v-model="updateSnackbar"
        color="error"
        style="padding: 12px"
    >
      {{updateSnackbarMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="updateSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>

import api_connection from "@/api_connect";

export default {
  name: "snap",

  data: () => ({
    video: {},
    canvas: {},
    captures: [],
    cols: 1,
    model: null,
    show: false,
    storeData: null,
  }),

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

  computed: {
    getInformationCards(){
      return this.$store.getters.getInformationCards;
    },
    updateSnackbar: {
      get() {
        return this.$store.getters.getSnackbar;
      },
      set(value) {
        this.$store.commit("updateSnackbar", value)
      }
    },
    updateSnackbarMessage() {
      return this.$store.getters.getSnackbarMessage;
    }
  },


  methods: {
    updateDiscoveryImages() {
      this.$store.commit('updateDiscoveryImages', this.captures[0])
    },
    getInformation(id) {
      this.$store.commit('updateCardId', id);
      this.$router.push({path: '/information'});
    },


    capture() {
      this.show = true;
      this.canvas = this.$refs.canvas;
      let context = this.canvas.getContext("2d")
      context.drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(this.canvas.toDataURL("image/png"));
      //console.log(this.captures)

      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(mediaStreamTrack)
      // eslint-disable-next-line no-unused-vars
      imageCapture.takePhoto().then(blob => {
        api_connection(this.captures[0]); ['nsbdfijwhbfiuwfbweiufbifubfiuwefbwieufbweiufb']  [{naam: 'iets', photoPath: 'sdkjhfsiufhsdiufhsdfhdsdsfsdf'}]
      })
      this.$store.commit('updateDiscoveryImages', this.captures[0])
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
main {
  background-image: url(../leaves.png);
  background-repeat: repeat;
  background-position: center;
}

.my-span {
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 10px 10px 0 0;
}

#video {
  background-color: #000000;
  max-width: 100%;
  border-radius: 5px;
}

#canvas {
  width: 100%;
  display: none;
}

.headline {
  margin: 2px 2px 2px 16px;
}

#card-outer {
  position: relative;
  height: 200px;
}

.card_wrapper{
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  grid-template-rows: repeat(4, 1fr);
}

#card_text{
  grid-area: 1 / 1 / 5 / 2;
}

.image {
  grid-area: 1 / 2 / 5 / 3;
}

#info_button {
  position: absolute;
  bottom: 15px;
  margin-left: 16px;
}

</style>