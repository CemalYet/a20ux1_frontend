<template>
  <div>

    <!-- Search field -->
    <div class="searchField">
      <v-text-field
          label="Search the area"
          solo
          rounded
          clearable
          v-model="search"
          prepend-inner-icon="mdi-keyboard-backspace"
          @keyup.enter="searching"
      ></v-text-field>
    </div>


    <!-- List with the discoveries-->
    <!-- NOT IMPLEMENTED YET: when you click a list item you go to the discovery post page -->
    <v-list-item-group class="searches" v-for="disco in discoveries" :key="disco.userName">
      <div class="pictureBox">
        <v-avatar size="52"><v-img :src="disco.photoPath"></v-img></v-avatar>
      </div>
      <div class="infoBox">
        <v-list-item>
          <v-list-item-content>
              <v-list-item-title> {{ disco.userName }}</v-list-item-title>
              <v-list-item-subtitle> {{ disco.title }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list-item-group>




    <h1>Selected marker: {{ this.chosen_marker }}</h1>
    <h4
        v-for="m in markers.length"
        :key="m"
    >
      {{ markers[m - 1] }}
    </h4>
    <v-btn @click="Me" rounded>Me</v-btn>
    <v-btn @click="Friends" rounded>Friends</v-btn>
    <v-btn @click="Popular" rounded>Popular</v-btn>
    <GmapMap
        :center="center"
        :zoom="12"
        style="width:100vw; height:100vh;"
    >
      <GmapInfoWindow></GmapInfoWindow>

      <gmap-custom-marker
          :key="index"
          v-for="(m, index) in markers"
          :marker="m.position"
          @click.native="getDiscoInfo(m.id)"
      >
        <img class="custom_pin" src="../assets/pin.png"/>
        <my-component></my-component>
      </gmap-custom-marker>
    </GmapMap>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import axios from "axios";

export default {
  name: "map",
  data() {
    return {
      chosen_marker: null,
      center: {lat: 50.87959, lng: 4.70093}, //Leuven default value
      markers: [],
      search: null,
      toggleBtn: undefined,
      discoveries: null
    };
  },
  components: {
    'gmap-custom-marker': GmapCustomMarker
  },

  mounted() {
    this.getLocation();
    this.Me();
  },

  methods: {

    searching: function () {
      axios.get('/public/mapcontroller/searching', {params: {data: this.search} }).then(response => (this.discoveries = response["data"]));
    },


    getLocation: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    getDiscoInfo: function (int) {
      this.chosen_marker = int;
    },
    Me: function () {
      this.chosen_marker = null;
      this.markers =
          [
            {
              position: {
                lat: 51.3167,
                lng: 4.9833
              },
              id: 2
            },
          ]
    },
    Friends: function () {
      this.chosen_marker = null;
      this.markers =
          [
            {
              position: {
                lat: 51.32254,
                lng: 4.94471
              },
              id: 1
            },
            {
              position: {
                lat: 51.3567,
                lng: 4.9783
              },
              id: 3
            },
          ]
    },
    Popular: function () {
      this.chosen_marker = null;
      this.markers =
          [
            {
              position: {
                lat: 51.32254,
                lng: 4.94471
              },
              id: 1
            },
            {
              position: {
                lat: 51.3167,
                lng: 4.9833
              },
              id: 2
            },
            {
              position: {
                lat: 51.3567,
                lng: 4.9783
              },
              id: 3
            },
          ]
    },
  }
};
</script>

<style>

.custom_pin {
  max-height: 40px;
  width: auto;
}

.searchField {
  padding: 10px 10px 5px 10px;
}

.options {
  display: flex;
  justify-content: center;
  padding: 0px 10px 5px 10px;
}

.pictureBox {
  padding: 5px 5px 5px 5px;
}

.infoBox {
  width: 300px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.searches {
  display: flex;
  flex-direction: row;
  width: 350px;
  margin: auto;
}


</style>