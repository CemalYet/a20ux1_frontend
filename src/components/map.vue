<template>
  <div>
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

export default {
  name: "map",
  data() {
    return {
      chosen_marker: null,
      center: {lat: 50.87959, lng: 4.70093}, //Leuven default value
      markers: [],
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
</style>