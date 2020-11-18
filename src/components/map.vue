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
          clearable
          rounded>
      </v-text-field>
    </div>
    <div class="chip_group_container">
      <v-chip-group
          id="Buttons"
          >
        <v-chip @click="getMyDiscoveries" color="var(--light-color)" text-color="white">Mine</v-chip>
        <v-chip @click="getFriendsDiscoveries" color="var(--light-color)" text-color="white">Friends</v-chip>
        <v-chip @click="getPopularDiscoveries" color="var(--light-color)" text-color="white">Popular</v-chip>
      </v-chip-group>
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
  padding-top: 12px;
  padding-left: 12px;
  padding-right: 12px;
}

#Back_button {
  margin-top: 6px;
}

#Buttons {
  margin-top: -25px;
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

.chip_group_container{
  width: 225px;
  margin: auto;
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