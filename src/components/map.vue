<template>
  <div>
    <div id="top_nav">
      <v-text-field
          solo
          label="Search"
          clearable></v-text-field>
      <v-chip-group
          mandatory
          active-class="--main-color">
        <v-chip @click="getMyDiscoveries">Mine</v-chip>
        <v-chip @click="getFriendsDiscoveries">Friends</v-chip>
        <v-chip @click="getPopularDiscoveries">Popular</v-chip>
      </v-chip-group>
      <router-view name="backButton"></router-view>
    </div>
    <div id="discovery_map">
      <GmapMap
          :center=getMapCenter
          :zoom="12"
          style="width:100vw; height:100vh;"
      >
        <gmap-custom-marker
            :key="index"
            v-for="(m, index) in getMarkers"
            :marker="m.position"
            @click.native="getDiscoInfo(m)"
        >
          <img class="custom_pin" src="../assets/pin.png"/>
        </gmap-custom-marker>
      </GmapMap>
    </div>

    <router-link to="/">
      <v-bottom-sheet id="Disco_info"
           v-model="updateMarkerDiscoveryOverlay"
      >
        <v-sheet
            class="mx-auto"
            elevation="8"
            max-width="100vw"
        >
          <v-slide-group
              v-if="updateMarkerDiscoveryOverlay"
          >
            <v-slide-item
                v-for="image in getSelectedMarker.images"
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
      </v-bottom-sheet>
    </router-link>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';

export default {
  name: "map",

  components: {
    'gmap-custom-marker': GmapCustomMarker
  },

  mounted() {
    this.$store.dispatch('MapCenter');
    this.$store.dispatch('discoveriesMe');
  },

  computed: {
    getMapCenter() {
      return this.$store.getters.getMapCenter;
    },
    getMarkers(){
      return this.$store.getters.getMapMarkers;
    },
    getSelectedMarker:{
      get(){
        return this.$store.getters.getSelectedMarker;
      },
      set(value){
        this.$store.commit("updateSelectedMarker", value)

      }
    },
    updateMarkerDiscoveryOverlay:{
      get(){
        return this.$store.getters.getMarkerDiscoveryOverlay;
      },
      set(value){
        this.$store.commit("updateMarkerDiscoveryOverlay", value)

      }
    }
  },

  methods: {
    getDiscoInfo(disco) {
      this.$store.commit("updateSelectedMarker", disco);
      this.$store.commit("updateMarkerDiscoveryOverlay",true);
    },
    getMyDiscoveries(){
      this.$store.dispatch('discoveriesMe');
    },
    getFriendsDiscoveries(){
      this.$store.dispatch('discoveriesFriends');
    },
    getPopularDiscoveries(){
      this.$store.dispatch('discoveriesPopular');
    },
  }
};
</script>

<style>
.custom_pin {
  max-height: 40px;
  width: auto;
}

#discovery_map, #top_nav {
  position: absolute;
}

#top_nav {
  z-index: 2;
  width: 80%;
}

#Disco_info {
  position: relative;
  top: 400px;
}
</style>