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
          append-icon="mdi-text-search"
      ></v-text-field>
    </div>

    <!-- Buttons: search by what -->
    <div class="options">
      <!-- Making the buttons dark green doesn't work -->
      <!-- NOT IMPLEMENTED YET: when you click a button, the variable toggleBtn becomes 0,1 or 2, but then based on
            that info a different query has to be fetched. Now the toggleBtn is set to a default and the data is
            already fetched. In the end, the buttons and search bar have to visible and when a user clicks a
            button and inputs something in the search field, the component of making the list has to be called
            as well as the correct query. -->
      <v-btn-toggle
          v-model="toggleBtn"
          rounded
      >
        <v-btn color="00251a" v-on:click="searchByName"> Search by name </v-btn>
        <v-btn color="00251a" v-on:click="searchByDiscoveryTitle"> Search by discovery </v-btn>
        <v-btn color="00251a" v-on:click="searchByDate"> Search by date </v-btn>
      </v-btn-toggle>
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
      discoveries: null,
      dat: 'photo'
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
    getDiscoFromDb: function () {
      const json = JSON.stringify({
        btn: this.toggleBtn
      });

      axios.post('getdiscos', json)
          .then(function (res) {
            console.log(res);
          })
          .catch(function(err){
            console.log(err);
          });

    },
    searchByName: function () {
      axios.get('/public/mapcontroller/getDiscoveries').then(response => (this.discoveries = response["data"]));
    },
    searchByDiscoveryTitle: function () {
      const json = JSON.stringify({
        dataaa: 'photo'
      });
      axios.post('getdiscos', json)
          .then(function (res) {
            axios.get('/public/mapcontroller/getDiscoveries', {params: {dataaa: "'photo'"} }).then(response => (this.discoveries = response["data"]));
            console.log(res);
          })
          .catch(function(err){
            console.log(err);
          });
    },
    searchByDate: function () {
      axios.get('/public/mapcontroller/getDiscoveries', {params: {dataaa: this.dat} }).then(response => (this.discoveries = response["data"]));
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
  padding: 10px 10px 10px 10px;
}

.options {
  display: flex;
  justify-content: center;
  padding: 10px 10px 0px 10px;
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