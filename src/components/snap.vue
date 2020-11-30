<template>
  <v-app>
    <v-main>
      <br>
      <!--Camera-->
      <v-container>
        <div class="mx-auto" style="max-width: 100%">
          <div align="center" style="font-weight: bold">
            <div>You can add as many pictures until you are happy with your match.</div>
          </div>
          <v-layout class="justify-center">
            <video
                width="800"
                ref="video"
                id="video"
                autoplay
                style="max-width: 100%; border-radius: 5px"
            >
            </video>
          </v-layout>
          <canvas ref="canvas" id="canvas" width="800" height="480"></canvas>

          <!-- Camera button -->
          <v-row
              align="center"
              justify="space-around"
              class="py-3"
          >
            <v-btn
                class="mx-auto"
                @click="capture(); button1Action(); $store.commit('updateDiscoveryImages', captures[0])"
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
          v-if="cards[0].title != null"
      >
        <div class="mx-auto" style="max-width: 100%">
          <div align="center" style="font-weight: bold">
            <div>Click on a match to see more information and confirm the one you want to add to the discovery.</div>
          </div>
          <v-row
              class="mx-auto"
              style="max-width: 800px"
          >
            <template v-for="(card, i) in cards">
              <v-col :key="i">
                <v-card style="height: 200px" class="card-outter">
                  <v-progress-linear
                      :value=card.percentage
                      color=var(--dark-color)
                      class="mx-auto white--text"
                      height="24"
                  >
                    {{ card.percentage }}%
                  </v-progress-linear>
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <h1 class="headline">{{card.title}}</h1>
                      <v-card-subtitle style="padding: 0; margin-left: 16px">
                        <p class="font-italic">
                          {{ card.subtitle }}
                        </p>
                      </v-card-subtitle>
                      <v-card-actions style="padding: 0" class="card-actions">
                        <v-btn
                            class="ml-2 mt-5"
                            outlined
                            small
                            @click="getInformation(i)"
                        >
                          MORE INFORMATION
                        </v-btn>
                      </v-card-actions>
                    </div>

                    <v-avatar
                        class="ma-3"
                        size="125"
                        tile
                    >
                      <v-img :src="card.src"></v-img>
                    </v-avatar>
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
      <br/>
    </v-main>
  </v-app>
</template>

<script src="../api_connect.js"></script>

<script>
export default {
  name: "snap",

  data: () => ({
    cards: [
      {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
      {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
      {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null},
      {percentage: null, show: false, title: null, subtitle: null, src: null, flex: 3, info: null}
    ],
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
      video: {facingMode: "environment"}
    });
    this.video = this.$refs.video;
    navigator.mediaDevices.getUserMedia(constraints)
        .then(mediaStream => {
          this.mediaStream = mediaStream
          this.video.srcObject = mediaStream
          this.video.play()
        });

    this.cards = this.$store.getters.getInformationCards;
  },

  methods: {
    updateDiscoveryImages() {
      this.$store.commit('updateDiscoveryImages', this.captures[0])
    },
    getInformation(id) {
      this.$store.commit('updateCardId', id);
      this.$store.commit('updateInformationCards', this.cards);
      this.$router.push({path: '/information'});
    },


    capture() {
      this.show = true;
      this.canvas = this.$refs.canvas;
      let context = this.canvas.getContext("2d")
      context.drawImage(this.video, 0, 0, 640, 480);
      this.captures.push(this.canvas.toDataURL("image/png"));
      console.log(this.captures)

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

    button1Action() {
      Promise.all(this.captures[0]).then(
          (base64files) => {//console.log(base64files)

            const datas = {
              api_key: "ZA54kZ7WT2A7nQhCyvYvePuXucjnAIDW0v4qzJq98GOYQ1268c",
              images: [this.captures[this.captures.length - 1]],
              modifiers: ["crops_fast", "similar_images"],
              plant_language: "en",
              plant_details: ["common_names",
                "url",
                "name_authority",
                "wiki_description",
                "taxonomy",
                "synonyms"]
            };
            console.log(datas)

            fetch('https://api.plant.id/v2/identify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(datas),
            })
                .then(response => response.json())
                .then(datas => {
                  var i;
                  for (i = 0; i < 4; i++) {
                    this.cards[i].percentage = Math.round(datas.suggestions[i].probability * 1000) / 10;
                    this.cards[i].title = datas.suggestions[i].plant_details.common_names[0];
                    this.cards[i].subtitle = datas.suggestions[i].plant_details.scientific_name;
                    this.cards[i].info = datas.suggestions[i].plant_details.wiki_description.value;
                    this.cards[i].src = datas.suggestions[i].similar_images[0].url;
                  }
                  console.log('Success:', datas);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
          })
    }
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
  /*background-color: var(--main-color);*/
  /*float: top;*/
}

#video {
  text-align: center;
}

#video {
  background-color: #000000;
}

#canvas {
  display: none;
}

.headline {
  margin: 2px 2px 2px 16px;
}

.card-outter {
  position: relative;
  padding-bottom: 25px;
}
.card-actions {
  position: absolute;
  bottom: 15px;
}

</style>