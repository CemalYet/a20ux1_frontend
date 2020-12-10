<template>
  <v-container>
    <br>
    <!--Camera-->

      <div class="mx-auto" style="max-width: 100%">
        <div class="text-subtitle-1" style="text-align: center">
          You can add up to 5 pictures to scan
        </div>

        <pictureSlideGroup></pictureSlideGroup>

        <!-- Camera button -->
        <v-row
            align="center"
            justify="space-around"
            class="py-3"
        >
          <v-btn
              class="white--text"
              @click="scan"
              color=var(--dark-color)
              elevation="2"
              raised
              x-large
              :loading="loading"
              :disabled="(updateDiscoveryImages.length === 0 || loading)"
          >
            scan plant
            <v-icon right color="white">mdi-magnify-scan</v-icon>
          </v-btn>
        </v-row>
      </div>


    <!--Picture carousel-->
      <div
          class="mx-auto"
          style="max-width: 100%"
          v-if="getInformationCards[0].title !== null"
      >
        <div style="text-align: center">
          <h3>Click on a match to see more information and confirm the one you want to add to the discovery.</h3>
        </div>
        <v-row
            class="mx-auto"
            style="max-width: 800px"
        >
          <template v-for="(card, i) in getInformationCards">
            <v-col :key="i">
              <v-card
                  id="card-outer"
                  height="173"
              >
                <v-progress-linear
                    :value=card.percentage
                    color=var(--dark-color)
                    class="mx-auto white--text"
                    height="24"
                >
                  {{ card.percentage }}%
                </v-progress-linear>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div class="text-truncate">
                    <v-card-title>{{card.title}}</v-card-title>
                    <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
                    <v-card-actions>
                      <v-btn
                          class="ml-2 mt-3"
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

import api_scan from "@/api_connect";
import pictureSlideGroup from "@/components/pictureSlideGroup";

export default {
  name: "snap",

  components:{
    pictureSlideGroup
  },

  data: () => ({
    cols: 1,
    model: null,
    show: false,
    storeData: null,
    loading: false,
  }),

  watch:{
    getInformationCards: function(){
      if (this.getInformationCards[0].title !== null)
        this.loading = false;
    }
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
    },
    updateDiscoveryImages(){
      return this.$store.getters.getDiscoveryImages;
    },
  },

  methods: {
    getInformation(id) {
      this.$store.commit('updateCardId', id);
      this.$router.push({path: '/information'});
    },
    scan() {
      this.loading = true;
      api_scan();
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