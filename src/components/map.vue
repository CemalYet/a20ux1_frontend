<template>
  <div>
    <div id="Discovery_map">
      <GmapMap
          :center=getMapCenter
          :zoom="12"
          style="width:100vw; height:100vh;"
          :options="mapOptions"
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

    <div id="Search_box">
      <div id="Back_button">
        <router-view name="backButton"></router-view>
      </div>
      <v-text-field
          solo
          label="Search"
          clearable>
      </v-text-field>
    </div>
    <div id="Buttons">
      <v-btn @click="getMyDiscoveries" small rounded>Mine</v-btn>
      <v-btn @click="getFriendsDiscoveries" small rounded>Friends</v-btn>
      <v-btn @click="getPopularDiscoveries" small rounded>Popular</v-btn>
    </div>


    <router-link to="/">
      <v-bottom-sheet id="Disco_info"
        v-model="updateMarkerDiscoveryOverlay"
        inset>
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
                  class="images"
                  :src="image"
                  alt=""
              >
            </v-slide-item>
          </v-slide-group>
          <div id="images_text">
            <h3>Zo mooi in bloei!</h3>
            <h5>Seppe Fleerackers - 17 november 2020</h5>
            <h5>De Liereman</h5>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </router-link>
  </div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';

export default {
  name: "map",

  data() {
    return {
      mapOptions: {
        disableDefaultUI: true,
      },
    };
  },

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
    getMarkers() {
      return this.$store.getters.getMapMarkers;
    },
    getSelectedMarker: {
      get() {
        return this.$store.getters.getSelectedMarker;
      },
      set(value) {
        this.$store.commit("updateSelectedMarker", value)

      }
    },
    updateMarkerDiscoveryOverlay: {
      get() {
        return this.$store.getters.getMarkerDiscoveryOverlay;
      },
      set(value) {
        this.$store.commit("updateMarkerDiscoveryOverlay", value)

      }
    }
  },

  methods: {
    getDiscoInfo(disco) {
      this.$store.commit("updateSelectedMarker", disco);
      this.$store.commit("updateMarkerDiscoveryOverlay", true);
    },
    getMyDiscoveries() {
      this.$store.dispatch('discoveriesMe');
    },
    getFriendsDiscoveries() {
      this.$store.dispatch('discoveriesFriends');
    },
    getPopularDiscoveries() {
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

#Discovery_map {
  position: absolute;
}

#Search_box {
  position: relative;
  display: flex;
  flex-direction: row;
}

#Back_button {
  margin-top: 6px;
}

#Buttons {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: -25px;
}

#Buttons button {
  margin: 4px;
}

#Disco_info {
  position: absolute;
  bottom: 0;
  padding: 0 10px 6px;
  width: 100%;
}

.images {
  padding-right: 4px;
  height: 100px;
}

#images_text {
  padding: 0 10px 6px;
}

@media screen and (min-width: 600px) {
  #Disco_info {
    position: absolute;
    bottom: 0;
    margin: 0 10px 6px;
    width: 400px;
  }
}
</style>