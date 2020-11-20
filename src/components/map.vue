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
            :marker="{lat: m.Latitude, lng: m.Longitude}"
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
                v-for="image in 4"
                :key="image"
            >
              <img
                  class="images"
                  :src="getSelectedMarker['photoPath']"
                  alt=""
              >
            </v-slide-item>
          </v-slide-group>
          <div id="images_text"
               v-if="updateMarkerDiscoveryOverlay">
            <h3>{{ getSelectedMarker['title'] }}</h3>
            <h5>{{ getSelectedMarker['userName'] }} - {{ getSelectedMarker['takenDate'] }}</h5>
            <h5>{{ getSelectedMarker['location'] }}</h5>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </router-link>

</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';
import axios from "axios";

export default {
  name: "map",

  data() {
    return {
      search: null,
      discoveries: null
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

.images {
  padding-right: 4px;
  height: 100px;
}

#images_text {
  padding: 0 10px 6px;
}

.chip_group_container {
  width: 225px;
  margin: auto;
}
</style>