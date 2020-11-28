<template>
  <v-container>
    <br>
    <!--Camera-->
    <div style="margin-bottom: 10px; text-align: center">
      <h4>You can add as many pictures until you are happy with your match.</h4>
    </div>
    <div class="mx-auto" style="max-width: 500px; text-align: center">
      <v-layout>
        <video
            ref="video"
            id="video"
            autoplay
            style="border-radius: 5px"
        >
        </video>
      </v-layout>

      <!-- Camera button -->
      <v-btn
          id="camera_button"
          class="mx-auto"
          @click='capture(); button1Action(); show=true'
          color=var(--dark-color)
          elevation="2"
          raised
          :ripple="false"
      >
        <v-icon x-large color="white">mdi-camera-plus-outline</v-icon>
      </v-btn>
    </div>

    <!--Picture carousel-->
    <div v-if="show" class="mx-auto" style="max-width: 100%">
      <div style="text-align: center">
        <h4>Click on a match to see more information and confirm the one you want to add to the discovery.</h4>
      </div>
      <v-row
          class="mx-auto"
          style="max-width: 800px"
      >
        <template v-for="(card, i) in cards">
          <v-col :key="i">
            <v-card>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                      class="headline"
                      v-text="card.title"
                  >
                  </v-card-title>
                  <v-card-subtitle>
                    <p class="font-italic">
                      {{ card.subtitle }}
                    </p>
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                        class="ml-2 mt-5"
                        outlined
                        small
                        :id="i"
                        @click="getInformation(0)"
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
</template>

<script src="../api_connect.js"></script>


<script>
export default {
  name: "snap",

  data() {
    return {
      cards: [
        {
          percentage: 65,
          title: "Quercus Robur 1",
          subtitle: "Latin 1",
          src: "https://www.holdenarb.org/wp-content/uploads/2020/04/Tremendous.png",
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          percentage: 25,
          title: "Plant 2",
          subtitle: "Latin 2",
          src: "https://www.crozetgazette.com/wp-content/uploads/2020/01/iStock-1147108546.jpg",
          info: "Lorem ipsum dolor sit amet, consecunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
        },
        {
          percentage: 7,
          title: "Plant 3",
          subtitle: "Latin 3",
          src: 'https://www.thespruce.com/thmb/mh5-9gjw1Tzp5X7MHCin7znCunU=/1414x1414/smart/filters:no_upscale()/GettyImages-200443720-0011-59a2f08fd088c000111be4f4.jpg',
          info: "Lorem ipsum dolor sit amet, consectetur ggggggggggg dhfg ghjk fgh cvbn, adipiscing elit, sed fdgjkdfgjd fkg, gdfhg dfjgldfn gdfsjghjgdfsn gdf gf d do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          percentage: 3,
          title: "Plant 4",
          subtitle: "Latin 4",
          src: 'https://cdn.britannica.com/35/60435-050-5C3748AE/tree-General-Grant-giant-sequoia-bulk-trees.jpg',
          info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
      ],
      video: {},
      canvas: {},
      captures: [],
      model: null,
      show: true,
      clickedButton: 0,
    }
  },


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
        })

  },

  methods: {
    getInformation(id) {
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
      // const files = blob;
      // // const files = [...document.querySelector('input[type=file]').files];
      // const promises = files.map((file) => {
      //   return new Promise((resolve) => {
      //     const reader = new FileReader();
      //     reader.onload = (event) => {
      //       const res = event.target.result;
      //       console.log(res);
      //       resolve(res);
      //       return res;
      //     }
      //     reader.readAsDataURL(file)
      //   })
      // })

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
                  let i;
                  for (i = 0; i < 4; i++) {
                    this.cards[i].percentage = Math.round(datas.suggestions[i].probability * 1000) / 10;
                    this.cards[i].title = datas.suggestions[i].plant_details.common_names[0];
                    this.cards[i].subtitle = datas.suggestions[i].plant_details.scientific_name;
                    this.cards[i].info = datas.suggestions[i].plant_details.wiki_description.value;
                    this.cards[i].src = datas.suggestions[i].similar_images[0].url;
                  }
                  this.$store.commit('updateInformationCards', this.cards);
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

#video {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* SETS HEIGHT EQUAL TO 75% OF WIDTH (aka 4:3 aspect ratio) */
  background-color: #000000;
}

#camera_button {
  height: 55px;
  width: 100px;
  margin: 10px;
}

</style>