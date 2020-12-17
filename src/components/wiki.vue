<template>
  <v-container>
    <br>
    <div class="Search_box">
      <v-menu offset-y max-height="80vh">
        <template #activator="scope" style="margin-bottom: 6px">
          <v-text-field
              hide-details
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


      <v-list class="list" dense>
        <v-list-item
            class="list"
            v-for="(plant,i) in plants"
            :key="i">
          <v-list-item-title
              v-text="plant.title"
              v-on:click="getPictures(plant.title); updatePlant(plant.title); sheet = !sheet;">
          </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card
          v-if="pictures != null"
          id="card"
          color="rgb(249 , 249, 249, 0.85)"
      >
        <v-card-title class="headline">
          {{ selected_plant }}
        </v-card-title>
        <v-card-subtitle>
          <p class="font-italic" style="margin: 0">
            spotted: ? times
          </p>
        </v-card-subtitle>
        <div id="image_div">
          <v-carousel cycle
                      hide-delimiter-background
                      show-arrows-on-hover>
            <v-carousel-item
                v-for="pic in pictures"
                :key="pic"
            >
              <v-img :src="pic.photoPath"></v-img>
            </v-carousel-item>
          </v-carousel>
        </div>
        <v-card-actions class="justify-center">
          <v-btn class="white--text"
                 color=var(--dark-color)
                 v-on:click="openWikipedia(selected_plant)">WIKIPEDIA</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "wiki",

  data: () => ({
    plants: null,
    searchField: null,
    pictures: null,
    selected_plant: null,
  }),

  methods: {
    clearSearchResults() {
      axios.get('/public/WikiController/getWikiData').then(response => {
        this.plants = response["data"];
      });
      this.pictures = null;
    },
    searchEnter() {
      axios.get('/public/wikicontroller/search', {params: {search: this.searchField}})
          .then(response => {
            this.plants = response["data"];
          });
    },
    getPictures(plantName) {
      axios.get('/public/wikicontroller/getPictures', {params: {search: plantName}})
          .then(response => {
            this.pictures = response["data"];
          });
    },
    openWikipedia: function (title) {
      window.open("https://en.wikipedia.org/w/index.php?title=" + title, "_blank");
    },
    updatePlant(value) {
      this.selected_plant = value;
    }
  },

  mounted() {
    this.clearSearchResults();
  }
}
</script>

<style scoped>
.list {
  background: transparent;
}

.Search_box {
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin: auto;
}

#card {
  width: 90%;
  max-width: 750px;
  margin: auto;
  height: auto;
  padding-bottom: 2px;
}

#image {
  max-height: 100%;
  max-width: 100%;
}

#image_div {
  width: 250px;
  height: 250px;
  margin: auto;
}
</style>