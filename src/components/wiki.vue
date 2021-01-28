<template>
  <v-container>
    <br>
    <div class="Search_box">
      <v-menu offset-y max-height="80vh">
        <template #activator="scope" style="margin-bottom: 6px">
          <v-text-field
              label="Search discoveries"
              outlined
              clearable
              color="var(--dark-color)"
              v-model="searchField"
              @click:clear="clearSearchResults"
              @keyup.enter="searchEnter(); scope.value=true"
          ></v-text-field>
        </template>
      </v-menu>

      <v-expansion-panels focusable>
        <v-expansion-panel
            v-for="(plant,i) in plants"
            :key="i"
        >
          <v-expansion-panel-header
              expand-icon=""
              v-on:click="updatePlant(plant.title);getSpots(plant.title);getPictures(plant.title);"
          >
            {{ plant.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <h1 style="margin-bottom: -2px"> {{ selected_plant }} </h1>
            <p v-if="spots"> spotted: {{ spots.number }} time(s) </p>

            <div class="text-center">
              <v-skeleton-loader
                  v-if="pictures===null"
                  class="image_div"
                  height="100%"
                  width="100%"
                  type="image">
              </v-skeleton-loader>
              <div v-else>
                <v-carousel v-if="pictures.length === 1"
                            :show-arrows=false
                            class="image_div"
                            cycle
                            hide-delimiters>
                  <v-carousel-item
                      v-for="(pic,i) in pictures"
                      :key="i"
                  >
                    <v-img aspect-ratio="1" :src="pic.photoPath"></v-img>
                  </v-carousel-item>
                </v-carousel>
                <v-carousel v-else
                            class="image_div"
                            cycle
                            hide-delimiters>
                  <v-carousel-item
                      v-for="(pic,i) in pictures"
                      :key="i"
                  >
                    <v-img aspect-ratio="1" :src="pic.photoPath"></v-img>
                  </v-carousel-item>
                </v-carousel>
              </div>
              <v-btn id="wiki_button"
                     color=var(--dark-color)
                     v-on:click="openWikipedia(selected_plant)">WIKIPEDIA
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
import store from "@/store";

export default {
  name: "wiki",

  metaInfo:{
    title: "snAPP wiki",
  },

  data: () => ({
    plants: null,
    searchField: null,
    pictures: null,
    selected_plant: null,
    spots: 0,
  }),

  methods: {
    clearSearchResults() {
      axios.get('/public/wikiController/getWikiData', {params: {userId: store.getters.getLoggedInUserData[0].userId}})
          .then(response => {
        this.plants = response["data"];
      });
      this.pictures = null;
      this.spots = 0;
    },
    searchEnter() {
      axios.get('/public/wikiController/search', {params: {search: this.searchField, userId: store.getters.getLoggedInUserData[0].userId}})
          .then(response => {
            this.plants = response["data"];
          });
    },
    getPictures(plantName) {
      axios.get('/public/wikiController/getPictures', {params: {search: plantName, userId: store.getters.getLoggedInUserData[0].userId}})
          .then(response => {
            this.pictures = response["data"];
          });
    },
    getSpots(plantName) {
      axios.get('/public/wikiController/getSpots', {params: {plant: plantName, userId: store.getters.getLoggedInUserData[0].userId}})
          .then(response => {
            this.spots = response["data"][0];
          });
    },
    openWikipedia: function (title) {
      window.open("https://en.wikipedia.org/w/index.php?title=" + title, "_blank");
    },
    updatePlant(value) {
      this.selected_plant = value;
      this.pictures = null;
    }
  },

  mounted() {
    this.clearSearchResults();
  }
}
</script>

<style scoped>

.Search_box {
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin: auto;
}

.image_div {
  max-height: 350px;
  max-width: 350px;
  margin: auto;
}

#wiki_button {
  color: white;
  margin-top: 16px;
}
</style>