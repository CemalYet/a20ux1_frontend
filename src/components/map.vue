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
    <div id="Map">
      <GmapMap
          :center=getMapCenter
          :zoom="12"
          style="width:100vw; height:100vh;"
      >
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

    <router-link to="/feed">
      <div id="Disco_info"
           v-if="chosen_marker"
      >
        <v-sheet
            class="mx-auto"
            elevation="8"
            max-width="100vw"
        >
          <v-slide-group
              v-model="model"
          >
            <v-slide-item
                v-for="image in markers[chosen_marker-1].images"
                :key="image"
            >
              <img
                  :src="image"
                  alt=""
                  height="200"
              >
            </v-slide-item>
          </v-slide-group>
          <h3>Title</h3>
          <h5>Name - Date</h5>
          <h5>Location</h5>
        </v-sheet>
      </div>
    </router-link>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';

export default {
  name: "map",
  data() {
    return {
      chosen_marker: null,
      markers: [],
      model: null,
    };
  },
  components: {
    'gmap-custom-marker': GmapCustomMarker
  },

  mounted() {
    this.$store.dispatch('getMapCenter');
    this.Me();
  },

  computed: {
    getMapCenter() {
      return this.$store.getters.getMapCenter;
    }
  },

  methods: {
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
              id: 2,
              images: [
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
              ],
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
              id: 1,
              images: [
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
              ],
            },
            {
              position: {
                lat: 51.3567,
                lng: 4.9783
              },
              id: 3,
              images: [
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
              ],
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
              id: 1,
              images: [
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
              ],
            },
            {
              position: {
                lat: 51.3167,
                lng: 4.9833
              },
              id: 2,
              images: [
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
              ],
            },
            {
              position: {
                lat: 51.3567,
                lng: 4.9783
              },
              id: 3,
              images: [
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
                "http://lorempixel.com/200/200/nature/",
              ],
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

.picture_card {
  margin: 0 4px;
  height: 200px;
}

#Map {
  position: absolute;
}

#Disco_info {
  position: relative;
  top: 400px;
}
</style>